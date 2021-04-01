using System.Collections.Generic;
using BulmaRazor.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// colorpicker选项
    /// </summary>
    public class ColorPickerOptions
    {
        /// <summary>
        /// 
        /// </summary>
        public string Alpha { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? AlphaChannel { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string AlphaElement { get; set; }

        /// <summary>
        /// 背景色
        /// </summary>
        public string BackgroundColor { get; set; }

        /// <summary>
        /// 边框颜色
        /// </summary>
        public string BorderColor { get; set; }

        /// <summary>
        /// 边框弧度
        /// </summary>
        public int? BorderRadius { get; set; }

        /// <summary>
        /// 边框宽度
        /// </summary>
        public int? BorderWidth { get; set; }

        /// <summary>
        /// 按钮颜色
        /// </summary>
        public string ButtonColor { get; set; }

        /// <summary>
        /// 按钮高度
        /// </summary>
        public int? ButtonHeight { get; set; }

        /// <summary>
        /// 是否显示关闭按钮
        /// </summary>
        public bool? CloseButton { get; set; }

        /// <summary>
        /// 关闭文本
        /// </summary>
        public string CloseText { get; set; }

        /// <summary>
        /// control边框色
        /// </summary>
        public string ControlBorderColor { get; set; }

        /// <summary>
        /// control边框宽度
        /// </summary>
        public int? ControlBorderWidth { get; set; }

        /// <summary>
        /// 十字架大小
        /// </summary>
        public int? CrossSize { get; set; }

        /// <summary>
        /// 强制样式
        /// </summary>
        public bool? ForceStyle { get; set; }

        /// <summary>
        /// auto | any | hex | hexa | rgb |rgba
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? Hash { get; set; }

        /// <summary>
        /// 高度
        /// </summary>
        public int? Height { get; set; }

        /// <summary>
        /// 离开隐藏
        /// </summary>
        public bool? HideOnLeave { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? HideOnPaletteClick { get; set; }

        /// <summary>
        /// HSV | HVS |HS |HV
        /// </summary>
        public string Mode { get; set; }
        // public int? OnChange{get;set;}
        // public int? OnInput{get;set;}

        /// <summary>
        /// 
        /// </summary>
        public int? Padding { get; set; }

        /// <summary>
        /// 预制调色板
        /// </summary>
        public IEnumerable<string> Palette { get; set; }

        /// <summary>
        /// 调色板列数
        /// </summary>
        public int? PaletteCols { get; set; }

        /// <summary>
        /// 调色板高度
        /// </summary>
        public int? PaletteHeight { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? PaletteSetsAlpha { get; set; }

        /// <summary>
        /// 调色板间距
        /// </summary>
        public int? PaletteSpacing { get; set; }

        /// <summary>
        /// 指针边框颜色
        /// </summary>
        public string PointerBorderColor { get; set; }

        /// <summary>
        /// 指针边框宽度
        /// </summary>
        public int? PointerBorderWidth { get; set; }

        /// <summary>
        /// 指针颜色
        /// </summary>
        public string PointerColor { get; set; }

        /// <summary>
        /// 指针厚度
        /// </summary>
        public int? PointerThickness { get; set; }

        /// <summary>
        /// bottom|left|right|top
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// 预览元素
        /// </summary>
        public string PreviewElement { get; set; }

        /// <summary>
        /// 预览padding
        /// </summary>
        public int? PreviewPadding { get; set; }

        /// <summary>
        /// left |right
        /// </summary>
        public string PreviewPosition { get; set; }

        /// <summary>
        /// 预览大小
        /// </summary>
        public int? PreviewSize { get; set; }

        /// <summary>
        /// 是否必填
        /// </summary>
        public bool? Required { get; set; }

        /// <summary>
        /// 阴影
        /// </summary>
        public bool? Shadow { get; set; }

        /// <summary>
        /// 阴影模糊值
        /// </summary>
        public int? ShadowBlur { get; set; }

        /// <summary>
        /// 阴影色
        /// </summary>
        public string ShadowColor { get; set; }

        /// <summary>
        /// 单击显示
        /// </summary>
        public bool? ShowOnClick { get; set; }

        /// <summary>
        /// 滑块大小
        /// </summary>
        public int? SliderSize { get; set; }

        /// <summary>
        /// 只能位置
        /// </summary>
        public bool? SmartPosition { get; set; }

        /// <summary>
        /// 是否转大写
        /// </summary>
        public bool? Uppercase { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; set; }

        // public int? ValueElement{get;set;}
        /// <summary>
        /// 宽度
        /// </summary>
        public int? Width { get; set; }

        /// <summary>
        /// z轴
        /// </summary>
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