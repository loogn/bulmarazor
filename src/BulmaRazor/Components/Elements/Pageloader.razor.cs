using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class Pageloader
    {
        string classes => CssBuilder.Default("pageloader")
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-active", IsActive)
            .AddClass("is-bottom-to-top", IsBottomToTop)
            .AddClass("is-left-to-right", IsLeftToRight)
            .AddClass("is-right-to-left", IsRightToLeft)
            .Build();

        private bool isActive;

        /// <summary>
        /// 显示
        /// </summary>
        public void Show()
        {
            isActive = true;
            StateHasChanged();
        }

        /// <summary>
        /// 隐藏
        /// </summary>
        public void Hide()
        {
            isActive = false;
            StateHasChanged();
        }

        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;

        /// <summary>
        /// 从下到上
        /// </summary>
        [Parameter]
        public bool IsBottomToTop { get; set; }

        /// <summary>
        /// 从左到右
        /// </summary>
        [Parameter]
        public bool IsLeftToRight { get; set; }

        /// <summary>
        /// 从右到左
        /// </summary>
        [Parameter]
        public bool IsRightToLeft { get; set; }

        /// <summary>
        /// 是否激活
        /// </summary>
        [Parameter]
        public bool IsActive { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }


        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            isActive = IsActive;
        }
    }
}