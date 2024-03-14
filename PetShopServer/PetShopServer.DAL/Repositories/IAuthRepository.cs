namespace PetShopServer.DAL.Repositories
{
    public interface IAuthRepository
    {
        Task<bool> Signup(string userName, string password);
        Task<bool> Login(string userName, string password);
        Task Logout();
    }
}
