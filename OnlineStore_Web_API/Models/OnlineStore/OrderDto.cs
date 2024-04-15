using OnlineStore_Web_API.Models.AllTheClouds_API;
using System.ComponentModel.DataAnnotations;

namespace OnlineStore_Web_API.Models.OnlineStore
{
    public class OrderDto
    {
        public required string customerName { get; set; }

        [EmailAddress(ErrorMessage = "The email address is not valid")]
        public required string customerEmail { get; set; }
        public required List<OrderLineItemDto> lineItems { get; set; }
    }
}
