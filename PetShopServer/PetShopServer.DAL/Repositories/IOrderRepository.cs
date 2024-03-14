using PetShopServer.DAL.Models;

namespace PetShopServer.DAL.Repositories
{
    public interface IOrderRepository
    {
        bool AddOrder(Order order);
        IEnumerable<Order> GetOrdersByUserId(int userId);

    }
}
