using AllTheClouds_Web_API.Services;
using AutoMapper;
using OnlineStore_Web_API;
using OnlineStore_Web_API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Auto Mapper Configurations
var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new AutoMapperProfile());
});
IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

// Enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options
    .WithOrigins(builder.Configuration.GetSection("CorsPolicy:AllowedOrigins").Get<string[]>() ?? new string[] { })
    .WithMethods(builder.Configuration.GetSection("CorsPolicy:AllowedMethods").Get<string[]>() ?? new string[] { })
    .WithHeaders(builder.Configuration.GetSection("CorsPolicy:AllowedHeaders").Get<string[]>() ?? new string[] { })
    .AllowCredentials());
});

// Add AllTheClouds Services
builder.Services.AddScoped<IStoreService, StoreService>();

// Swagger Configuration
builder.Services.AddSwaggerGen(opt => opt.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
{
    Title = "Online Store Web API"
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS
app.UseCors("AllowOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Use the Exception Middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseExceptionMiddleware();

app.Run();
