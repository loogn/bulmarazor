using BulmaRazor.Components;

namespace BulmaRazor.Components
{
    public class ColorPickerOptions
    {
        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            // var def = BulmaRazorOptions.DefaultOptions.DatePickerOptions;
            // var format = Format ?? def.Format;
            // if (format.HasValue())
            // {
            //     //d, dd, m, mm, yy, yyyy, hh, ii.
            //     format = format.Replace("H", "h")
            //         .Replace("m", "i")
            //         .Replace("M", "m");
            //     ps.AddNotNull("format", format);
            // }

            // ps.AddNotNull("language", Language ?? def.Language);
           
            return ps;
        }
    }
}