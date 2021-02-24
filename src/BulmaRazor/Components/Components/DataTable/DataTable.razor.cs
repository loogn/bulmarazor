using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BulmaRazor.Components;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class DataTable<TItem> : BulmaComponentBase where TItem : new()
    {
        public DataTable()
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


        private IEnumerable<TItem> _data;

        [Parameter]
        public IEnumerable<TItem> Data
        {
            get { return _data; }
            set { _data = value; }
        }

        private List<DataTableRow<TItem>> dataView { get; set; }

        private IEnumerable<DataTableRow<TItem>> View
        {
            get
            {
                if (sortColumn != null && sortColumn.Prop.HasValue())
                {
                    if (sortColumn.SortFunc == null)
                    {
                        return sortAsc
                            ? dataView.OrderBy(x => x.Fields[sortColumn.Prop].Value)
                            : dataView.OrderByDescending(x => x.Fields[sortColumn.Prop].Value);
                    }
                    else
                    {
                        return sortAsc
                            ? dataView.OrderBy(x => sortColumn.SortFunc(x.Item))
                            : dataView.OrderByDescending(x => sortColumn.SortFunc(x.Item));
                    }
                }

                //这里处理checked?
                if (checkColumn != null)
                {
                    dataView.ForEach(x => x.IsChecked = checkColumn.CheckItemSet.Contains(x.Item));
                }

                return dataView;
            }
        }

        private List<DataTableColumn<TItem>> columns { get; set; } = new();

        private int colIndex = 0;
        private DataTableColumn<TItem> checkColumn = null;

        public void AddColumns(DataTableColumn<TItem> column)
        {
            column.Index = colIndex++;
            columns.Add(column);
            if (column.IsCheckBox)
            {
                checkColumn = column;
            }

            foreach (var dv in dataView)
            {
                var field = new DataTableRowField()
                {
                    Prop = column.Prop,
                };
                if (column.Prop.HasValue())
                {
                    TypeCachedInfo<TItem>.Accessor accessor = typeCachedInfo.GetAccessor(column.Prop);
                    field.Value = accessor.Get(dv.Item);
                    field.Type = accessor.prop.PropertyType;
                }

                dv.Fields.Add(column.Prop ?? "index_" + column.Index, field);
            }

            StateHasChanged();
        }

        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();

        private DataTableColumn<TItem> sortColumn;
        private bool sortAsc;


        #region Sort

        [Parameter] public Action<DataTableColumn<TItem>, bool> OnSortChange { get; set; }

        private void Sort(DataTableColumn<TItem> column)
        {
            if (sortColumn == column)
            {
                sortAsc = !sortAsc;
            }
            else
            {
                sortColumn = column;
                sortAsc = true;
            }

            OnSortChange?.Invoke(column, sortAsc);
        }

        #endregion

        [Parameter] public bool IsSelectable { get; set; }

        [Parameter] public Action<DataTableRow<TItem>, DataTableRow<TItem>> OnSelected { get; set; }

        private void TaggleExpand(DataTableRow<TItem> row)
        {
            row.IsExpanded = !row.IsExpanded;
        }

        private void TrClick(DataTableRow<TItem> row)
        {
            if (IsSelectable)
            {
                DataTableRow<TItem> oldRow = dataView.FirstOrDefault(x => x.IsSelected);
                if (oldRow != null)
                {
                    oldRow.IsSelected = false;
                }

                row.IsSelected = true;
                OnSelected?.Invoke(row, oldRow);
            }
        }

        [Parameter] public Action<List<DataTableRow<TItem>>, DataTableRow<TItem>> OnChecked { get; set; }

        private List<DataTableRow<TItem>> checkedRows = new List<DataTableRow<TItem>>();

        private void CheckBoxClick( DataTableRow<TItem> row)
        {
            checkColumn.CheckItemSet.Add(row.Item);
            OnChecked?.Invoke(GetCheckedRows(), row);
        }

        public List<DataTableRow<TItem>> GetCheckedRows()
        {
            return dataView.Where(x => x.IsChecked).ToList();
        }

        public void ClearCheckedRows()
        {
            checkColumn?.CheckItemSet.Clear();
        }

        public void ToggleCheckedRows()
        {
            if (checkColumn != null)
            {
                checkColumn.CheckItemSet.Clear();
                foreach (var dv in dataView)
                {
                    if (!dv.IsChecked)
                    {
                        checkColumn.CheckItemSet.Add(dv.Item);
                        dv.IsChecked = true;
                    }
                    else
                    {
                        dv.IsChecked = false;
                    }
                }
            }
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            dataView = new List<DataTableRow<TItem>>();
            var index = 0;
            foreach (var item in Data)
            {
                var dv = new DataTableRow<TItem>()
                {
                    Index = index++,
                    Item = item,
                    Fields = new Dictionary<string, DataTableRowField>()
                };
                foreach (var column in columns)
                {
                    var field = new DataTableRowField()
                    {
                        Prop = column.Prop,
                    };
                    if (column.Prop.HasValue())
                    {
                        TypeCachedInfo<TItem>.Accessor accessor = typeCachedInfo.GetAccessor(column.Prop);
                        field.Value = accessor.Get(dv.Item);
                        field.Type = accessor.prop.PropertyType;
                    }

                    dv.Fields.Add(column.Prop ?? "field_" + column.Index, field);
                }

                dataView.Add(dv);
            }
        }
    }
}