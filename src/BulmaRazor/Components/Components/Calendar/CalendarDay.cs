using System;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 日期天
    /// </summary>
    public class CalendarDay
    {
        /// <summary>
        /// 日期
        /// </summary>
        public DateTime Date { get; set; }
        // public bool Disabled { get; set; }
        /// <summary>
        /// 是否是今天
        /// </summary>
        public bool IsToday { get; set; }
        /// <summary>
        /// 是否是下个月
        /// </summary>
        public bool IsNextMonth { get; set; }
        /// <summary>
        /// 是否是上个月
        /// </summary>
        public bool IsPrevMonth { get; set; }
        
        /// <summary>
        /// 是否选中
        /// </summary>
        public bool IsSelected { get; set; }

        /// <summary>
        /// 阴历信息
        /// </summary>
        public CalendarLunar Lunar { get; set; }

        internal RenderFragment<CalendarDay> Render;

        /// <summary>
        /// 默认呈现
        /// </summary>
        public RenderFragment RenderDefault => Render(this);

        internal string GetTdClasses()
        {
            return CssBuilder.Default()
                .AddClass("other-month", IsPrevMonth || IsNextMonth)
                .AddClass("is-selected", IsSelected)
                .AddClass("is-today", IsToday).Build();
        }
    }
}