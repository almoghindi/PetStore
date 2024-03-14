using Microsoft.AspNetCore.Mvc;
using PetShopServer.BL;
using System.Text.RegularExpressions;

namespace PetShopServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest("Username empty!");
            }
            else if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Password empty!");
            }
            else if (userName.Length < 3)
            {
                return BadRequest("Username too short! min 3 characters required");
            }

            else if (password.Length < 6)
            {
                return BadRequest("Password too short! min 6 characters required");
            }
            else if (!Regex.IsMatch(password, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$"))
            {
                return BadRequest("Password should include Uppercase, Lowercase, Number and Special character");
            }

            var result = await _authService.Signup(userName, password);

            if (result)
            {
                return Ok("User created successfully.");
            }
            else
            {
                return BadRequest("User creation failed.");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest("Username empty!");
            }
            else if (string.IsNullOrEmpty(password))
            {
                return BadRequest("Password empty!");
            }

            var result = await _authService.Login(userName, password);

            if (result)
            {
                return Ok("Logged in successfully!");
            }

            // Handle different outcomes of the login attempt (e.g., locked out, requires two-factor)
            return Unauthorized("Wrong credantials please try again!");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.Logout();
            return Ok();
        }
    }
}
