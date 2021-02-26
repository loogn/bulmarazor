using BulmaRazor.Components;

namespace BulmaRazor
{
    public class BulmaRazorOptions
    {
        internal static BulmaRazorOptions DefaultOptions { get; } = new()
        {
            DefaultToastConfig = new ToastConfig()
        };
        
        public ToastConfig DefaultToastConfig { get; private init; }
    }
}