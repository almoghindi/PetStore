using System.ComponentModel.DataAnnotations;

namespace PetShopServer.DAL.Models
{
    public class User
    {
        //public int UserId { get; set; }
        [Required]
        [MinLength(3)]
        public string? Username { get; set; }

        [Required]
        [MinLength(6)]
        public string? Password { get; set; }
    }
}
