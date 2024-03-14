using PetShopServer.DAL.Data;
using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private PetStoreContext _context;

        public OrderRepository(PetStoreContext context)
        {
            _context = context;
        }

        public bool AddOrder(Order order)
        {
            try
            {
                _context.Orders!.Add(order);
                _context.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public IEnumerable<Order> GetOrdersByUserId(int userId)
        {
            return _context.Orders!.Where(o => o.UserId == userId);
        }
    }
}
