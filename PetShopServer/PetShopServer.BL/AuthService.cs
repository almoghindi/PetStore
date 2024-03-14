using PetShopServer.DAL.Repositories;
using System.Text.RegularExpressions;

namespace PetShopServer.BL
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;

        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        public async Task<bool> Signup(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password) || userName.Length < 3 || password.Length < 6 || !Regex.IsMatch(password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$"))
            {
                return false;
            }

            return await _authRepository.Signup(userName, password);
        }

        public async Task<bool> Login(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
            {
                return false;
            }
            return await _authRepository.Login(userName, password);
        }

        public async Task Logout()
        {
            await _authRepository.Logout();
        }


    }
}
