using BulmaRazor.Components;

namespace BulmaRazor
{
    /// <summary>
    /// BulmaRazorOptions
    /// </summary>
    public class BulmaRazorOptions
    {
        internal static BulmaRazorOptions DefaultOptions { get; } = new()
        {
            ToastOptions = new ToastOptions(),
            DatePickerOptions = new DatePickerOptions(),
            TuiEditorOptions = new TuiEditorOptions(),
            ColorPickerOptions = new ColorPickerOptions(),
            WangEditorOptions = new WangEditorOptions(),
            CarouselOptions = new CarouselOptions()
        };

        /// <summary>
        /// TuiEditorOptions
        /// </summary>
        public TuiEditorOptions  TuiEditorOptions { get; private init; }
        /// <summary>
        /// ToastOptions
        /// </summary>
        public ToastOptions ToastOptions { get; private init; }
        /// <summary>
        /// DatePickerOptions
        /// </summary>
        public DatePickerOptions DatePickerOptions { get; private init; }
        /// <summary>
        /// ColorPickerOptions
        /// </summary>
        public ColorPickerOptions ColorPickerOptions { get; private init; }
        /// <summary>
        /// WangEditorOptions
        /// </summary>
        public WangEditorOptions WangEditorOptions { get; private init; }
        /// <summary>
        /// CarouselOptions
        /// </summary>
        public CarouselOptions CarouselOptions { get; private init;}
    }
}