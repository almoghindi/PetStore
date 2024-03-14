using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetShopServer.DAL.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        public int ProductId { get; set; }

        [ForeignKey("AnimalId")]
        public virtual Product? Product { get; set; }

        [MaxLength(1000)]
        public string CommentMessage { get; set; }
    }

}
