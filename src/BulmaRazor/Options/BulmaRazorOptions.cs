using BulmaRazor.Components;

namespace BulmaRazor
{
    public class BulmaRazorOptions
    {
        internal static BulmaRazorOptions DefaultOptions { get; } = new()
        {
            ToastOptions = new ToastOptions(),
            DatePickerOptions = new DatePickerOptions(),
            TuiEditorOptions = new TuiEditorOptions()
        };
        
        public  TuiEditorOptions TuiEditorOptions { get; set; }
        public ToastOptions ToastOptions { get; private init; }
        public DatePickerOptions DatePickerOptions { get; private init; }
    }
}