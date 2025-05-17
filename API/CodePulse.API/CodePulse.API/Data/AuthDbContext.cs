using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.PortableExecutable;

namespace CodePulse.API.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {

        }
        //Roles
        //Public rolw-Only GET call
        //Admin Roles
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var readerRoleId = "511a7ab6-e228-4f2f-bbdb-508a22bd1da7";
            var writerRoleId = "0673034a-d932-4cd3-a409-85ba680b4a69";

            //Create Reader and Writer Role to the page
            var roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Id=readerRoleId,
                    Name="Reader",
                    NormalizedName="Reader".ToUpper(),
                    ConcurrencyStamp=readerRoleId
                },
                new IdentityRole()
                {
                    Id=writerRoleId,
                    Name="Writer",
                    NormalizedName="Writer".ToUpper(),
                    ConcurrencyStamp=writerRoleId
                }
             };
            //Seed the roles to db
            builder.Entity<IdentityRole>().HasData(roles);

            //--------------------------------------------------------------------------------

            //Create an admin user
           //You're making a new user with the email: admin@codepulse.com.

           // This user is like the boss of the house — they can do everything.
          //  var adminUserId = "23af4ef8-d72c-4c1d-808d-2ce460d6fd3d";
           // var admin = new IdentityUser()
           // {
             //   Id=adminUserId,
              //  UserName="admin@codepulse.com",
              //  Email="admin@codepulse.com",
              //  NormalizedEmail="admin@codepulse.com".ToUpper(),
              //  NormalizedUserName="admin@codepulse.com".ToUpper()
           // };
            //Password
          //  admin.PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(admin, "Admin@12345");
          //  builder.Entity<IdentityUser>().HasData(admin);


            //Give roles to admin
            //You give the admin both roles:
           // var adminRoles = new List<IdentityUserRole<string>>()
           // {
           //     new()
           //     {
            //        UserId=adminUserId,
            //        RoleId=readerRoleId
             //   },
             //   new()
             //   {
              //      UserId =adminUserId,
             //       RoleId=writerRoleId
             //   }
           // };
           // builder.Entity<IdentityUserRole<string>>().HasData(adminRoles); 
        }

    } 
}
