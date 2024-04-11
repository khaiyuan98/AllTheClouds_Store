using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.OnlineStore;
using OnlineStore_Web_API.Models.Store;

namespace AllTheClouds_Web_API.Services
{
    public interface IStoreService
    {
        Task<IEnumerable<FxRateDto>?> GetFxRates();
        Task<IEnumerable<ProductDto>?> GetProductList();
        Task<IEnumerable<ProductDto>?> GetProductList(string currency);
        Task<bool> SubmitOrder(OrderDto order);
    }
}
