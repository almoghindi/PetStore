using PetShopServer.DAL.Models;
using PetShopServer.DAL.Repositories;

namespace PetShopServer.BL
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<bool> AddOrder(Order order)
        {
            if (order == null || order.Products == null || order.Products.Count() == 0 || order.UserId == 0)
            {
                return false;
            }
            return await _orderRepository.AddOrder(order);
        }

        public Task<IEnumerable<Order>> GetOrdersByUserId(int userId)
        {
            throw new NotImplementedException();
        }
    }
}
