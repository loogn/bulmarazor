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

        internal void Active(bool isAct)
        {
            isActive = isAct;
            StateHasChanged();
        }

        private Task HandleClick()
        {
            return Tabs.ClickTab(this);
        }

        public int Index { get; set; }

        [CascadingParameter] public Tabs Tabs { get; set; }

        [Parameter] public string Label { get; set; }

        [Parameter] public RenderFragment LabelSlot { get; set; }

        [Parameter] public RenderFragment ContentSlot { get; set; }

        [Parameter] public RenderFragment ChildContent { get; set; }

        [Parameter] public string Href { get; set; }

        [Parameter] public string Target { get; set; }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            LabelSlot ??= builder => builder.AddContent(0, Label ?? "");
            ContentSlot ??= ChildContent;
        }

        protected override void OnInitialized()
        {
            base.OnInitialized();
            if (Tabs == null) throw new ArgumentException("TabItem must in Tabs");
            //添加
            Tabs.AddItem(this);
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