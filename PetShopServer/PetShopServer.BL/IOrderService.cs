using PetShopServer.DAL.Models;

namespace PetShopServer.BL
{
    public interface IOrderService
    {
        Task<bool> AddOrder(Order order);
        Task<IEnumerable<Order>> GetOrdersByUserId(int userId);

    }
}
