using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 开关组件
    /// </summary>
    public partial class Switch
    {
        string classes => CssBuilder.Default("switch")
            .AddClassFromAttributes(Attributes)
            .AddClass(B.Invisible)
            .AddClass("is-rtl", IsRTL)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-thin", IsThin)
            .AddClass("is-rounded", IsRounded)
            .AddClass("is-outlined", IsOutlined)
            .Build();

        string id = "switch_" + Guid.NewGuid().ToString("N");

        /// <summary>
        /// 从右到左
        /// </summary>
        [Parameter]
        public bool IsRTL { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;

        /// <summary>
        /// 小尺寸
        /// </summary>
        [Parameter]
        public bool IsSmall { get; set; }

        /// <summary>
        /// 正常尺寸
        /// </summary>
        [Parameter]
        public bool IsNormal { get; set; }

        /// <summary>
        /// 中尺寸
        /// </summary>
        [Parameter]
        public bool IsMedium { get; set; }

        /// <summary>
        /// 大尺寸
        /// </summary>
        [Parameter]
        public bool IsLarge { get; set; }

        /// <summary>
        /// 痩型外观
        /// </summary>
        [Parameter]
        public bool IsThin { get; set; }

        /// <summary>
        /// 圆角外观
        /// </summary>
        [Parameter]
        public bool IsRounded { get; set; }

        /// <summary>
        /// 轮廓外观
        /// </summary>
        [Parameter]
        public bool IsOutlined { get; set; }

        /// <summary>
        /// 是否选中
        /// </summary>
        [Parameter]
        public bool Checked { get; set; }

        /// <summary>
        /// Checked绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<bool> CheckedChanged { get; set; }

        /// <summary>
        /// checked 改变事件
        /// </summary>
        [Parameter]
        public EventCallback<bool> OnChanged { get; set; }

        private async Task ChangeHandle(ChangeEventArgs e)
        {
            Checked = !Checked;
            await CheckedChanged.InvokeAsync(Checked);
            await OnChanged.InvokeAsync(Checked);
        }

        /// <summary>
        /// On标签 优先级-2
        /// </summary>
        [Parameter]
        public string OnLabel { get; set; }

        /// <summary>
        /// Off标签 优先级-2
        /// </summary>
        [Parameter]
        public string OffLabel { get; set; }

        /// <summary>
        /// 默认标签  优先级-0
        /// </summary>
        [Parameter]
        public string Label { get; set; }

        /// <summary>
        /// 默认子内容，优先级-1
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// On卡槽 优先级-3
        /// </summary>
        [Parameter]
        public RenderFragment OnSlot { get; set; }

        /// <summary>
        /// Off卡槽 优先级-3
        /// </summary>
        [Parameter]
        public RenderFragment OffSlot { get; set; }
    }
}