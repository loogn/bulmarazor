using System;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public class DialogOptions
    {
        public Color Color { get; set; } = Color.Primary;
        /// <summary>
        /// //1-alert,2-confirm,3-prompt
        /// </summary>
        internal int Type { get; set; }
        public string Message { get; set; }
        public string Title { get; set; } = "提示信息";
        public bool ShowClose { get; set; }
        public Action OK { get; set; }
        public Action Cancel { get; set; }
        public Action Close { get; set; }
        /// <summary>
        /// prompt value
        /// </summary>
        public Action<string> Result { get; set; }

        public string Placeholder { get; set; } = "请输入内容";

        public string OKText { get; set; } = "确定";
        public string CancelText { get; set; } = "取消";
        public Color OKColor { get; set; } = Color.Primary;
        public Color CancelColor { get; set; } = Color.Default;
        
    }
}