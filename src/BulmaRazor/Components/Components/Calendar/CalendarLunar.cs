using System;
using System.Globalization;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 日历农历信息
    /// </summary>
    public class CalendarLunar
    {
        /// <summary>
        /// 农历日期
        /// </summary>
        public int Day { get; private set; }

        /// <summary>
        /// 内里月
        /// </summary>
        public int Month { get; private set; }

        /// <summary>
        /// 农历年
        /// </summary>
        public int Year { get; private set; }

        /// <summary>
        /// 农历年
        /// </summary>
        public string YearName { get; private set; }

        /// <summary>
        /// 生肖
        /// </summary>
        public string Zodiac { get; private set; }

        /// <summary>
        /// 农历月
        /// </summary>
        public string MonthName { get; private set; }

        /// <summary>
        /// 农历日
        /// </summary>
        public string DayName { get; private set; }

        /// <summary>
        /// 是否闰月
        /// </summary>
        public bool IsLeapMonth { get; private set; }

        internal static CalendarLunar GetLunar(ChineseLunisolarCalendar calendar, DateTime date)
        {
            if (calendar == null) return null;
            CalendarLunar lunar = new CalendarLunar();
            lunar.Year = calendar.GetYear(date);
            lunar.Day = calendar.GetDayOfMonth(date);
            lunar.Month = calendar.GetMonth(date);

            int leapMonth = calendar.GetLeapMonth(lunar.Year);
            lunar.IsLeapMonth = leapMonth == lunar.Month;

            lunar.YearName =
                $"{"甲乙丙丁戊己庚辛壬癸"[(lunar.Year - 4) % 10]}{"子丑寅卯辰巳午未申酉戌亥"[(lunar.Year - 4) % 12]}({"鼠牛虎兔龙蛇马羊猴鸡狗猪"[(lunar.Year - 4) % 12]})年";

            var leap = lunar.IsLeapMonth ? "闰" : string.Empty;
            lunar.MonthName =
                $"{leap}{"无正二三四五六七八九十冬腊"[leapMonth > 0 && leapMonth <= lunar.Month ? lunar.Month - 1 : lunar.Month]}月";
            lunar.DayName = $"{"初十廿三"[lunar.Day / 10]}{"十一二三四五六七八九"[lunar.Day % 10]}";
            if (lunar.DayName == "十十")
            {
                lunar.DayName = "初十";
            }

            return lunar;
        }
    }
}