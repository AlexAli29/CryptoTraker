using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CryptoTraker_BackEnd.Models
{
    public class User
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public Guid? UserId { get; set; }
        public string Username { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string? Coins { get; set; }
        public string PasswordHash { get; set; }      
        public string RefreshToken { get; set; } = string.Empty;

        public DateTime TokenCreated { get; set; }

        public DateTime TokenExpires { get; set; }
    }
}
