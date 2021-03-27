using System.Collections.Generic;
using System.Linq;

namespace BulmaRazor.Components
{
    public class CascaderItem<TValue>
    {
        public TValue Value { get; set; }
        public string Text { get; set; }
        /// <summary>
        /// 如果选中，子项都不选
        /// </summary>
        internal bool IsSelected { get; set; }
        
        internal  bool IsOpen { get; set; }
        internal bool IsChecked { get; set; }
        public bool Disabled { get; set; }
        
        public CascaderItem<TValue> Parent { get; set; }
        public List<CascaderItem<TValue>> Children { get; set; } = new();

        public void AddItem(CascaderItem<TValue> item)
        {
            item.Parent = this;
            Children.Add(item);
        }

        public void AddItem(TValue value, string text)
        {
            var item = new CascaderItem<TValue>() {Value = value, Text = text};
            AddItem(item);
        }

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
            if (Children.All(x => x.GetCheckedStatus() == true)) return true;
            if (Children.All(x => x.GetCheckedStatus() == false)) return false;
            return null;
        }
        
        internal bool GetHasChildrenChecked()
        {
            return IsChecked || Children.Any(x => x.GetHasChildrenChecked());
        }
    }
}