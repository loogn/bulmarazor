using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Icon基类
    /// </summary>
    public class IconBase : BulmaComponentBase
    {
        /// <summary>
        /// 类
        /// </summary>
        protected string classes => CssBuilder.Default("icon")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass(Color.ToTextColor(), Color.Value)
            .AddClass("is-left", IsLeft)
            .AddClass("is-right", IsRight)
            .Build();

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
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;


        /// <summary>
        /// 是否靠左
        /// </summary>
        [Parameter]
        public bool IsLeft { get; set; }

        /// <summary>
        /// 是否靠右
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }
    }
}