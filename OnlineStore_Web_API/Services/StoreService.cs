using AutoMapper;
using Newtonsoft.Json;
using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.OnlineStore;
using OnlineStore_Web_API.Models.Store;
using System.Net.Http;
using System.Security.Principal;

namespace AllTheClouds_Web_API.Services
{
    public class StoreService : IStoreService
    {
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly string? _apiToken;
        private readonly string? _getProductsUrl;
        private readonly string? _getFxRateUrl;
        private readonly string? _postOrderUrl;

        public StoreService(IConfiguration configuration, IMapper mapper)
        {
            _configuration = configuration;
            _mapper = mapper;
            _apiToken = _configuration["AllTheClouds_API:API_TOKEN"];
            _getProductsUrl = _configuration["AllTheClouds_API:GET_PRODUCTS_URL"];
            _getFxRateUrl = _configuration["AllTheClouds_API:GET_FXRATE_URL"];
            _postOrderUrl = _configuration["AllTheClouds_API:POST_ORDER_URL"];
        }

        private HttpClient AllTheClouds_API_HttpClient() 
        {
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("api-key", _apiToken);
            return httpClient;
        }

        public async Task<IEnumerable<ProductDto>?> GetProductList()
        {
            using (HttpClient httpClient = AllTheClouds_API_HttpClient()) 
            {
                try
                {
                    // Send a GET request to a URL
                    HttpResponseMessage response = await httpClient.GetAsync(_getProductsUrl);

                    // Check if the response is successful (status code 200-299)
                    if (response.IsSuccessStatusCode)
                    {
                        // Read and display the response content as a string
                        string responseBody = await response.Content.ReadAsStringAsync();
                        IEnumerable<AllTheCloudsProduct>? results = JsonConvert.DeserializeObject<List<AllTheCloudsProduct>>(responseBody);
                        return _mapper.Map<IEnumerable<AllTheCloudsProduct>, IEnumerable<ProductDto>>(results);
                    }
                    else
                    {
                        // If the response is not successful, print the status code
                        Console.WriteLine($"Request failed with status code {response.StatusCode}");
                        return null;
                    }
                }
                catch (HttpRequestException e)
                {
                    // If an exception occurs during the request, print the error message
                    Console.WriteLine($"Request exception: {e.Message}");
                    return null;
                }
                catch (Exception e) 
                {
                    return null;
                }
            }
        }

        public async Task<IEnumerable<ProductDto>?> GetProductList(string currency)
        {
            IEnumerable<ProductDto>? products = await GetProductList();
            if (products is null)
                return null;

            if (currency == "AUD")
                return products;

            IEnumerable<FxRateDto>? fxRates = await GetFxRates();
            if (fxRates is null)
                return null;

            FxRateDto? fxRate = fxRates.FirstOrDefault(x => x.targetCurrency == currency && x.sourceCurrency == "AUD");
            if (fxRate is null)
                return null;

            foreach (ProductDto product in products)
            {
                product.basePrice *= fxRate.rate;
            }

            return products;
        }

        public async Task<IEnumerable<FxRateDto>?> GetFxRates() 
        {
            using (HttpClient httpClient = AllTheClouds_API_HttpClient())
            {
                try
                {
                    // Send a GET request to a URL
                    HttpResponseMessage response = await httpClient.GetAsync(_getFxRateUrl);

                    // Check if the response is successful (status code 200-299)
                    if (response.IsSuccessStatusCode)
                    {
                        // Read and display the response content as a string
                        string responseBody = await response.Content.ReadAsStringAsync();
                        IEnumerable<AllTheCloudsFxRate>? results = JsonConvert.DeserializeObject<List<AllTheCloudsFxRate>>(responseBody);
                        return _mapper.Map<IEnumerable<AllTheCloudsFxRate>, IEnumerable<FxRateDto>>(results);
                    }
                    else
                    {
                        // If the response is not successful, print the status code
                        Console.WriteLine($"Request failed with status code {response.StatusCode}");
                        return null;
                    }
                }
                catch (HttpRequestException e)
                {
                    // If an exception occurs during the request, print the error message
                    Console.WriteLine($"Request exception: {e.Message}");
                    return null;
                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

        public async Task<bool> SubmitOrder(OrderDto order) 
        {
            using (HttpClient httpClient = AllTheClouds_API_HttpClient())
            {
                try
                {
                    AllTheCloudsOrder mappedOrder = _mapper.Map<AllTheCloudsOrder>(order);

                    // Send a GET request to a URL
                    HttpResponseMessage response = await httpClient.PostAsJsonAsync(_postOrderUrl, mappedOrder);
                    return response.IsSuccessStatusCode;
                }
                catch (HttpRequestException e)
                {
                    // If an exception occurs during the request, print the error message
                    Console.WriteLine($"Request exception: {e.Message}");
                    return false;
                }
            }
        }

    }
}
