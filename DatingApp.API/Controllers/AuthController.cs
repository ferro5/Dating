using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.DTO;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.ExpressionVisitors.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AppSettings _appSettings;
        private readonly IMapper _mapper;

        public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IOptions<AppSettings> appSettings,IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            List<string> errorList = new List<string>();
            var user = new ApplicationUser
            {
                Email = userForRegisterDto.Email,
                UserName = userForRegisterDto.UserName,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, userForRegisterDto.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Customer");
                return Ok(new
                    {username = user.UserName, email = user.Email, status = 1, message = "Registration Successful"});
            }
            else
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                    errorList.Add(error.Description);
                }
            }

            return BadRequest(new JsonResult(errorList));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto loginModel)
        {
            var userPhoto = _userManager.Users.Include(p => p.Photos);
            var user = await _userManager.FindByNameAsync(loginModel.Username);   

            var roles = await _userManager.GetRolesAsync(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
            double tokenExpireTime = Convert.ToDouble(_appSettings.ExpireTime);
            if (user != null&& await _userManager.CheckPasswordAsync(user,loginModel.Password))
            {
                var  tokenHandler = new JwtSecurityTokenHandler();
                //create description
                var  tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, loginModel.Username),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                        new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                        new Claim(ClaimTypes.Role,roles.FirstOrDefault()),
                        new Claim("LoggedIn" , DateTime.Now.ToString()), 
                    }),
                    SigningCredentials = new SigningCredentials(key ,SecurityAlgorithms.HmacSha256),
                    Issuer = _appSettings.Site,
                    Audience = _appSettings.Audience,
                    Expires = DateTime.Now.AddMinutes(tokenExpireTime)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var userFromRepo = _mapper.Map<UserForListDto>(user);
                return Ok(new
                    { token = tokenHandler.WriteToken(token),expiration = token.ValidTo,username = user.UserName,
                        userRole = roles.FirstOrDefault(),mormilizeName = user.NormalizedUserName});
            }
            ModelState.AddModelError("" , "Username/Password was not found");
            return Unauthorized(new
                {LoginError = "Please check the login Credentials-Invalid Username/Password was entered"});

        }
    }
}
