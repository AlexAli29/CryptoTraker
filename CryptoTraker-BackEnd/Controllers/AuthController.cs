using CryptoTraker_BackEnd.Data;
using CryptoTraker_BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Policy;
using System.Text;

namespace CryptoTraker_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
    

        public readonly IConfiguration _configuration;          
        private readonly AppDbContext _context;

        public AuthController(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
          
            _context = context;
            
        }

        [HttpGet("getuser"),Authorize]
        public ActionResult<object> GetCurrentUser()
        {
            var Email = User.FindFirstValue("Email");

            User user = _context.Users.Where(x => x.Email == Email).FirstOrDefault();

            return Ok(new UserDto { 
                UserId = user.UserId,
                Username = user.Username,
                Email= user.Email,
                Role= user.Role,
                Coins= user.Coins,
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody]UserDto request)
        {
            CreatePasswordHash(request.Password, out string passwordHash);
            User user = new User();

            user.UserId= request.UserId;
            user.Username= request.Username;
            user.Role = "User";
            user.Email= request.Email;
            user.PasswordHash = passwordHash;
            

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(user,refreshToken);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            string token = CreateToken(user);

            return Ok(token);    
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody]UserDto request)
        {
            User user = _context.Users.Where(x => x.Email== request.Email).FirstOrDefault();

            if (user ==null)
            {
                return BadRequest("User not found");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(user,refreshToken);
            await _context.SaveChangesAsync();

            return Ok(token);

        }

        [HttpPost("refresh")]

        public async Task<ActionResult<string>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            User user = _context.Users.Where(x => x.RefreshToken == refreshToken).FirstOrDefault();

            

            if(!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token");
            }
            else if(user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(user);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(user,newRefreshToken);

            _context.SaveChanges();

            return Ok(token);
        }



        [HttpPost("gettoken")]

        public async Task<ActionResult<string>> GetAccessToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            User user = _context.Users.Where(x => x.RefreshToken == refreshToken).FirstOrDefault();

            if(refreshToken == null)
            {
                return Unauthorized();
            }


            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(user);           

            return Ok(token);
        }


        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(User user,RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                Secure= true,
                SameSite = SameSiteMode.None,
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };

            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
           

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;

            

        }



        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                
                new Claim("Name", user.Username),
                new Claim("Role", user.Role),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
                );
            
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;

        }


        private void CreatePasswordHash(string password, out string passwordHash) 
        {
             passwordHash = BCrypt.Net.BCrypt.HashPassword(password);

        }



    }
}
