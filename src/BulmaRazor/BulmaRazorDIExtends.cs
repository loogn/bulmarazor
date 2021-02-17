using System;
using BulmaRazor;
using Microsoft.Extensions.DependencyInjection;

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
