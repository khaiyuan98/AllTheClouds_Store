namespace OnlineStore_Web_API.Models.OnlineStore
{
    public class FxRateDto
    {
        public string? sourceCurrency { get; set; }
        public string? targetCurrency { get; set; }
        public double rate { get; set; }
    }
}
