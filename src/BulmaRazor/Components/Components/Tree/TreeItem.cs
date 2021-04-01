using System.Collections.Generic;
using System.Linq;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Tree节点
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public class TreeItem<TValue>
    {
        /// <summary>
        /// 值
        /// </summary>
        public TValue Value { get; set; }
        /// <summary>
        /// 显示值
        /// </summary>
        public string Text { get; set; }
        
        internal bool IsSelected { get; set; }

        /// <summary>
        /// 是否展开
        /// </summary>
        public bool IsExpanded { get; set; }
        internal bool IsChecked { get; set; }
        internal int Level { get; set; }
        /// <summary>
        /// 是否禁用
        /// </summary>
        public bool Disabled { get; set; }

        /// <summary>
        /// 父节点
        /// </summary>
        public TreeItem<TValue> Parent { get; set; }
        /// <summary>
        /// 子节点
        /// </summary>
        public List<TreeItem<TValue>> Children { get; set; } = new();

        /// <summary>
        /// 添加子节点
        /// </summary>
        /// <param name="item"></param>
        public void AddChild(TreeItem<TValue> item)
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
            var item = new TreeItem<TValue>() {Value = value, Text = text};
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