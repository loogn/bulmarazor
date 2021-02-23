using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Components;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class DataGrid<TItem> : BulmaComponentBase where TItem : new()
    {
        public DataGrid()
        {
        }

        string classes => CssBuilder.Default("table")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-bordered", IsBordered)
            .AddClass("is-striped", IsStriped)
            .AddClass("is-narrow", IsNarrow)
            .AddClass("is-hoverable", IsHoverable)
            .AddClass("is-fullwidth", IsFullwidth)
            .Build();

        /// <summary>
        /// 边框
        /// </summary>
        [Parameter]
        public bool IsBordered { get; set; }

        /// <summary>
        /// 条纹
        /// </summary>
        [Parameter]
        public bool IsStriped { get; set; }

        [Parameter] public string ThClass { get; set; }

        [Parameter] public string TdClass { get; set; }
        [Parameter] public bool NoHeader { get; set; }

        /// <summary>
        /// 狭窄
        /// </summary>
        [Parameter]
        public bool IsNarrow { get; set; }

        /// <summary>
        /// hover
        /// </summary>
        [Parameter]
        public bool IsHoverable { get; set; }

        /// <summary>
        /// 全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        [Parameter] public bool WithContainer { get; set; }

        [Parameter] public RenderFragment ChildContent { get; set; }


        [Parameter] public IEnumerable<TItem> Data { get; set; }

        private List<DataGridColumn<TItem>> Columns { get; set; }

        public void AddColumns(DataGridColumn<TItem> column)
        {
            Columns.Add(column);
            StateHasChanged();
        }

        private TypeCachedInfo<TItem> typeCachedInfo;

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();
            if (Columns == null)
            {
                Columns = new List<DataGridColumn<TItem>>();
            }
        }
    }
}