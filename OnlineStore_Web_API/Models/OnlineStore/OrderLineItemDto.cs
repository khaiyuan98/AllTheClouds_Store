using System.ComponentModel.DataAnnotations;

namespace OnlineStore_Web_API.Models.OnlineStore
{
    public class OrderLineItemDto
    {
        public required string productId { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "quantity must be greater than zero")]
        public int quantity { get; set; }
    }
}
    