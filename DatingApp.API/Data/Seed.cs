using System.Collections.Generic;
using System.IO;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        string passwordHash;

        public Seed(DataContext context)
        {
            _context = context;
        }

        public void SeedUser()
        {

            var userData = File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<ApplicationUser>>(userData);
            foreach (var user in users)
            {
                user.NormalizedUserName = user.NormalizedUserName;
                user.PasswordHash = passwordHash;
                user.UserName = user.UserName.ToLower();        
                _context.Users.Add(user);
              
            }
            _context.SaveChanges();



        }

    
    }
}
