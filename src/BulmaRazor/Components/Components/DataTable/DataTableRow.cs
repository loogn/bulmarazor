using System.Collections.Generic;
using System.IO;

namespace BulmaRazor.Components
{
    public class DataTableRow<TItem> where  TItem:new()
    {
        public  int Index { get; set; }
        
        public  TItem Item { get; set; }
        
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
        
        public Dictionary<string,DataTableRowField> Fields { get; set; }
      
    }
}