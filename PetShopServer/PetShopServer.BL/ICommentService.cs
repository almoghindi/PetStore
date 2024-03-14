using PetShopServer.DAL.Models;

namespace PetShopServer.BL
{
    public interface ICommentService
    {
        Task<bool> AddComment(Comment comment);
        Task<IEnumerable<Comment>> GetCommentsByProductId(int animalId);

    }
}
