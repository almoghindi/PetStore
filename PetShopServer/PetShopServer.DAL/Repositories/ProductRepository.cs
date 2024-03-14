using Microsoft.EntityFrameworkCore;
using PetShopServer.DAL.Data;
using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private PetStoreContext _context;
        public ProductRepository(PetStoreContext context)
        {
            _context = context;

        }

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products!;
        }
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products!.Include(a => a.Comments).ToList();
        }


        public Product GetProductById(int id)
        {
            return _context.Products.Find(id);
        }



        public bool AddProduct(Product product)
        {
            try
            {
                _context.Products!.Add(product);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }

        }

        public bool UpdateProduct(Product product)
        {
            try
            {
                var productToUpdate = _context.Products!.Single(a => a.ProductId == product.ProductId);
                productToUpdate.Name = product.Name;
                productToUpdate.Price = product.Price;
                productToUpdate.PictureUrl = product.PictureUrl;
                productToUpdate.Description = product.Description;
                productToUpdate.CategoryId = product.CategoryId;
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteProduct(Product product)
        {
            try
            {
                _context.Products!.Remove(product);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }


    }
}
