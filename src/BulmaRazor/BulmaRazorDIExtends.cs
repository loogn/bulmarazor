using System;
using BulmaRazor.Components;
using BulmaRazor;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class BulmaRazorDIExtends
    {
        public static IServiceCollection AddBulmaRazor(this IServiceCollection services)
        {
            return AddBulmaRazor(services,null);
        }
        
        public static IServiceCollection AddBulmaRazor(this IServiceCollection services,Action<BulmaRazorOptions> setOptions)
        {
            services.AddScoped<BulmaRazorJsInterop>();
            services.AddScoped<ToastJs>();
            
            setOptions?.Invoke(BulmaRazorOptions.DefaultOptions);
            
            return services;
        }
    }
}