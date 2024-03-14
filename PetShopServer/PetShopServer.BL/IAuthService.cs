namespace PetShopServer.BL
{
    public interface IAuthService
    {
        Task<bool> Signup(string userName, string password);
        Task<bool> Login(string userName, string password);
        Task Logout();
    }
}
