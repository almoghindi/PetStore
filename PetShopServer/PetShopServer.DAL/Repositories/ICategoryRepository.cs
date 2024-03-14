using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetCategories();
        IEnumerable<Product> GetProductsByCategory(string categoryName);
    }
}
