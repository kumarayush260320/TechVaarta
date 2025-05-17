using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CodePulse.API.Data
{
    public class DbSeeder
    {
        public static async Task SeedAsync(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed roles if they don't exist
            var readerRole = await roleManager.FindByNameAsync("Reader");
            var writerRole = await roleManager.FindByNameAsync("Writer");

            if (readerRole == null)
            {
                await roleManager.CreateAsync(new IdentityRole("Reader"));
            }

            if (writerRole == null)
            {
                await roleManager.CreateAsync(new IdentityRole("Writer"));
            }

            // Seed admin user if it doesn't exist
            var adminUser = await userManager.FindByEmailAsync("admin@codepulse.com");

            if (adminUser == null)
            {
                adminUser = new IdentityUser
                {
                    UserName = "admin@codepulse.com",
                    Email = "admin@codepulse.com"
                };

                // Password
                var passwordHasher = new PasswordHasher<IdentityUser>();
                adminUser.PasswordHash = passwordHasher.HashPassword(adminUser, "Admin@12345");

                var result = await userManager.CreateAsync(adminUser);

                if (result.Succeeded)
                {
                    // Assign roles
                    await userManager.AddToRoleAsync(adminUser, "Reader");
                    await userManager.AddToRoleAsync(adminUser, "Writer");
                }
            }
        }
    }
}
