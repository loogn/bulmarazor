using System;

namespace BulmaRazor.Components
{
    public class TransferItem<TItem>
    {
        
        public TItem Item { get; set; }

        /// <summary>
        /// 是否选中
        /// </summary>
        public bool IsChecked { get; set; }

        /// <summary>
        /// Filter之后是否隐藏
        /// </summary>
        internal bool IsHidden { get; set; }
        
        public  Type Type { get; set; }
        public  object Value { get; set; }
        
        public string ShowValue { get; set; }
    }
}