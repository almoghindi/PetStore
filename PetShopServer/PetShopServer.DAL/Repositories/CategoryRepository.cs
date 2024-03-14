using PetShopServer.DAL.Data;
using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private PetStoreContext _context;
        public CategoryRepository(PetStoreContext context)
        {
            _context = context;
        }
        public IEnumerable<Category> GetCategories()
        {
            return _context.Categories!;
        }
        public IEnumerable<Product> GetProductsByCategory(string categoryName)
        {
            return _context.Products!.Where(a => a.Category!.Name == categoryName).ToList();
        }
    }
}
