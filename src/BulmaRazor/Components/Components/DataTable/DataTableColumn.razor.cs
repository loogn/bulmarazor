using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Components;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class DataTableColumn<TItem> : BulmaComponentBase where TItem : new()
    {
        public int Index { get; set; }

        [Parameter] public string Width { get; set; }

        internal string ThStyle => CssBuilder.Default()
            .AddClass("width:" + Width, Width)
            .Build();

        internal HashSet<TItem> CheckItemSet { get; set; }
        internal bool checkedAll;
        /// <summary>
        /// 是否是索引列
        /// </summary>
        [Parameter]
        public bool IsIndex { get; set; }

        /// <summary>
        /// 是否是复选框
        /// </summary>
        [Parameter]
        public bool IsCheckBox { get; set; }

        /// <summary>
        /// 是否是展开列
        /// </summary>
        [Parameter]
        public bool IsExpand { get; set; }

        [Parameter] public string Label { get; set; }

        [Parameter] public string Prop { get; set; }

        [Parameter] public string Format { get; set; }

        [Parameter] public string ThClass { get; set; }

        [Parameter] public string TdClass { get; set; }

        [Parameter] public bool Sortable { get; set; }

        [Parameter] public Func<TItem, object> SortFunc { get; set; }

        [CascadingParameter] public DataTable<TItem> DataGrid { get; set; }

        [Parameter] public RenderFragment<TItem> ChildContent { get; set; }
        [Parameter] public RenderFragment ThSlot { get; set; }
        [Parameter] public RenderFragment<TItem> TdSlot { get; set; }

        [Parameter] public RenderFragment<TItem> ExpandSlot { get; set; }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
        }

        protected override void OnInitialized()
        {
            if (DataGrid == null)
            {
                throw new ArgumentNullException(nameof(DataGrid), "DataGridColumn must in DataGrid");
            }
            if (IsCheckBox)
            {
                CheckItemSet = new HashSet<TItem>();
            }

            base.OnInitialized();
            DataGrid.AddColumns(this);
        }
    }
}