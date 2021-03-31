using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 面包屑
    /// </summary>
    public partial class Breadcrumb
    {
        string classes => CssBuilder.Default("breadcrumb")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("has-arrow-separator", HasArrowSeparator)
            .AddClass("has-bullet-separator", HasBulletSeparator)
            .AddClass("has-dot-separator", HasDotSeparator)
            .AddClass("has-succeeds-separator", HasSucceedsSeparator)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-right", IsRight)
            .Build();

        private List<BreadcrumbItem> items { get; set; } = new();

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
        /// 箭头分隔符
        /// </summary>
        [Parameter]
        public bool HasArrowSeparator { get; set; }

        /// <summary>
        /// 子弹分隔符
        /// </summary>
        [Parameter]
        public bool HasBulletSeparator { get; set; }

        /// <summary>
        /// 点分隔符
        /// </summary>
        [Parameter]
        public bool HasDotSeparator { get; set; }

        /// <summary>
        /// 后继分隔符
        /// </summary>
        [Parameter]
        public bool HasSucceedsSeparator { get; set; }

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
        /// 子内容
        /// </summary>

        [Parameter]
        public RenderFragment ChildContent { get; set; }
        
    }
}