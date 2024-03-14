using PetShopServer.DAL.Models;
using PetShopServer.DAL.Repositories;

namespace PetShopServer.BL
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<bool> AddComment(Comment comment)
        {
            if (comment == null || string.IsNullOrEmpty(comment.CommentMessage) || comment.ProductId == 0)
            {
                return false;
            }
            return await _commentRepository.AddComment(comment);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByProductId(int animalId)
        {
            if (animalId == 0)
            {
                return [];
            }
            return await _commentRepository.GetCommentsByProductId(animalId);
        }
    }
}
