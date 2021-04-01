using System;
using System.Collections.Generic;
using System.IO;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    public class DataTableRow<TItem> where TItem : new()
    {
        /// <summary>
        /// 
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public TItem Item { get; set; }

        /// <summary>
        /// 是否选中
        /// </summary>
        public bool IsChecked { get; set; }

        /// <summary>
        /// 是否展开
        /// </summary>
        public bool IsExpanded { get; set; }

        /// <summary>
        /// 是否单击选中
        /// </summary>
        public bool IsSelected { get; set; }

        /// <summary>
        /// Filter之后是否隐藏
        /// </summary>
        internal bool IsHidden { get; set; }

        internal Dictionary<string, DataTableRowField> Fields { get; } = new(StringComparer.OrdinalIgnoreCase);

       
        internal string GetShowValue(string prop)
        {
            if (string.IsNullOrEmpty(prop)) return string.Empty;
            if (Fields.TryGetValue(prop, out DataTableRowField field))
            {
                return field.ShowValue;
            }

            return string.Empty;
        }
    }
}