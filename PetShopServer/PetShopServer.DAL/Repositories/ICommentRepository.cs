using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public interface ICommentRepository
    {
        bool AddComment(Comment comment);
        IEnumerable<Comment> GetCommentsByProductId(int productId);
    }
}
