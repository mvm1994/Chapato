using Chapato.Application.Interfaces.Contexts;
using Chapato.Application.Interfaces.FacadPatterns;
using Chapato.Application.Services.Products.FacadPattern;
using Chapato.Application.Services.Uploads.FacadPattern;
using Chapato.Application.Services.Users.Commands.RegisterUser;
using Chapato.Application.Services.Users.FacadPattern;
using Chapato.Common;
using Chapato.Persistence.Contexts;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews()
.AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;

}).AddCookie(options =>
{
    options.LoginPath = new PathString("/");
    options.ExpireTimeSpan = TimeSpan.FromDays(1);
});

// Configure your DbContext

builder.Services.AddDbContext<DataBaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Chapato_DB"))
           .ConfigureWarnings(warnings => warnings.Default(WarningBehavior.Ignore)));



builder.Services.AddScoped<IDataBaseContext, DataBaseContext>();
builder.Services.AddScoped<IRegisterUserService, RegisterUserService>();

// Facade Patterns
builder.Services.AddScoped<IUserFacad, UserFacad>();
builder.Services.AddScoped<IProductFacad, ProductFacad>();
builder.Services.AddScoped<IUploadFacad, UploadFacad>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<ModeCookie>();
builder.Services.AddScoped<PasswordHasher>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Admin Area Routing
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();
