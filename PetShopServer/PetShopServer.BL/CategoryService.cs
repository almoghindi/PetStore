using PetShopServer.DAL.Models;
using PetShopServer.DAL.Repositories;

namespace PetShopServer.BL
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _categoryRepository.GetAllCategories();
        }

        public async Task<IEnumerable<Product>> GetProductsByCategory(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return [];
            }
            return await _categoryRepository.GetProductsByCategory(categoryName);
        }
    }
}
