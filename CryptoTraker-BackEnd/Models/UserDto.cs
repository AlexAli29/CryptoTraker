using System.ComponentModel.DataAnnotations;

namespace CryptoTraker_BackEnd.Models
{
    public class UserDto
    {
        [Key]
        public Guid? UserId { get; set; }
        public string? Username { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Role { get; set; } = string.Empty;

        public string? Coins { get; set; }
        public string? Password { get; set; } = string.Empty;



    }
}
