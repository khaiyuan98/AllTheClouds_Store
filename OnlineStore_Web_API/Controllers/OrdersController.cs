using AllTheClouds_Web_API.Services;
using Microsoft.AspNetCore.Mvc;
using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.OnlineStore;
using OnlineStore_Web_API.Models.Store;

namespace OnlineStore_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public OrdersController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpPost]
        public async Task<ActionResult<bool>> SubmitOrder(OrderDto order)
        {
            bool results = await _storeService.SubmitOrder(order);
            return results ? Ok("Order submitted") : StatusCode(500, "Order could not be submitted");
        }
    }
}
