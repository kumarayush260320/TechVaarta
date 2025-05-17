using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CodePulse.API.Repositories.Implementation
{
    //You are a student (the user), and the school needs to give you an ID card
    //(the JWT token) to prove who you are and what classes (roles) you belong to.
    //Let’s walk through the steps of how your ID card(JWT) is created.
    public class TokenRepository : ITokenRepository
    {
        private readonly IConfiguration configuration;
        public TokenRepository(IConfiguration configuration) 
        {
            this.configuration= configuration;
        }
        public string CreateJwtToken(IdentityUser user, List<string> roles)
        {
            //Create Claims
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
            };
            //we are here iterating through all roles and 
            //converting it to claims
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));


            //JWT security token parameters
            //The secret key is like a stamp or signature from the principal so no one can fake your ID.
            //It's stored in your app settings (appsettings.json).
            var key =new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));


            //This is like putting a seal on your ID card using a secure method (HmacSha256).
            var credentials =new SigningCredentials(key,SecurityAlgorithms.HmacSha256);


            //Your ID card will expire in 15 minutes, so you can't use it forever —
            //you need to get a new one later.
            var token =new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims:claims,
                expires:DateTime.Now.AddMinutes(15),//for login time expiry
                signingCredentials:credentials
             );

            //Return Token

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
