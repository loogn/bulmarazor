using System;
using System.Collections.Generic;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    public class WangEditorOptions
    {
        /// <summary>
        /// 编辑区域高度默认为 300px
        /// </summary>
        public int? Height { get; set; }

        /// <summary>
        /// 编辑器 z-index 默认为 20
        /// </summary>
        public int? ZIndex { get; set; } = 20;

        /// <summary>
        /// 可以修改 placeholder 的提示文字。
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// 编辑器初始化时，默认会自动 focus 到编辑区域。可通过如下操作，取消自动 focus 。
        /// </summary>
        public bool? Focus { get; set; }

        /// <summary>
        /// 配置菜单栏，删减菜单，调整顺序
        /// head,bold,fontSize,fontName,italic,underline,strikeThrough,indent,
        /// lineHeight,foreColor,backColor,link,list,todo,justify,quote,emoticon,
        /// image,video,table,code,splitLine,undo,redo,
        /// </summary>
        public IEnumerable<string> Menus { get; set; }

        /// <summary>
        /// 当只需剔除少数菜单的时候，直接设置不需要的菜单
        /// </summary>
        public IEnumerable<string> ExcludeMenus { get; set; }

        /// <summary>
        /// 编辑器的字体颜色和背景色
        /// </summary>
        public IEnumerable<string> Colors { get; set; }

        /// <summary>
        /// 编辑器的行高
        /// </summary>
        public IEnumerable<string> LineHeights { get; set; }


        /// <summary>
        /// 编辑器的字体
        /// </summary>
        public IEnumerable<string> FontNames { get; set; }

        /// <summary>
        /// 屏功能按钮,默认true
        /// </summary>
        public bool? ShowFullScreen { get; set; }

        /// <summary>
        /// 菜单栏提示，默认true
        /// </summary>
        public bool? ShowMenuTooltips { get; set; }

        /// <summary>
        /// 设置菜单栏提示为上标还是下标,up|down 默认up
        /// </summary>
        public string MenuTooltipPosition { get; set; }

        /// <summary>
        /// 配置触发 onchange 的时间频率，默认为 200ms
        /// </summary>
        public int? OnchangeTimeout { get; set; }


        /// <summary>
        /// 编辑器会默认过滤掉复制文本的样式,默认true
        /// </summary>
        public bool? PasteFilterStyle { get; set; }

        /// <summary>
        /// 忽略粘贴内容中的图片,默认false
        /// </summary>
        public bool? PasteIgnoreImg { get; set; }

        #region UploadImage

        /// <summary>
        /// base64 保存图片,默认true
        /// </summary>
        public bool? UploadImgShowBase64 { get; set; } = true;

        /// <summary>
        /// 上传服务端接口
        /// </summary>
        public string UploadImgServer { get; set; }

        /// <summary>
        /// 默认限制图片大小是 5M,单位bit
        /// </summary>
        public long? UploadImgMaxSize { get; set; }

        /// <summary>
        /// 限制类型,默认为['jpg', 'jpeg', 'png', 'gif', 'bmp']
        /// </summary>
        public IEnumerable<string> UploadImgAccept { get; set; }

        /// <summary>
        /// 限制一次最多能传几张图片,默认100
        /// </summary>
        public int? UploadImgMaxLength { get; set; }

        /// <summary>
        /// 自定义上传参数
        /// </summary>
        public Dictionary<string, object> UploadImgParams { get; set; }

        /// <summary>
        /// 如果需要将参数拼接到 url 中,可以设置成true
        /// </summary>
        public bool? UploadImgParamsWithUrl { get; set; }

        /// <summary>
        /// 自定义 fileName
        /// </summary>
        public string UploadFileName { get; set; }

        /// <summary>
        /// 自定义上传头
        /// </summary>
        public Dictionary<string, object> UploadImgHeaders { get; set; }

        /// <summary>
        /// 跨域上传中如果需要传递 cookie 需设置true
        /// </summary>
        public bool? WithCredentials { get; set; }

        /// <summary>
        /// 上传接口等待的最大时间，默认是 10 秒钟
        /// </summary>
        public int? UploadImgTimeout { get; set; }

        /// <summary>
        /// 隐藏插入网络图片,可以设置成false
        /// </summary>
        public bool? ShowLinkImg { get; set; }

        /// <summary>
        /// 配置alt选项,默认true
        /// </summary>
        public bool? ShowLinkImgAlt { get; set; }

        /// <summary>
        /// 配置超链接,默认true
        /// </summary>
        public bool? ShowLinkImgHref { get; set; }

        #endregion

        #region UploadVideo

        /// <summary>
        /// 上传服务端接口
        /// </summary>
        public string UploadVideoServer { get; set; }

        /// <summary>
        /// 默认限制图片大小是 1024M,单位bit
        /// </summary>
        public long? UploadVideoMaxSize { get; set; }

        /// <summary>
        /// 限制类型,默认为['mp4']
        /// </summary>
        public IEnumerable<string> UploadVideoAccept { get; set; }

        /// <summary>
        /// 自定义上传参数
        /// </summary>
        public Dictionary<string, object> UploadVideoParams { get; set; }

        /// <summary>
        /// 如果需要将参数拼接到 url 中,可以设置成true
        /// </summary>
        public bool? UploadVideoParamsWithUrl { get; set; }

        /// <summary>
        /// 自定义 fileName
        /// </summary>
        public string UploadVideoName { get; set; }

        /// <summary>
        /// 自定义上传头
        /// </summary>
        public Dictionary<string, object> UploadVideoHeaders { get; set; }

        /// <summary>
        /// 跨域上传中如果需要传递 cookie 需设置true
        /// </summary>
        public bool? WithVideoCredentials { get; set; }

        /// <summary>
        /// 上传接口等待的最大时间，默认是 5 分钟
        /// </summary>
        public int? UploadVideoTimeout { get; set; }

        /// <summary>
        /// 隐藏插入网络视频,可以设置成false
        /// </summary>
        public bool? ShowLinkVideo { get; set; }

        #endregion


        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.WangEditorOptions;
            ps.AddNotNull("height", Height??def.Height);
            ps.AddNotNull("zIndex", ZIndex??def.ZIndex);
            ps.AddNotNull("placeholder", Placeholder??def.Placeholder);
            ps.AddNotNull("focus", Focus??def.Focus);
            ps.AddNotNull("menus", Menus ?? def.Menus);
            ps.AddNotNull("excludeMenus", ExcludeMenus ?? def.ExcludeMenus);
            ps.AddNotNull("colors", Colors ?? def.Colors);
            ps.AddNotNull("lineHeights", LineHeights ?? def.LineHeights);
            ps.AddNotNull("fontNames", FontNames ?? def.FontNames);
            ps.AddNotNull("showFullScreen", ShowFullScreen ?? def.ShowFullScreen);
            ps.AddNotNull(" ShowMenuTooltips", ShowMenuTooltips ?? def.ShowMenuTooltips);
            ps.AddNotNull("menuTooltipPosition", MenuTooltipPosition ?? def.MenuTooltipPosition);
            ps.AddNotNull("onchangeTimeout", OnchangeTimeout ?? def.OnchangeTimeout);
            ps.AddNotNull("pasteFilterStyle", PasteFilterStyle ?? def.PasteFilterStyle);
            ps.AddNotNull("pasteIgnoreImg", PasteIgnoreImg ?? def.PasteIgnoreImg);
            ps.AddNotNull("uploadImgShowBase64", UploadImgShowBase64 ?? def.UploadImgShowBase64);
            ps.AddNotNull("uploadImgServer", UploadImgServer ?? def.UploadImgServer);
            ps.AddNotNull("uploadImgMaxSize", UploadImgMaxSize ?? def.UploadImgMaxSize);
            ps.AddNotNull("uploadImgAccept", UploadImgAccept ?? def.UploadImgAccept);
            ps.AddNotNull("uploadImgMaxLength", UploadImgMaxLength ?? def.UploadImgMaxLength);
            ps.AddNotNull("uploadImgParams", UploadImgParams ?? def.UploadImgParams);
            ps.AddNotNull("uploadImgParamsWithUrl", UploadImgParamsWithUrl ?? def.UploadImgParamsWithUrl);
            ps.AddNotNull("uploadFileName", UploadFileName ?? def.UploadFileName);
            ps.AddNotNull("uploadImgHeaders", UploadImgHeaders ?? def.UploadImgHeaders);
            ps.AddNotNull("withCredentials", WithCredentials ?? def.WithCredentials);
            ps.AddNotNull("uploadImgTimeout", UploadImgTimeout ?? def.UploadImgTimeout);
            ps.AddNotNull("showLinkImg", ShowLinkImg ?? def.ShowLinkImg);
            ps.AddNotNull("showLinkImgAlt", ShowLinkImgAlt ?? def.ShowLinkImgAlt);
            ps.AddNotNull("showLinkImgHref", ShowLinkImgHref ?? def.ShowLinkImgHref);
            ps.AddNotNull("uploadVideoServer", UploadVideoServer ?? def.UploadVideoServer);
            ps.AddNotNull("uploadVideoMaxSize", UploadVideoMaxSize ?? def.UploadVideoMaxSize);
            ps.AddNotNull("uploadVideoAccept", UploadVideoAccept ?? def.UploadVideoAccept);
            ps.AddNotNull("uploadVideoParams", UploadVideoParams ?? def.UploadVideoParams);
            ps.AddNotNull("uploadVideoParamsWithUrl", UploadVideoParamsWithUrl ?? def.UploadVideoParamsWithUrl);
            ps.AddNotNull("uploadVideoName", UploadVideoName ?? def.UploadVideoName);
            ps.AddNotNull("uploadVideoHeaders", UploadVideoHeaders ?? def.UploadVideoHeaders);
            ps.AddNotNull("withVideoCredentials", WithVideoCredentials ?? def.WithVideoCredentials);
            ps.AddNotNull("uploadVideoTimeout", UploadVideoTimeout ?? def.UploadVideoTimeout);
            ps.AddNotNull("showLinkVideo", ShowLinkVideo ?? def.ShowLinkVideo);
            return ps;
        }
    }
}