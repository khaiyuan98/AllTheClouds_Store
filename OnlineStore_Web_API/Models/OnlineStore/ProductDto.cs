using System.Text.Json.Serialization;

namespace OnlineStore_Web_API.Models.Store
{
    public class ProductDto
    {
        private const double markup = 1.20;

        public string? productId { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public int? maximumQuantity { get; set; }

        [JsonIgnore]
        public double basePrice { get; set; }

        public double unitPrice => Math.Round(basePrice * markup, 2);
    }
}
