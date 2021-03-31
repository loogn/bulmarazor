using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 分页组件
    /// </summary>
    public partial class Pagination
    {
        string clesses => CssBuilder.Default("pagination")
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-right", IsRight)
            .AddClass("is-rounded", IsRounded)
            .Build();

        private int StartIndex => Math.Max(2, Math.Min(PageIndex - (ItemSize / 2), PageCount - ItemSize));

        private int EndIndex => Math.Min(PageCount - 1, Math.Max(StartIndex + ItemSize - 1, ItemSize + 1));


        private bool DisablePrev => PageIndex == 1;
        private bool DisableNext => PageIndex == PageCount;


        /// <summary>
        /// 居中显示
        /// </summary>
        [Parameter]
        public bool IsCentered { get; set; }

        /// <summary>
        /// 居右显示
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }

        /// <summary>
        /// 圆角样式
        /// </summary>
        [Parameter]
        public bool IsRounded { get; set; }

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
        /// 页码
        /// </summary>
        [Parameter]
        public int PageIndex { get; set; } = 1;

        /// <summary>
        /// 每页条数
        /// </summary>
        [Parameter]
        public int PageSize { get; set; } = 10;

        /// <summary>
        /// 总条数
        /// </summary>
        [Parameter]
        public int TotalCount { get; set; }

        /// <summary>
        /// 总页数
        /// </summary>
        public int PageCount { get; private set; }

        /// <summary>
        /// 分页条大小，大于等于 5 且小于等于 21 的奇数，默认5
        /// </summary>
        [Parameter]
        public int ItemSize { get; set; } = 5;

        /// <summary>
        /// 只有一页时是否隐藏，默认true
        /// </summary>
        [Parameter]
        public bool HideOnSinglePage { get; set; } = true;

        /// <summary>
        /// 页码改变事件
        /// </summary>
        [Parameter]
        public EventCallback<int> OnPageChange { get; set; }

        /// <summary>
        /// 上一页事件
        /// </summary>
        [Parameter]
        public EventCallback<int> OnPrevClick { get; set; }

        /// <summary>
        /// 下一页事件
        /// </summary>
        [Parameter]
        public EventCallback<int> OnNextClick { get; set; }

        /// <summary>
        /// 上一页显示卡槽
        /// </summary>
        [Parameter]
        public RenderFragment PrevSlot { get; set; }

        /// <summary>
        /// 下一页显示卡槽
        /// </summary>
        [Parameter]
        public RenderFragment NextSlot { get; set; }

        /// <summary>
        /// 上一页显示文本
        /// </summary>
        [Parameter]
        public string PrevText { get; set; }

        /// <summary>
        /// 下一页显示文本
        /// </summary>
        [Parameter]
        public string NextText { get; set; }


        private async Task ChangePage(int currentIndex)
        {
            await OnPageChange.InvokeAsync(currentIndex);
            PageIndex = currentIndex;
        }

        private async Task PrevPage()
        {
            if (!DisablePrev)
            {
                var currentIndex = PageIndex - 1;
                await OnPrevClick.InvokeAsync(currentIndex);
                await ChangePage(currentIndex);
            }
        }

        private async Task NextPage()
        {
            if (!DisableNext)
            {
                var currentIndex = PageIndex + 1;
                await OnNextClick.InvokeAsync(currentIndex);
                await ChangePage(currentIndex);
            }
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        /// <exception cref="ArgumentOutOfRangeException"></exception>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            if (ItemSize < 5 || ItemSize > 21 || ItemSize % 2 == 0)
            {
                throw new ArgumentOutOfRangeException(nameof(ItemSize), $"{nameof(ItemSize)}必须是大于等于5且小于等于21的奇数");
            }

            if (TotalCount > 0 && PageSize > 0)
            {
                PageCount = TotalCount / PageSize;
                if (TotalCount % PageSize > 0)
                {
                    PageCount++;
                }
            }
            else
            {
                PageCount = 0;
            }
        }
    }
}