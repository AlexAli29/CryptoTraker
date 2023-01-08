using CryptoTraker_BackEnd.Data;
using CryptoTraker_BackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CryptoTraker_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoinsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private IConfiguration _config;
       
        public CoinsController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
           
        }
        // GET: api/<CoinsController>
        [HttpGet("{UserId}")]
        public async Task<string[]> Get(Guid UserId, CancellationToken token)
        {
            User user = await _context.Users.Where(x => x.UserId == UserId).FirstOrDefaultAsync(token);

            string[] coins = user.Coins?.Split(" ") ?? Array.Empty<string>();            

            return coins;
        }


        //POST api/<CoinsController>
        [HttpPost("add/{coin}")]

        public async Task<string[]> Post([FromBody] UserDto model, string coin,  CancellationToken token)
        {
            //Guid _userId = new Guid(userId);

            User user = await _context.Users.Where(x => x.UserId == model.UserId).FirstOrDefaultAsync(token);

            string[] coinsFromDb = user.Coins?.Split(" ") ?? Array.Empty<string>();

            string[] coins = new string[coinsFromDb.Length + 1];

            coinsFromDb.CopyTo(coins, 0);
            coins[coins.Length - 1] = coin;

            user.Coins = string.Join(" ", coins);

            await _context.SaveChangesAsync(); 
            
            return coins;
        }

        // DELETE api/<CoinsController>/5
        [HttpDelete("remove/{coin}")]
        public async Task<string[]> Delete([FromBody] UserDto model, string coin,CancellationToken token)
        {
            User user = await _context.Users.Where(x => x.UserId == model.UserId).FirstOrDefaultAsync(token);

            string[] coinsFromDb = user.Coins?.Split(" ") ?? Array.Empty<string>();

            coinsFromDb = coinsFromDb.Where(x => x != coin).ToArray();

            user.Coins = string.Join(" ", coinsFromDb);

            await _context.SaveChangesAsync();

            return  coinsFromDb;
        }
    }
}
