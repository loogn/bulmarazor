using BulmaRazor.Components;

namespace BulmaRazor
{
    public class BulmaRazorOptions
    {
        internal static BulmaRazorOptions DefaultOptions { get; } = new()
        {
            ToastOptions = new ToastOptions(),
            CalenderOptions = new CalenderOptions()
        };
        
        public ToastOptions ToastOptions { get; private init; }
        public CalenderOptions CalenderOptions { get; private init; }
    }
}