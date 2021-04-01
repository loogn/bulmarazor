using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// tab切换项
    /// </summary>
    public partial class TabItem
    {
        string classes => CssBuilder.Default("")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-active", isActive)
            .Build();

        internal string contentCls => CssBuilder.Default()
            .AddClass(B.Hidden, !isActive)
            .Build();

        bool isActive { get; set; }

        private Dictionary<string, object> AddAtts = new();

        /// <summary>
        /// 索引，从0开始
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// Tabs父组件
        /// </summary>
        [CascadingParameter]
        public Tabs Parent { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        [Parameter]
        public string Label { get; set; }

        /// <summary>
        /// 标签卡槽
        /// </summary>
        [Parameter]
        public RenderFragment LabelSlot { get; set; }

        /// <summary>
        /// 内容卡槽
        /// </summary>
        [Parameter]
        public RenderFragment ContentSlot { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// 连接地址
        /// </summary>
        [Parameter]
        public string Href { get; set; }

        /// <summary>
        /// 连接目标
        /// </summary>
        [Parameter]
        public string Target { get; set; }

        internal void Active(bool isAct)
        {
            isActive = isAct;
            StateHasChanged();
        }

        private Task HandleClick()
        {
            return Parent.ClickTab(this);
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            LabelSlot ??= builder => builder.AddContent(0, Label ?? "");
            ContentSlot ??= ChildContent;
        }

        /// <summary>
        /// 初始化
        /// </summary>
        /// <exception cref="ArgumentException"></exception>
        protected override void OnInitialized()
        {
            base.OnInitialized();
            if (Parent == null) throw new ArgumentException("TabItem must in Tabs");
            //添加
            Parent.AddItem(this);
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