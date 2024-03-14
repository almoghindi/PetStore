using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetShopServer.DAL.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [MaxLength(255)]
        public string? Name { get; set; }

        public double Price { get; set; }

        [MaxLength(255)]
        public string? PictureUrl { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public virtual Category? Category { get; set; }

        public virtual ICollection<Comment>? Comments { get; set; } = new List<Comment>();
    }

}
