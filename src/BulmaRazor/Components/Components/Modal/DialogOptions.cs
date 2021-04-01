using System;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 对话框选项
    /// </summary>
    public class DialogOptions
    {
        /// <summary>
        /// 颜色
        /// </summary>
        public Color Color { get; set; } = Color.Primary;
        /// <summary>
        /// //1-alert,2-confirm,3-prompt
        /// </summary>
        internal int Type { get; set; }
        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 标题，默认：提示信息
        /// </summary>
        public string Title { get; set; } = "提示信息";
        /// <summary>
        /// 显示关闭图标
        /// </summary>
        public bool ShowClose { get; set; }
        /// <summary>
        /// 确定回调
        /// </summary>
        public Action OK { get; set; }
        /// <summary>
        /// 取消回调
        /// </summary>
        public Action Cancel { get; set; }
        /// <summary>
        /// 关闭回调
        /// </summary>
        public Action Close { get; set; }
        /// <summary>
        /// prompt value
        /// </summary>
        public Action<string> Result { get; set; }
        
        /// <summary>
        /// 占位符
        /// </summary>
        public string Placeholder { get; set; } = "请输入内容";

        /// <summary>
        /// 确认按钮文本
        /// </summary>
        public string OKText { get; set; } = "确定";
        /// <summary>
        /// 取消按钮文本
        /// </summary>
        public string CancelText { get; set; } = "取消";
        /// <summary>
        /// 确认按钮颜色
        /// </summary>
        public Color OKColor { get; set; } = Color.Primary;
        /// <summary>
        /// 取消按钮颜色
        /// </summary>
        public Color CancelColor { get; set; } = Color.Default;
        
    }
}