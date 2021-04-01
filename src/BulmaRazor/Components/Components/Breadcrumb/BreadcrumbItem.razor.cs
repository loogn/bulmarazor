using System.Collections.Generic;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 面包屑项
    /// </summary>
    public partial class BreadcrumbItem
    {
        string classes => CssBuilder.Default("")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-active", IsActive)
            .Build();
        private Dictionary<string, object> AddAtts = new();
        
        /// <summary>
        /// 是否当前激活
        /// </summary>
        [Parameter] public bool IsActive { get; set; }
        
        /// <summary>
        /// 链接地址
        /// </summary>
        [Parameter] public string Href { get; set; }
        
        /// <summary>
        /// 目标,_self | _blank 
        /// </summary>
        [Parameter] public string Target { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter] public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void OnInitialized()
        {
            base.OnInitialized();

            if (Href.HasValue())
            {
                AddAtts.Add("href", Href);
            }

            if (Target.HasValue())
            {
                AddAtts.Add("target", Target);
            }
        }
    }
}