using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser,IdentityRole<int> , int>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityRole<int>>().HasData(
                new IdentityRole<int>
                {
                    Id = 1,
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole<int>
                {
                    Id = 2,
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                },
                new IdentityRole<int>
                {
                    Id = 3,
                    Name = "Moderator",
                    NormalizedName = "MODERATOR"
                });



        }


        public virtual DbSet<Value> Values { get; set; }
        public virtual DbSet<Photo>Photos { get; set; }
        public virtual DbSet< ApplicationUser> ApplicationUser { get; set; }

    }

}
