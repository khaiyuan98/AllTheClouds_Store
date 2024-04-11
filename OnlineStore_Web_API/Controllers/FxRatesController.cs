using AllTheClouds_Web_API.Services;
using Microsoft.AspNetCore.Mvc;
using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.OnlineStore;

namespace OnlineStore_Web_API.Controllers
{
    [Route("api/fx-rates")]
    [ApiController]
    public class FxRatesController : ControllerBase
    {
        private readonly IStoreService _storeService;

        public FxRatesController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FxRateDto>>> GetFxRates()
        {
            IEnumerable<FxRateDto>? fxRates = await _storeService.GetFxRates();
            return fxRates is not null ? Ok(fxRates) : NotFound("No fx rates could be found");
        }
    }
}
