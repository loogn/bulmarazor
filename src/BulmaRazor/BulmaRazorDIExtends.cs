using System;
using BulmaRazor.Components;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class BulmaRazorDIExtends
    {
        public static IServiceCollection AddBulmaRazor(this IServiceCollection services)
        {
            services.AddScoped<BulmaRazorJsInterop>();
            return services;
        }
    }
}