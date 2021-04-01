using System;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 下拉组件
    /// </summary>
    public partial class Dropdown
    {
        readonly string Id = "ddl_" + Guid.NewGuid().ToString("N");

        string clesses => CssBuilder.Default("dropdown")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-active", IsActive)
            .AddClass("is-up", IsUp)
            .AddClass("is-right", IsRight)
            .AddClass("is-hoverable", !IsClickTrigger)
            .Build();

        /// <summary>
        /// 内容样式
        /// </summary>
        [Parameter] public string ContentStyle { get; set; }

        /// <summary>
        /// 是否显示
        /// </summary>
        [Parameter]
        public bool IsActive { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [Parameter] public EventCallback<bool> IsActiveChanged { get; set; }

        /// <summary>
        /// 是否单击激活
        /// </summary>
        [Parameter]
        public bool IsClickTrigger { get; set; }

        /// <summary>
        /// 向上显示
        /// </summary>
        [Parameter]
        public bool IsUp { get; set; }

        /// <summary>
        /// 向右显示
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }


        /// <summary>
        /// 开关卡槽
        /// </summary>
        [Parameter]
        public RenderFragment TriggerSlot { get; set; }

        /// <summary>
        /// 菜单卡槽
        /// </summary>
        [Parameter]
        public RenderFragment MenuSlot { get; set; }

        /// <summary>
        /// 切换
        /// </summary>
        /// <param name="isActive"></param>
        public void Toggle(bool? isActive = null)
        {
            if (isActive != null)
            {
                IsActive = isActive.Value;
            }
            else
            {
                IsActive = !IsActive;
            }

            IsActiveChanged.InvokeAsync(IsActive);
            StateHasChanged();
        }

        private void clickHandle()
        {
            if (IsClickTrigger)
            {
                Toggle();
            }
        }

        /// <summary>
        /// 渲染后
        /// </summary>
        /// <param name="firstRender"></param>
        /// <returns></returns>
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
            if (firstRender)
            {
                await JsInterop.BindClickWithoutSelf(Id);
            }
        }

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void OnInitialized()
        {
            if (IsClickTrigger)
            {
                JSCallbackManager.AddEventHandler(Id, "clickWithoutSelf", new Action(() => { Toggle(false); }));
            }

            base.OnInitialized();
        }

        /// <summary>
        /// 释放资源
        /// </summary>
        /// <param name="disposing"></param>
        /// <returns></returns>
        protected override ValueTask DisposeAsync(bool disposing)
        {
            if (IsClickTrigger)
            {
                JSCallbackManager.DisposeObject(Id);
            }

            return base.DisposeAsync(disposing);
        }
    }
}