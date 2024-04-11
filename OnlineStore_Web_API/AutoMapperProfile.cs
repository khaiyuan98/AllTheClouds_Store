using AutoMapper;
using OnlineStore_Web_API.Models.AllTheClouds_API;
using OnlineStore_Web_API.Models.OnlineStore;
using OnlineStore_Web_API.Models.Store;

namespace OnlineStore_Web_API
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AllTheCloudsFxRate, FxRateDto>();
            CreateMap<OrderDto, AllTheCloudsOrder>();
            CreateMap<OrderLineItemDto, AllTheCloudsOrderLineItem>();

            CreateMap<AllTheCloudsProduct, ProductDto>()
                .ForMember(dest => dest.basePrice,
                opt => opt.MapFrom((src, dest) => src.unitPrice));
        }
    }
}
