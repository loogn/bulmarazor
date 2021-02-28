using System;
using System.Collections.Generic;

namespace BulmaRazor.Components
{
    public class CalenderOptions
    {
        /// <summary>
        /// type Component type: date|time|datetime datetime
        /// </summary>
        public string type { get; set; } = "datetime";

        /// <summary>
        /// color	Picker dominant color	primary
        /// </summary>
        public string color { get; set; } = "primary";

        /// <summary>
        /// isRange	Range capability (start and end date/time selection	false
        /// </summary>
        public bool isRange { get; set; }

        /// <summary>
        /// allowSameDayRange	Possibility to select same date as start and end date in range mode	true
        /// </summary>
        public bool allowSameDayRange { get; set; } = true;

        /// <summary>
        /// lang	Display lang (from language supported by date-fns)	navigator.language.substring(0, 2) || "en"
        /// https://date-fns.org/v1.29.0/docs/I18n#supported-languages
        /// </summary>
        public string lang { get; set; } = "zh_cn";

        /// <summary>
        /// dateFormat	Date format pattern	MM/DD/YYYY
        /// </summary>
        public string dateFormat { get; set; } = "YYYY-MM-DD";

        /// <summary>
        /// timeFormat	Time format pattern	HH:mm
        /// </summary>
        public string timeFormat { get; set; } = "HH:mm";

        /// <summary>
        /// displayMode	Display mode: default|dialog|inline	default
        /// </summary>
        public string displayMode { get; set; } = "default";

        /// <summary>
        /// position		auto
        /// </summary>
        public string position { get; set; } = "auto";

        /// <summary>
        /// showHeader	Show/Hide header block (with current selection)	true
        /// </summary>
        public bool showHeader { get; set; } = true;

        /// <summary>
        /// headerPosition	Header block position: top|bottom	top
        /// </summary>
        public string headerPosition { get; set; } = "top";

        /// <summary>
        /// showFooter	Show/Hide footer block	true
        /// </summary>
        public bool showFooter { get; set; } = true;

        /// <summary>
        /// showButtons	Show/Hide buttons	true
        /// </summary>
        public bool showButtons { get; set; } = true;

        /// <summary>
        /// showTodayButton	Show/Hide Today Button	true
        /// </summary>
        public bool showTodayButton { get; set; } = true;

        /// <summary>
        /// showClearButton	Show/Hide Clear Button	true
        /// </summary>
        public bool showClearButton { get; set; } = true;

        /// <summary>
        /// cancelLabel	Cancel button label	取消
        /// </summary>
        public string cancelLabel { get; set; } = "取消";

        /// <summary>
        /// clearLabel	Clear button label	Clear
        /// </summary>
        public string clearLabel { get; set; } = "清空";

        /// <summary>
        /// todayLabel	Today button label	Today
        /// </summary>
        public string todayLabel { get; set; } = "今天";

        /// <summary>
        /// nowLabel	Now button label	Now
        /// </summary>
        public string nowLabel { get; set; } = "现在";

        /// <summary>
        /// validateLabel	Validate button label	Validate
        /// </summary>
        public string validateLabel { get; set; } = "确认";

        /// <summary>
        /// enableMonthSwitch	Enable/disable month switch	true
        /// </summary>
        public bool enableMonthSwitch { get; set; } = true;

        /// <summary>
        /// enableYearSwitch	Enable/disable year switch	true
        /// </summary>
        public bool enableYearSwitch { get; set; } = true;

        /// <summary>
        /// startDate	Pre-selected start date	undefined
        /// </summary>
        public DateTime? startDate { get; set; }

        /// <summary>
        /// endDate	Pre-selected end date	undefined
        /// </summary>
        public DateTime? endDate { get; set; }

        /// <summary>
        /// minDate	Minimum date allowed	null
        /// </summary>
        public DateTime? minDate { get; set; }

        /// <summary>
        /// maxDate	Maximum date allowed	null
        /// </summary>
        public DateTime? maxDate { get; set; }

        /// <summary>
        /// disabledDates	List of disabled dates	
        /// </summary>
        public List<DateTime> disabledDates { get; set; }

        /// <summary>
        /// disabledWeekDays	List of disabled week days	undefined
        /// </summary>
        public List<int> disabledWeekDays { get; set; }

        /// <summary>
        /// weekStart	Default weekstart day number (sunday by default)	0
        /// </summary>
        public int weekStart { get; set; } = 0;

        /// <summary>
        /// startTime	Pre-selected start time	undefined
        /// </summary>
        public TimeSpan? startTime { get; set; }

        /// <summary>
        /// endTime	Pre-selected end time	undefined
        /// </summary>
        public TimeSpan? endTime { get; set; }

        /// <summary>
        /// minuteSteps	Steps for minutes selector	5
        /// </summary>
        public int minuteSteps { get; set; } = 5;

        /// <summary>
        /// labelFrom	From label
        /// </summary>
        public string labelFrom { get; set; } = "";

        /// <summary>
        /// labelTo	To label
        /// </summary>
        public string labelTo { get; set; } = "";

        /// <summary>
        /// closeOnOverlayClick	Close picker on overlay click (only for dialog display style)	true
        /// </summary>
        public bool closeOnOverlayClick { get; set; } = true;

        /// <summary>
        /// closeOnSelect	Automatically close the datePicker when date selected (or range date selected)
        /// - not available for inline display style.
        /// If set to False then a validate button will be displayed into the footer section.	true
        /// </summary>
        public bool closeOnSelect { get; set; } = true;

        /// <summary>
        /// toggleOnInputClick	Automatically open datepicker when click into input element	true
        /// </summary>
        public bool toggleOnInputClick { get; set; } = true;


        /*
onReady	Callback to trigger once picker initiated	null
icons.previous	Previous button icon	Svg content
icons.next	Next button icon	Svg content
icons.time	Time icon	Svg content
icons.date	Date icon	Svg content
         */
    }
}