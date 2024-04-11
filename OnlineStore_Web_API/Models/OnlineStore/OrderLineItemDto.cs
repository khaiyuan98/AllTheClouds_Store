namespace OnlineStore_Web_API.Models.OnlineStore
{
    public class OrderLineItemDto
    {
        public required string productId { get; set; }
        public int quantity { get; set; }
    }
}
