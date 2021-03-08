using System;
using System.Collections.Generic;
using BulmaRazor.Utils;

namespace BulmaRazor.Components
{
    public class CalenderOptions
    {
        /// <summary>
        /// type Component type: date|time|datetime datetime
        /// </summary>
        internal string Type { get; set; }

        /// <summary>
        /// color	Picker dominant color	primary
        /// </summary>
        public Color Color { get; set; }

        /// <summary>
        /// isRange	Range capability (start and end date/time selection	false
        /// </summary>
        public bool? IsRange { get; set; }

        /// <summary>
        /// allowSameDayRange	Possibility to select same date as start and end date in range mode	true
        /// </summary>
        public bool? AllowSameDayRange { get; set; }

        /// <summary>
        /// lang	Display lang (from language supported by date-fns)	navigator.language.substring(0, 2) || "en"
        /// https://date-fns.org/v1.29.0/docs/I18n#supported-languages
        /// </summary>
        public string Lang { get; set; } = "zh_cn";

        /// <summary>
        /// dateFormat	Date format pattern	yyyy-MM-dd
        /// </summary>
        public string DateFormat { get; set; } = "yyyy-MM-dd";

        /// <summary>
        /// timeFormat	Time format pattern	HH:mm
        /// </summary>
        public string TimeFormat { get; set; } = "HH:mm";

        /// <summary>
        /// displayMode	Display mode: default|dialog|inline	default
        /// </summary>
        public string DisplayMode { get; set; }

        /// <summary>
        /// position		auto
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// showHeader	Show/Hide header block (with current selection)	true
        /// </summary>
        public bool? ShowHeader { get; set; }

        /// <summary>
        /// headerPosition	Header block position: top|bottom	top
        /// </summary>
        public string HeaderPosition { get; set; }

        /// <summary>
        /// showFooter	Show/Hide footer block	true
        /// </summary>
        public bool? ShowFooter { get; set; }

        /// <summary>
        /// showButtons	Show/Hide buttons	true
        /// </summary>
        public bool? ShowButtons { get; set; }

        /// <summary>
        /// showTodayButton	Show/Hide Today Button	true
        /// </summary>
        public bool? ShowTodayButton { get; set; }

        /// <summary>
        /// showClearButton	Show/Hide Clear Button	true
        /// </summary>
        public bool? ShowClearButton { get; set; }

        /// <summary>
        /// cancelLabel	Cancel button label	取消
        /// </summary>
        public string CancelLabel { get; set; } = "取消";

        /// <summary>
        /// clearLabel	Clear button label	Clear
        /// </summary>
        public string ClearLabel { get; set; } = "清空";

        /// <summary>
        /// todayLabel	Today button label	Today
        /// </summary>
        public string TodayLabel { get; set; } = "今天";

        /// <summary>
        /// nowLabel	Now button label	Now
        /// </summary>
        public string NowLabel { get; set; } = "现在";

        /// <summary>
        /// validateLabel	Validate button label	Validate
        /// </summary>
        public string ValidateLabel { get; set; } = "确认";

        /// <summary>
        /// enableMonthSwitch	Enable/disable month switch	true
        /// </summary>
        public bool? EnableMonthSwitch { get; set; }

        /// <summary>
        /// enableYearSwitch	Enable/disable year switch	true
        /// </summary>
        public bool? EnableYearSwitch { get; set; }

        /// <summary>
        /// startDate	Pre-selected start date	undefined
        /// </summary>
        public DateTime? StartDate { get; set; }

        /// <summary>
        /// endDate	Pre-selected end date	undefined
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// minDate	Minimum date allowed	null
        /// </summary>
        public DateTime? MinDate { get; set; }

        /// <summary>
        /// maxDate	Maximum date allowed	null
        /// </summary>
        public DateTime? MaxDate { get; set; }

        /// <summary>
        /// disabledDates	List of disabled dates	
        /// </summary>
        public IEnumerable<DateTime> DisabledDates { get; set; }

        /// <summary>
        /// disabledWeekDays	List of disabled week days	undefined
        /// </summary>
        public IEnumerable<int> DisabledWeekDays { get; set; }

        /// <summary>
        /// weekStart	Default weekstart day number (sunday by default)	0
        /// </summary>
        public int? WeekStart { get; set; }

        /// <summary>
        /// startTime	Pre-selected start time	undefined
        /// </summary>
        public TimeSpan? StartTime { get; set; }

        /// <summary>
        /// endTime	Pre-selected end time	undefined
        /// </summary>
        public TimeSpan? EndTime { get; set; }

        /// <summary>
        /// minuteSteps	Steps for minutes selector	5
        /// </summary>
        public int? MinuteSteps { get; set; }

        /// <summary>
        /// labelFrom	From label placeholder 开始时间
        /// </summary>
        public string LabelFrom { get; set; }

        /// <summary>
        /// labelTo	To label placeholder 结束时间
        /// </summary>
        public string LabelTo { get; set; }

        /// <summary>
        /// closeOnOverlayClick	Close picker on overlay click (only for dialog display style)	true
        /// </summary>
        public bool? CloseOnOverlayClick { get; set; }

        /// <summary>
        /// closeOnSelect	Automatically close the datePicker when date selected (or range date selected)
        /// - not available for inline display style.
        /// If set to False then a validate button will be displayed into the footer section.	true
        /// </summary>
        public bool? CloseOnSelect { get; set; }

        /// <summary>
        /// toggleOnInputClick	Automatically open datepicker when click into input element	true
        /// </summary>
        public bool? ToggleOnInputClick { get; set; }


        public JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.CalenderOptions;
            ps.AddNotNull("type", Type ?? def.Type);
            ps.AddNotNull("color", (Color ?? def.Color)?.Value?.Replace("is-", ""));
            ps.AddNotNull("isRange", IsRange ?? def.IsRange);
            ps.AddNotNull("allowSameDayRange", AllowSameDayRange ?? def.AllowSameDayRange);
            ps.AddNotNull("lang", Lang ?? def.Lang);

            var dateFormat = DateFormat ?? def.DateFormat;
            if (!string.IsNullOrEmpty(dateFormat))
            {
                dateFormat = dateFormat.ToUpper();
                ps.AddNotNull("dateFormat", dateFormat);
            }

            ps.AddNotNull("timeFormat", TimeFormat ?? def.TimeFormat);
            ps.AddNotNull("displayMode", DisplayMode ?? def.DisplayMode);
            ps.AddNotNull("position", Position ?? def.Position);
            ps.AddNotNull("showHeader", ShowHeader ?? def.ShowHeader);
            ps.AddNotNull("headerPosition", HeaderPosition ?? def.HeaderPosition);
            ps.AddNotNull("showFooter", ShowFooter ?? def.ShowFooter);
            ps.AddNotNull("showButtons", ShowButtons ?? def.ShowButtons);
            ps.AddNotNull("showTodayButton", ShowTodayButton ?? def.ShowTodayButton);
            ps.AddNotNull("showClearButton", ShowClearButton ?? def.ShowClearButton);
            ps.AddNotNull("cancelLabel", CancelLabel ?? def.CancelLabel);
            ps.AddNotNull("clearLabel", ClearLabel ?? def.ClearLabel);
            ps.AddNotNull("todayLabel", TodayLabel ?? def.TodayLabel);
            ps.AddNotNull("nowLabel", NowLabel ?? def.NowLabel);
            ps.AddNotNull("validateLabel", ValidateLabel ?? def.ValidateLabel);
            ps.AddNotNull("enableMonthSwitch", EnableMonthSwitch ?? def.EnableMonthSwitch);
            ps.AddNotNull("enableYearSwitch", EnableYearSwitch ?? def.EnableYearSwitch);
            ps.AddNotNull("startDate", StartDate ?? def.StartDate);
            ps.AddNotNull("endDate", EndDate ?? def.EndDate);
            ps.AddNotNull("minDate", MinDate ?? def.MinDate);
            ps.AddNotNull("maxDate", MaxDate ?? def.MaxDate);
            ps.AddNotNull("disabledDates", DisabledDates ?? def.DisabledDates);
            ps.AddNotNull("disabledWeekDays", DisabledWeekDays ?? def.DisabledWeekDays);
            ps.AddNotNull("weekStart", WeekStart ?? def.WeekStart);
            ps.AddNotNull("startTime", StartTime ?? def.StartTime);
            ps.AddNotNull("endTime", EndTime ?? def.EndTime);
            ps.AddNotNull("minuteSteps", MinuteSteps ?? def.MinuteSteps);
            ps.AddNotNull("labelFrom", LabelFrom ?? def.LabelFrom);
            ps.AddNotNull("labelTo", LabelTo ?? def.LabelTo);
            ps.AddNotNull("closeOnOverlayClick", CloseOnOverlayClick ?? def.CloseOnOverlayClick);
            ps.AddNotNull("closeOnSelect", CloseOnSelect ?? def.CloseOnSelect);
            ps.AddNotNull("toggleOnInputClick", ToggleOnInputClick ?? def.ToggleOnInputClick);
            return ps;
        }


        /*
onReady	Callback to trigger once picker initiated	null
icons.previous	Previous button icon	Svg content
icons.next	Next button icon	Svg content
icons.time	Time icon	Svg content
icons.date	Date icon	Svg content
         */
    }
}