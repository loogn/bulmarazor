using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 页头
    /// </summary>
    public partial class PageHeader
    {

        /// <summary>
        /// 标题
        /// </summary>
        [Parameter] public string Title { get; set; } = "返回";

        
        /// <summary>
        /// 内容
        /// </summary>
        [Parameter] public RenderFragment ChildContent { get; set; }
        
        /// <summary>
        /// 返回事件回调
        /// </summary>
        [Parameter] public EventCallback OnBack { get; set; }
        
        /// <summary>
        /// 标题卡槽
        /// </summary>
        [Parameter] public RenderFragment TitleSlot { get; set; }
        
    }
}