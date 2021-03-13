using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Components;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class DataTableColumn
    {
        public HashSet<string> AllFilters { get; set; } = new();
        public HashSet<string> Filters { get; set; } = new();
        public int Index { get; set; }

        [Parameter] public string Width { get; set; }

        internal string thStyle => CssBuilder.Default()
            .AddClass("width:" + Width, Width)
            .AddClass(ThStyle)
            .Build();


        public bool CheckedAll { get; set; }


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
        [Parameter] public string ThStyle { get; set; }

        [Parameter] public string TdStyle { get; set; }

        [Parameter] public bool Sortable { get; set; }
        public bool SortAsc { get; set; }
        [Parameter] public bool Filterable { get; set; }

        public bool FilterShow { get; set; }

        /// <summary>
        /// Item作为参数，返回排序对象
        /// </summary>
        [Parameter] public Func<object, object> SortFunc { get; set; }

        [CascadingParameter] public IDataTable DataTable { get; set; }

        [Parameter] public RenderFragment ThSlot { get; set; }
        
        /// <summary>
        /// Item做为参数，填充Td
        /// </summary>
        [Parameter]public RenderFragment<object> ChildContent { get; set; }
        /// <summary>
        /// Item作为参数,填充Td
        /// </summary>
        [Parameter] public RenderFragment<object> TdSlot { get; set; }

        protected override void OnInitialized()
        {
            if (DataTable == null)
            {
                throw new ArgumentNullException(nameof(DataTable), "DataTableColumn must in DataTable");
            }

            if (Sortable || Filterable)
            {
                if (!Prop.HasValue())
                {
                    throw new ArgumentNullException(nameof(DataTable), "Sortable or Filterable must Set Prop");
                }
            }

            base.OnInitialized();
            DataTable.AddColumns(this);
        }
    }
}