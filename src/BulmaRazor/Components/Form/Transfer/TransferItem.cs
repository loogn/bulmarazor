using System;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    public class TransferItem<TItem>
    {
        
        /// <summary>
        /// 
        /// </summary>
        public TItem Item { get; set; }

        /// <summary>
        /// 是否选中
        /// </summary>
        public bool IsChecked { get; set; }
        

        /// <summary>
        /// Filter之后是否隐藏
        /// </summary>
        internal bool IsHidden { get; set; }
        
        
        internal string ShowValue { get; set; }
    }
}