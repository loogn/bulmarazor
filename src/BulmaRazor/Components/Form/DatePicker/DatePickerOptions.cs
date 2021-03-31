using System;
using System.Collections.Generic;
using System.Linq;


namespace BulmaRazor.Components
{
    public class DatePickerOptions
    {
        /// <summary>
        /// the date format, combination of yyyy-MM-dd HH:mm
        /// </summary>
        public string Format { get; set; } = "yyyy-MM-dd";

        /// <summary>
        /// en | zh-CN
        /// </summary>
        public string Language { get; set; } = "zh-CN";

        /// <summary>
        /// day of the week start. 0 for Sunday - 6 for Saturday
        /// </summary>
        public int? WeekStart { get; set; } = 1;

        /// <summary>
        /// set the start view mode. Accepts: 'decade' = 4, 'year' = 3, 'month' = 2, 'day' = 1, 'hour' = 0
        /// </summary>
        public int? StartView { get; set; }

        /// <summary>
        /// set a limit for view mode. Accepts: 'decade' = 4, 'year' = 3, 'month' = 2, 'day' = 1, 'hour' = 0
        /// </summary>
        public int? MinView { get; set; }

        /// <summary>
        /// set a limit for view mode. Accepts: 'decade' = 4, 'year' = 3, 'month' = 2, 'day' = 1, 'hour' = 0
        /// </summary>
        public int? MaxView { get; set; }

        /// <summary>
        /// enables hour and minute selection views, equivalent of minView = 0, else minView = 2
        /// </summary>
        public bool? PickTime { get; set; }

        /// <summary>
        /// sets initial date. The same effect can be achieved with value attribute on input element.
        /// </summary>
        public string InitialDate { get; set; }

        /// <summary>
        /// disables all dates before given date
        /// </summary>
        public DateTime? StartDate { get; set; }

        /// <summary>
        /// disables all dates after given date
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// with input fields, allows to navigate the datepicker with arrows. However, it disables navigation inside the input itself, too
        /// </summary>
        public bool? KeyboardNavigation { get; set; }

        /// <summary>
        /// disables all dates matching the given days of week (0 = Sunday, 6 = Saturday)
        /// </summary>
        public IEnumerable<int> DaysOfWeekDisabled { get; set; }

        /// <summary>
        /// disables the specified dates
        /// </summary>
        public IEnumerable<DateTime> DatesDisabled { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? CloseButton { get; set; }

        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.DatePickerOptions;
            var format = Format ?? def.Format;
            if (format.HasValue())
            {
                //d, dd, m, mm, yy, yyyy, hh, ii.
                format = format.Replace("H", "h")
                    .Replace("m", "i")
                    .Replace("M", "m");
                ps.AddNotNull("format", format);
            }

            ps.AddNotNull("language", Language ?? def.Language);
            ps.AddNotNull("weekStart", WeekStart ?? def.WeekStart);
            ps.AddNotNull("startView", StartView ?? def.StartView);
            ps.AddNotNull("minView", MinView ?? def.MinView);
            ps.AddNotNull("maxView", MaxView ?? def.MaxView);
            ps.AddNotNull("pickTime", PickTime ?? def.PickTime);
            ps.AddNotNull("initialDate", InitialDate ?? def.InitialDate);
            var startDate = StartDate ?? def.StartDate;
            if (startDate.HasValue)
            {
                ps.AddNotNull("startDate", startDate.Value.ToString("yyyy-MM-dd"));
            }

            var endDate = EndDate ?? def.EndDate;
            if (endDate.HasValue)
            {
                ps.AddNotNull("endDate", endDate.Value.ToString("yyyy-MM-dd"));
            }

            ps.AddNotNull("keyboardNavigation", KeyboardNavigation ?? def.KeyboardNavigation);
            ps.AddNotNull("daysOfWeekDisabled", DaysOfWeekDisabled ?? def.DaysOfWeekDisabled);
            var datesDisabled = DatesDisabled ?? def.DatesDisabled;
            if (datesDisabled != null && datesDisabled.Any())
            {
                ps.AddNotNull("datesDisabled", datesDisabled.Select(x => x.ToString("yyyy-MM-dd")));
            }
            ps.AddNotNull("closeButton",CloseButton);

            return ps;
        }
    }
}