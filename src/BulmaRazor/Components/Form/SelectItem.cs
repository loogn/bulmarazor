using System;
namespace BulmaRazor.Components
{


    public class SelectItem
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        public SelectItem() { }

        /// <summary>
        /// 构造函数
        /// </summary>
        public SelectItem(string value, string text) => (Value, Text) = (value, text);

        /// <summary>
        /// 获得/设置 显示名称
        /// </summary>
        public string Text { get; set; } = "";

        /// <summary>
        /// 获得/设置 选项值
        /// </summary>
        public string Value { get; set; } = "";

        /// <summary>
        /// 获得/设置 是否选中
        /// </summary>
        public bool Selected { get; set; }

        /// <summary>
        /// 获得/设置 分组名称
        /// </summary>
        public string GroupName { get; set; } = "";
    }
}
