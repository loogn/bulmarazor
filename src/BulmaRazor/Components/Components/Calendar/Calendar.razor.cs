using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 日历
    /// </summary>
    public partial class Calendar
    {
        private readonly List<CalendarDay> days = new();
        private readonly List<string> weekDays = new();

        private readonly ChineseLunisolarCalendar chineseLunisolarCalendar = new();

        private DateTime currentMonth;

        /// <summary>
        /// 周起始日
        /// </summary>
        [Parameter]
        public DayOfWeek FirstDayOfWeek { get; set; } = DayOfWeek.Monday;

        /// <summary>
        /// 行高，默认是85px
        /// </summary>
        [Parameter] public string DayHeight { get; set; }
        /// <summary>
        /// 是否显示阴历
        /// </summary>
        [Parameter] public bool ShowLunar { get; set; }

        /// <summary>
        /// 选中日期，默认DateTime.Now
        /// </summary>
        [Parameter]
        public DateTime Value { get; set; } = DateTime.Now;
        
        /// <summary>
        /// 自定义显示
        /// </summary>
        [Parameter]
        public  RenderFragment<CalendarDay> DaySlot { get; set; }

        /// <summary>
        /// Value绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<DateTime> ValueChanged { get; set; }

        /// <summary>
        /// Value改变事件
        /// </summary>
        [Parameter]
        public EventCallback<CalendarDay> OnValueChanged { get; set; }


        private string GetWeekDayName(DayOfWeek dayOfWeek)
        {
            return dayOfWeek switch
            {
                DayOfWeek.Monday => "一",
                DayOfWeek.Tuesday => "二",
                DayOfWeek.Wednesday => "三",
                DayOfWeek.Thursday => "四",
                DayOfWeek.Friday => "五",
                DayOfWeek.Saturday => "六",
                _ => "日"
            };
        }

        protected override void OnInitialized()
        {
            base.OnInitialized();

            currentMonth = Value.AddDays(1 - Value.Day);
            for (int i = 0; i < 7; i++)
            {
                var weekday = ((int) FirstDayOfWeek + i) % 7;
                weekDays.Add(GetWeekDayName((DayOfWeek) weekday));
            }

            FullDays();
        }

        private void FullDays()
        {
            days.Clear();
            var today = DateTime.Now;
            var thisMonthFirstDay = currentMonth.Date.AddDays(1 - currentMonth.Day);
            var thisMonthLastDay = thisMonthFirstDay.AddMonths(1).AddDays(-1);
            for (var date = thisMonthFirstDay; date <= thisMonthLastDay; date = date.AddDays(1))
            {
                var isToday = date == today.Date;
                var day = new CalendarDay()
                {
                    Render=DefaultRender,
                    Date = date,
                    IsToday = isToday,
                    IsSelected = Value.Date == date,
                    Lunar = CalendarLunar.GetLunar(chineseLunisolarCalendar, date)
                };
                days.Add(day);
            }

            while (thisMonthFirstDay.DayOfWeek != FirstDayOfWeek)
            {
                thisMonthFirstDay = thisMonthFirstDay.AddDays(-1);
                var prevMonthDay = new CalendarDay()
                {
                    Render=DefaultRender,
                    Date = thisMonthFirstDay,
                    IsPrevMonth = true,
                    Lunar = CalendarLunar.GetLunar(chineseLunisolarCalendar, thisMonthFirstDay)
                };
                days.Insert(0, prevMonthDay);
            }

            while (days.Count < 42)
            {
                thisMonthLastDay = thisMonthLastDay.AddDays(1);
                var nextMonthDay = new CalendarDay()
                {
                    Render=DefaultRender,
                    Date = thisMonthLastDay,
                    IsPrevMonth = true,
                    Lunar = CalendarLunar.GetLunar(chineseLunisolarCalendar, thisMonthLastDay)
                };
                days.Add(nextMonthDay);
            }
        }

        private void GoToPrevMonth()
        {
            currentMonth = currentMonth.AddMonths(-1);
            FullDays();
        }

        private void GoToNextMonth()
        {
            currentMonth = currentMonth.AddMonths(1);
            FullDays();
        }

        private void GoToToday()
        {
            currentMonth = DateTime.Now.AddDays(1 - DateTime.Now.Day);
            Value = DateTime.Now.Date;
            FullDays();
        }

        private async Task DayClick(CalendarDay day)
        {
            var date = day.Date;
            currentMonth = date.AddDays(1 - date.Day);
            Value = date.Date;
            FullDays();
            await ValueChanged.InvokeAsync(Value);
            await OnValueChanged.InvokeAsync(day);
        }
    }
}