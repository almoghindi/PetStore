namespace PetShopServer.DAL.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public IEnumerable<Product>? Products { get; set; }
        public double TotalPrice { get; set; }
    }
}
