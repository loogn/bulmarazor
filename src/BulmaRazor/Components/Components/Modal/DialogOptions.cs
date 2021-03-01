using System;

namespace BulmaRazor.Components
{
    public class DialogOptions
    {
        /// <summary>
        /// //1-alert,2-confirm,3-prompt
        /// </summary>
        internal int Type { get; set; }
        public string Message { get; set; }
        public string Title { get; set; }
        public Action? Sure { get; set; }
        public Action? Cancel { get; set; }
        public Action<string>? Result { get; set; }
    }
}