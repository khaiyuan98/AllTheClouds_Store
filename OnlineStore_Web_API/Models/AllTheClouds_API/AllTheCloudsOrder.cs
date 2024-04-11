namespace OnlineStore_Web_API.Models.AllTheClouds_API
{
    public class AllTheCloudsOrder
    {
        public required string customerName { get; set; }
        public required string customerEmail { get; set; }
        public required List<AllTheCloudsOrderLineItem> lineItems { get; set; }
    }
}
