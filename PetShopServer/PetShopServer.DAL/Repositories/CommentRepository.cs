using PetShopServer.DAL.Data;
using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private PetStoreContext _context;
        public CommentRepository(PetStoreContext context)
        {
            _context = context;
        }

        public bool AddComment(Comment comment)
        {
            try
            {
                _context.Comments!.Add(comment);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }
        public IEnumerable<Comment> GetCommentsByProductId(int productId)
        {
            return _context.Comments!.Where(c => c.ProductId == productId);
        }
    }
}
