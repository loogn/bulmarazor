using System.Collections.Generic;
using System.Linq;

namespace BulmaRazor.Components
{
    public class TreeItem<TValue>
    {
        public TValue Value { get; set; }
        public string Text { get; set; }
        
        internal bool IsSelected { get; set; }
        
        public  bool IsExpanded { get; set; }
        internal bool IsChecked { get; set; }
        internal int Level { get; set; }
        public bool Disabled { get; set; }
        
        public TreeItem<TValue> Parent { get; set; }
        public List<TreeItem<TValue>> Children { get; set; } = new();

        public void Add(TreeItem<TValue> item)
        {
            item.Parent = this;
            Children.Add(item);
        }

        public void Add(TValue value, string text)
        {
            var item = new TreeItem<TValue>() {Value = value, Text = text};
            Add(item);
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