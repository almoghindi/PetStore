using Microsoft.AspNetCore.Mvc;
using PetShopServer.BL;
using PetShopServer.DAL.Models;

namespace PetShopServer.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpPost]
        public async Task<bool> AddComment(Comment comment)
        {
            if (comment == null || string.IsNullOrEmpty(comment.CommentMessage) || comment.ProductId == 0)
            {
                return false;
            }
            return await _commentService.AddComment(comment);
        }

        [HttpGet("{productId}")]
        public async Task<IEnumerable<Comment>> GetCommentsByProductId(int productId)
        {
            if (productId == 0)
            {
                return Enumerable.Empty<Comment>();
            }
            return await _commentService.GetCommentsByProductId(productId);
        }

    }
}
