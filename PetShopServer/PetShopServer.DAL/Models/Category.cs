using System.ComponentModel.DataAnnotations;

namespace PetShopServer.DAL.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        public virtual ICollection<Product>? Animals { get; set; } = new List<Product>();
    }

}
