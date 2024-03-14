using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts();
        IEnumerable<Product> GetAllProducts();
        Product GetProductById(int id);
        bool AddProduct(Product animal);
        bool UpdateProduct(Product animal);
        bool DeleteProduct(Product animal);
    }
}
