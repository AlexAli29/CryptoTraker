using CryptoTraker_BackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CryptoTraker_BackEnd.Data
{
    public class AppDbContext : DbContext
    {
        ModelBuilder modelBuilder = new();
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
          
        }

        
        public DbSet<User> Users { get; set; }
    }
}
