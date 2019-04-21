using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.DTO
{
    public class UserForLoginDto
    {
        [Required]
        [Display(Name = "User Name")]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public Photo Photo { get; set; }
    }
}
