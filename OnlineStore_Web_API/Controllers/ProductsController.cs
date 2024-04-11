using AllTheClouds_Web_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.Store;

namespace AllTheClouds_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public ProductsController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductList()
        {
            IEnumerable<ProductDto>? products = await _storeService.GetProductList();
            return products is not null ? Ok(products) : NotFound("No products could be found");
        }
    }
}
