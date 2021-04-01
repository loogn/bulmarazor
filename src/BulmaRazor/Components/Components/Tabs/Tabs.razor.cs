using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 选项卡组件
    /// </summary>
    public partial class Tabs
    {
        string classes => CssBuilder.Default("tabs")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-boxed", IsBoxed)
            .AddClass("is-toggle", IsToggle || IsToggleRounded)
            .AddClass("is-toggle-rounded", IsToggleRounded)
            .AddClass("is-fullwidth", IsFullwidth)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-right", IsRight)
            .AddClass("mb-0", Gapless)
            .Build();

        private List<TabItem> items = new();

        /// <summary>
        /// 小尺寸
        /// </summary>
        [Parameter]
        public bool IsSmall { get; set; }

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
        /// 块状样式
        /// </summary>
        [Parameter]
        public bool IsBoxed { get; set; }

        /// <summary>
        /// 开关样式
        /// </summary>
        [Parameter]
        public bool IsToggle { get; set; }

        /// <summary>
        /// 圆角开关样式
        /// </summary>
        [Parameter]
        public bool IsToggleRounded { get; set; }

        /// <summary>
        /// 全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 居中
        /// </summary>
        [Parameter]
        public bool IsCentered { get; set; }

        /// <summary>
        /// 居右
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }

        /// <summary>
        /// 只有Tab没有内容
        /// </summary>
        [Parameter]
        public bool IsTabOnly { get; set; }

        /// <summary>
        /// 默认激活Index
        /// </summary>
        [Parameter]
        public int DefaultTabIndex { get; set; }

        /// <summary>
        /// Tab和内容没有间隙
        /// </summary>
        [Parameter]
        public bool Gapless { get; set; }

        /// <summary>
        /// 子内容,TabItem
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// Tab点击事件
        /// </summary>
        [Parameter]
        public EventCallback<TabItem> OnTabClick { get; set; }


        private int index = 0;

        internal void AddItem(TabItem item)
        {
            item.Index = index++;
            if (item.Index == DefaultTabIndex)
            {
                item.Active(true);
            }

            items.Add(item);
            StateHasChanged();
        }


        internal async Task ClickTab(TabItem currItem)
        {
            foreach (var item in items)
            {
                item.Active(item == currItem);
            }

            StateHasChanged();
            await OnTabClick.InvokeAsync(currItem);
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (IsTabOnly)
            {
                if (!parameters.ToDictionary().ContainsKey("DefaultTabIndex"))
                {
                    DefaultTabIndex = -1;
                }
            }
        }
    }
}