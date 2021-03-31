using System.Collections.Generic;
using BulmaRazor.Components;

namespace BulmaRazor.Components
{
    public class ColorPickerOptions
    {
        public string Alpha { get; set; }
        public bool? AlphaChannel { get; set; }
        public string AlphaElement { get; set; }
        public string BackgroundColor { get; set; }
        public string BorderColor { get; set; }
        public int? BorderRadius { get; set; }
        public int? BorderWidth { get; set; }
        public string ButtonColor { get; set; }
        public int? ButtonHeight { get; set; }
        public bool? CloseButton { get; set; }

        public string CloseText { get; set; }

        // public string Container{get;set;}
        public string ControlBorderColor { get; set; }
        public int? ControlBorderWidth { get; set; }
        public int? CrossSize { get; set; }
        public bool? ForceStyle { get; set; }

        /// <summary>
        /// auto | any | hex | hexa | rgb |rgba
        /// </summary>
        public string Format { get; set; }

        public bool? Hash { get; set; }
        public int? Height { get; set; }
        public bool? HideOnLeave { get; set; }
        public bool? HideOnPaletteClick { get; set; }

        /// <summary>
        /// HSV | HVS |HS |HV
        /// </summary>
        public string Mode { get; set; }
        // public int? OnChange{get;set;}
        // public int? OnInput{get;set;}

        public int? Padding { get; set; }
        public IEnumerable<string> Palette { get; set; }
        public int? PaletteCols { get; set; }
        public int? PaletteHeight { get; set; }
        public bool? PaletteSetsAlpha { get; set; }
        public int? PaletteSpacing { get; set; }
        public string PointerBorderColor { get; set; }
        public int? PointerBorderWidth { get; set; }
        public string PointerColor { get; set; }
        public int? PointerThickness { get; set; }

        /// <summary>
        /// bottom|left|right|top
        /// </summary>
        public string Position { get; set; }

        public string PreviewElement { get; set; }
        public int? PreviewPadding { get; set; }

        /// <summary>
        /// left |right
        /// </summary>
        public string PreviewPosition { get; set; }

        public int? PreviewSize { get; set; }
        public bool? Required { get; set; }
        public bool? Shadow { get; set; }
        public int? ShadowBlur { get; set; }
        public string ShadowColor { get; set; }
        public bool? ShowOnClick { get; set; }
        public int? SliderSize { get; set; }
        public bool? SmartPosition { get; set; }
        public bool? Uppercase { get; set; }

        public string Value { get; set; }

        // public int? ValueElement{get;set;}
        public int? Width { get; set; }
        public int? ZIndex { get; set; }

        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.ColorPickerOptions;
            ps.AddNotNull("alpha", Alpha ?? def.Alpha);
            ps.AddNotNull("alphaChannel", AlphaChannel ?? def.AlphaChannel);
            ps.AddNotNull("alphaElement", AlphaElement ?? def.AlphaElement);
            ps.AddNotNull("backgroundColor", BackgroundColor ?? def.BackgroundColor);
            ps.AddNotNull("borderColor", BorderColor ?? def.BorderColor);
            ps.AddNotNull("borderRadius", BorderRadius ?? def.BorderRadius);
            ps.AddNotNull("borderWidth", BorderWidth ?? def.BorderWidth);
            ps.AddNotNull("buttonColor", ButtonColor ?? def.ButtonColor);
            ps.AddNotNull("buttonHeight", ButtonHeight ?? def.ButtonHeight);
            ps.AddNotNull("closeButton", CloseButton ?? def.CloseButton);
            ps.AddNotNull("closeText", CloseText ?? def.CloseText);
            ps.AddNotNull("controlBorderColor", ControlBorderColor ?? def.ControlBorderColor);
            ps.AddNotNull("controlBorderWidth", ControlBorderWidth ?? def.ControlBorderWidth);
            ps.AddNotNull("crossSize", CrossSize ?? def.CrossSize);
            ps.AddNotNull("forceStyle", ForceStyle ?? def.ForceStyle);
            ps.AddNotNull("format", Format ?? def.Format);
            ps.AddNotNull("hash", Hash ?? def.Hash);
            ps.AddNotNull("height", Height ?? def.Height);
            ps.AddNotNull("hideOnLeave", HideOnLeave ?? def.HideOnLeave);
            ps.AddNotNull("hideOnPaletteClick", HideOnPaletteClick ?? def.HideOnPaletteClick);
            ps.AddNotNull("mode", Mode ?? def.Mode);
            ps.AddNotNull("padding", Padding ?? def.Padding);
            ps.AddNotNull("palette", Palette ?? def.Palette);
            ps.AddNotNull("paletteCols", PaletteCols ?? def.PaletteCols);
            ps.AddNotNull("paletteHeight", PaletteHeight ?? def.PaletteHeight);
            ps.AddNotNull("paletteSetsAlpha", PaletteSetsAlpha ?? def.PaletteSetsAlpha);
            ps.AddNotNull("paletteSpacing", PaletteSpacing ?? def.PaletteSpacing);
            ps.AddNotNull("pointerBorderColor", PointerBorderColor ?? def.PointerBorderColor);
            ps.AddNotNull("pointerBorderWidth", PointerBorderWidth ?? def.PointerBorderWidth);
            ps.AddNotNull("pointerColor", PointerColor ?? def.PointerColor);
            ps.AddNotNull("pointerThickness", PointerThickness ?? def.PointerThickness);
            ps.AddNotNull("position", Position ?? def.Position);
            ps.AddNotNull("previewElement", PreviewElement ?? def.PreviewElement);
            ps.AddNotNull("previewPadding", PreviewPadding ?? def.PreviewPadding);
            ps.AddNotNull("previewPosition", PreviewPosition ?? def.PreviewPosition);
            ps.AddNotNull("previewSize", PreviewSize ?? def.PreviewSize);
            ps.AddNotNull("required", Required ?? def.Required);
            ps.AddNotNull("shadow", Shadow ?? def.Shadow);
            ps.AddNotNull("shadowBlur", ShadowBlur ?? def.ShadowBlur);
            ps.AddNotNull("shadowColor", ShadowColor ?? def.ShadowColor);
            ps.AddNotNull("showOnClick", ShowOnClick ?? def.ShowOnClick);
            ps.AddNotNull("sliderSize", SliderSize ?? def.SliderSize);
            ps.AddNotNull("smartPosition", SmartPosition ?? def.SmartPosition);
            ps.AddNotNull("uppercase", Uppercase ?? def.Uppercase);
            ps.AddNotNull("value", Value ?? def.Value);
            ps.AddNotNull("width", Width ?? def.Width);
            ps.AddNotNull("zIndex", ZIndex ?? def.ZIndex);

            return ps;
        }
    }
}