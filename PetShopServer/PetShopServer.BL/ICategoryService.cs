using PetShopServer.DAL.Models;

namespace PetShopServer.BL
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategories();
        Task<IEnumerable<Product>> GetProductsByCategory(string categoryName);

    }
}
