using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 块状列表基类
    /// </summary>
    public class BlockListBase : BulmaComponentBase
    {
        /// <summary>
        /// 
        /// </summary>
        protected string classes => CssBuilder.Default()
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-outlined", IsOutlined)
            .AddClass("is-highlighted", IsHighlighted)
            .AddClass("has-radius", HasRadius)
            .AddClass("is-right", IsRight)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-left", IsLeft)
            .Build();

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
        /// 轮廓
        /// </summary>    
        [Parameter]
        public bool IsOutlined { get; set; }

        /// <summary>
        /// 文字居中
        /// </summary>
        [Parameter]
        public bool IsCentered { get; set; }

        /// <summary>
        /// 文字靠右
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }

        /// <summary>
        /// 文字靠左
        /// </summary>
        [Parameter]
        public bool IsLeft { get; set; }

        /// <summary>
        /// 圆角
        /// </summary>
        [Parameter]
        public bool HasRadius { get; set; }

        /// <summary>
        /// 高亮
        /// </summary>
        [Parameter]
        public bool IsHighlighted { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }
    }
}