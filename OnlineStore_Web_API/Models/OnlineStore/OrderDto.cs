using OnlineStore_Web_API.Models.AllTheClouds_API;

namespace OnlineStore_Web_API.Models.OnlineStore
{
    public class OrderDto
    {
        public required string customerName { get; set; }
        public required string customerEmail { get; set; }
        public required List<OrderLineItemDto> lineItems { get; set; }
    }
}
