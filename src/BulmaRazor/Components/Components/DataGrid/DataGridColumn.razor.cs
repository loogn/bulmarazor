using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Components;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class DataGridColumn<TItem> : BulmaComponentBase where TItem : new()
    {
        [Parameter] public string Label { get; set; }

        [Parameter] public string Prop { get; set; }

        [Parameter] public string Format { get; set; }

        [Parameter] public string ThClass { get; set; }

        [Parameter] public string TdClass { get; set; }

        [CascadingParameter] public DataGrid<TItem> DataGrid { get; set; }

        [Parameter] public RenderFragment<TItem> ChildContent { get; set; }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (DataGrid == null)
            {
                throw new ArgumentNullException(nameof(DataGrid), "DataGridColumn must in DataGrid");
            }
        }

        protected override void OnInitialized()
        {
            base.OnInitialized();
            DataGrid.AddColumns(this);
        }
    }
}