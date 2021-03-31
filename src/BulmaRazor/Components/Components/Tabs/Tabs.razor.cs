using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class Tabs
    {
        string classes => CssBuilder.Default("tabs")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-small", IsSmall)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-boxed", IsBoxed)
            .AddClass("is-toggle", IsToggle || IsToggleRounded)
            .AddClass("is-toggle-rounded", IsToggleRounded)
            .AddClass("is-fullwidth", IsFullwidth)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-right", IsRight)
            .AddClass("mb-0", Gapless)
            .Build();

        private List<TabItem> items = new();
        [Parameter] public bool IsSmall { get; set; }

        [Parameter] public bool IsMedium { get; set; }

        [Parameter] public bool IsLarge { get; set; }

        [Parameter] public bool IsBoxed { get; set; }

        [Parameter] public bool IsToggle { get; set; }

        [Parameter] public bool IsToggleRounded { get; set; }

        [Parameter] public bool IsFullwidth { get; set; }

        [Parameter] public bool IsCentered { get; set; }

        [Parameter] public bool IsRight { get; set; }

        [Parameter] public bool IsTabOnly { get; set; }

        [Parameter] public int DefaultTabIndex { get; set; }
        [Parameter] public bool Gapless { get; set; }
        
        [Parameter] public RenderFragment ChildContent { get; set; }

        [Parameter] public EventCallback<TabItem> OnTabClick { get; set; }
        
        private int index = 0;

        internal void AddItem(TabItem item)
        {
            item.Index = index++;
            if (item.Index == DefaultTabIndex)
            {
                item.Active(true);
            }

            items.Add(item);
            StateHasChanged();
        }

        

        internal async Task ClickTab(TabItem currItem)
        {
            foreach (var item in items)
            {
                item.Active(item == currItem);
            }

            StateHasChanged();
            await OnTabClick.InvokeAsync(currItem);
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (IsTabOnly)
            {
                if (!parameters.ToDictionary().ContainsKey("DefaultTabIndex"))
                {
                    DefaultTabIndex = -1;
                }
            }
        }
    }
}