using System.Collections.Generic;
using System.Linq;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 级联选择项
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public class CascaderItem<TValue>
    {
        /// <summary>
        /// 值
        /// </summary>
        public TValue Value { get; set; }
        /// <summary>
        /// 显示文本
        /// </summary>
        public string Text { get; set; }

        /// <summary>
        /// 如果选中，子项都不选
        /// </summary>
        internal bool IsSelected { get; set; }

        internal bool IsExpanded { get; set; }
        internal bool IsChecked { get; set; }
        /// <summary>
        /// 禁用
        /// </summary>
        public bool Disabled { get; set; }

        /// <summary>
        /// 父节点
        /// </summary>
        public CascaderItem<TValue> Parent { get; set; }
        /// <summary>
        /// 子节点
        /// </summary>
        public List<CascaderItem<TValue>> Children { get; set; } = new();

        /// <summary>
        /// 添加子节点
        /// </summary>
        /// <param name="item"></param>
        public void AddChild(CascaderItem<TValue> item)
        {
            item.Parent = this;
            Children.Add(item);
        }

        /// <summary>
        /// 添加子节点
        /// </summary>
        /// <param name="value"></param>
        /// <param name="text"></param>
        public void AddChild(TValue value, string text)
        {
            var item = new CascaderItem<TValue>() {Value = value, Text = text};
            AddChild(item);
        }

        /// <summary>
        /// 设置子节点的父节点为自己
        /// </summary>
        public void SetParent()
        {
            foreach (var sub in Children)
            {
                sub.Parent = this;
                sub.SetParent();
            }
        }

        internal bool GetIsActive()
        {
            return IsSelected || IsChecked;
        }

        internal bool? GetCheckedStatus()
        {
            if (Children.Count == 0) return IsChecked;
            if (Children.All(x => x.Disabled || x.GetCheckedStatus() == true)) return true;
            if (Children.All(x => x.Disabled || x.GetCheckedStatus() == false)) return false;
            return null;
        }

        internal bool GetHasChildrenChecked()
        {
            return IsChecked || Children.Any(x => x.GetHasChildrenChecked());
        }
    }
}