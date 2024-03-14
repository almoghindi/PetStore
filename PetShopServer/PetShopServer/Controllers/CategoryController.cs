using Microsoft.AspNetCore.Mvc;
using PetShopServer.BL;
using PetShopServer.DAL.Models;

namespace PetShopServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _categoryService.GetAllCategories();
        }

        [HttpGet("{categoryName}")]
        public async Task<IEnumerable<Product>> GetProductsByCategory(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return Enumerable.Empty<Product>();
            }
            return await _categoryService.GetProductsByCategory(categoryName);
        }
    }
}
