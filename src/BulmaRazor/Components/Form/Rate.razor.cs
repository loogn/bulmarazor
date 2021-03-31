using System;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 评分组件
    /// </summary>
    public partial class Rate
    {
        private string classes => CssBuilder.Default("rate")
            .AddClassFromAttributes(Attributes)
            .Build();

        /// <summary>
        /// 鼠标hover的值
        /// </summary>
        private int? hoverValue = null;

        /// <summary>
        /// 绑定值
        /// </summary>
        [Parameter]
        public double Value { get; set; }

        /// <summary>
        /// Value 绑定事件
        /// </summary>
        [Parameter] public EventCallback<double> ValueChanged { get; set; }

        /// <summary>
        /// Value 改变事件
        /// </summary>
        [Parameter] public EventCallback<double> OnChanged { get; set; }

        /// <summary>
        /// 最大分值 默认5
        /// </summary>
        [Parameter]
        public int Max { get; set; } = 5;

        /// <summary>
        /// 是否为只读
        /// </summary>
        [Parameter]
        public bool Disabled { get; set; }

        /// <summary>
        /// 低分和中等分数的界限值，值本身被划分在低分中，默认2
        /// </summary>
        [Parameter]
        public int LowThreshold { get; set; } = 2;

        /// <summary>
        /// 高分和中等分数的界限值，值本身被划分在高分中，默认4
        /// </summary>
        [Parameter]
        public int HighThreshold { get; set; } = 4;

        /// <summary>
        /// 低分 icon 的颜色
        /// </summary>
        [Parameter]
        public string LowColor { get; set; } = "#F7BA2A";

        /// <summary>
        /// 中分 icon 的颜色
        /// </summary>
        [Parameter]
        public string MiddleColor { get; set; } = "#F7BA2A";

        /// <summary>
        /// 高分 icon 的颜色
        /// </summary>
        [Parameter]
        public string HighColor { get; set; } = "#F7BA2A";

        /// <summary>
        /// 未选中 icon 的颜色
        /// </summary>
        [Parameter]
        public string VoidColor { get; set; } = "#C6D1DE";

        /// <summary>
        /// 只读时未选中 icon 的颜色
        /// </summary>
        [Parameter]
        public string DisabledVoidColor { get; set; } = "#EFF2F7";

        /// <summary>
        /// 低分 icon 的类名
        /// </summary>
        [Parameter]
        public string LowIconClass { get; set; } = "fa-star";

        /// <summary>
        /// 中分 icon 的类名
        /// </summary>
        [Parameter]
        public string MiddleIconClass { get; set; } = "fa-star";

        /// <summary>
        ///  高分 icon 的类名
        /// </summary>
        [Parameter]
        public string HighIconClass { get; set; } = "fa-star";

        /// <summary>
        /// 未选中 icon 的类名
        /// </summary>
        [Parameter]
        public string VoidIconClass { get; set; } = "fa-star-o";

        /// <summary>
        ///  只读时未选中 icon 的类名
        /// </summary>
        [Parameter]
        public string DisabledVoidIconClass { get; set; } = "fa-star";

        /// <summary>
        /// 是否显示辅助文字，若为真，则会从 Texts 数组中选取当前分数对应的文字内容
        /// </summary>
        [Parameter]
        public bool ShowText { get; set; }

        /// <summary>
        /// 是否显示当前分数，ShowScore 和 ShowText 不能同时为真
        /// </summary>
        [Parameter]
        public bool ShowScore { get; set; }

        /// <summary>
        /// 辅助文字的颜色
        /// </summary>
        [Parameter]
        public string TextColor { get; set; }

        /// <summary>
        /// 辅助文字数组
        /// </summary>
        [Parameter]
        public string[] Texts { get; set; } = {"极差", "失望", "一般", "满意", "惊喜"};

        /// <summary>
        /// 分数显示卡槽
        /// </summary>
        [Parameter]
        public RenderFragment<double> ScoreSlot { get; set; } = value => builder
            => builder.AddContent(0, value);


        private string GetText()
        {
            if (showValue < 1) return "";
            if (Texts == null || Texts.Length < showValue) return showValue.ToString();
            return Texts[(int) showValue - 1];
        }

        private double showValue => hoverValue ?? Value;

        private string GetVoidColor()
        {
            return Disabled ? DisabledVoidColor : VoidColor;
        }

        private string GetVoidClass()
        {
            return Disabled ? DisabledVoidIconClass : VoidIconClass;
        }

        private string GetIconColor()
        {
            if (showValue <= LowThreshold) return LowColor;
            if (showValue < HighThreshold) return MiddleColor;
            return HighColor;
        }

        private string GetIconClass()
        {
            if (showValue <= LowThreshold) return LowIconClass;
            if (showValue < HighThreshold) return MiddleIconClass;
            return HighIconClass;
        }

        private bool NeedSubIcon(int index)
        {
            var n = showValue - index;
            return 1 > n && n > 0;
        }

        private string GetSubStyle()
        {
            var width = Math.Abs(showValue - (int) showValue);
            return "z-index:1;position:absolute;left:0;top:0;overflow:hidden;width:" + width * 100 +
                   "%;color:" +
                   GetIconColor();
        }

        private string GetSubClass()
        {
            var cls = CssBuilder.Default("fa")
                .AddClass(B.Clickable, !Disabled)
                .AddClass("mr-2")
                .AddClass(GetIconClass());
            return cls.Build();
        }

        private string GetIconClass(int index)
        {
            var cls = CssBuilder.Default("fa")
                .AddClass(B.Clickable, !Disabled)
                .AddClass("mr-2");
            cls.AddClass(index + 1 <= showValue ? GetIconClass() : GetVoidClass());

            return cls.Build();
        }

        private string GetIconStyles(int index)
        {
            return "position:relative;Color:" + (index + 1 <= showValue ? GetIconColor() : GetVoidColor());
        }

        private void MouseOverHandle(int index)
        {
            if (Disabled) return;
            hoverValue = index + 1;
        }

        private void ClickHandle(int index)
        {
            if (Disabled) return;
            Value = index + 1;
            ValueChanged.InvokeAsync(index + 1);
            OnChanged.InvokeAsync(index + 1);
        }

        private void MouseOutHandle()
        {
            if (Disabled) return;
            hoverValue = null;
        }
    }
}