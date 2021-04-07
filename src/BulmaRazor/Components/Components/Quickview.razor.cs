using System;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 右侧快速预览组件
    /// </summary>
    public partial class Quickview
    {
        private readonly string Id = "quickview_" + Guid.NewGuid().ToString("N");

        string classes => CssBuilder.Default("quickview")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-left",IsLeft)
            .AddClass("is-active", IsActive)
            .Build();


        
        /// <summary>
        /// 是否显示
        /// </summary>
        [Parameter]
        public bool IsActive { get; set; }
        
        /// <summary>
        /// 是否在左侧显示
        /// </summary>
        [Parameter]
        public bool IsLeft { get; set; }
        
        
        /// <summary>
        /// 开关选择器
        /// </summary>
        [Parameter]
        public string TriggerSelector { get; set; }

        /// <summary>
        /// 头部文本
        /// </summary>
        [Parameter]
        public string HeaderText { get; set; }

        /// <summary>
        /// 头部卡槽
        /// </summary>
        [Parameter]
        public RenderFragment HeaderSlot { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// 内容卡槽
        /// </summary>
        [Parameter]
        public RenderFragment BodySlot { get; set; }

        /// <summary>
        /// 脚部卡槽
        /// </summary>
        [Parameter]
        public RenderFragment FooterSlot { get; set; }

        /// <summary>
        /// 显示
        /// </summary>
        public void Show()
        {
            IsActive = true;
            StateHasChanged();
        }

        /// <summary>
        /// 隐藏
        /// </summary>
        public void Hide()
        {
            if (IsActive)
            {
                IsActive = false;
                StateHasChanged();
            }
        }

        /// <summary>
        /// 切换显示
        /// </summary>
        public void Toggle()
        {
            IsActive = !IsActive;
            StateHasChanged();
        }

        /// <summary>
        /// 渲染之后
        /// </summary>
        /// <param name="firstRender"></param>
        /// <returns></returns>
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
            await JsInterop.BindClickWithoutSelf(Id, TriggerSelector);
        }


        /// <summary>
        /// 初始化
        /// </summary>
        /// <returns></returns>
        protected override Task OnInitializedAsync()
        {
            JSCallbackManager.AddEventHandler(Id, "clickWithoutSelf", new Action(() => { Hide(); }));
            return base.OnInitializedAsync();
        }

        /// <summary>
        /// 释放
        /// </summary>
        /// <param name="disposing"></param>
        /// <returns></returns>
        protected override ValueTask DisposeAsync(bool disposing)
        {
            JSCallbackManager.DisposeObject(Id);
            return base.DisposeAsync(disposing);
        }
    }
}