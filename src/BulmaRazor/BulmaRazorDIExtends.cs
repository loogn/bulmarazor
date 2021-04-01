using System;
using BulmaRazor.Components;
using BulmaRazor;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// DI帮助类
    /// </summary>
    public static class BulmaRazorDIExtends
    {
        /// <summary>
        /// 添加BulmaRazor服务
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddBulmaRazor(this IServiceCollection services)
        {
            return AddBulmaRazor(services, null);
        }

        /// <summary>
        /// 添加BulmaRazor服务
        /// </summary>
        /// <param name="services"></param>
        /// <param name="setOptions"></param>
        /// <returns></returns>
        public static IServiceCollection AddBulmaRazor(this IServiceCollection services,
            Action<BulmaRazorOptions> setOptions)
        {
            services.AddScoped<BulmaRazorJsInterop>();
            services.AddScoped<ToastService>();

            setOptions?.Invoke(BulmaRazorOptions.DefaultOptions);

            return services;
        }
    }
}