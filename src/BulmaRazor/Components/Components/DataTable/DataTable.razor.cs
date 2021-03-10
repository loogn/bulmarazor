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
        [Parameter] public string ThStyle { get; set; }

        [Parameter] public string TdStyle { get; set; }
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
                    field.ShowValue = ExtendMethods.GetShowValue(field.Type, field.Value, column.Format);
                    column.AllFilters.Add(field.ShowValue);
                }

                dv.Fields.Add(column.Prop ?? "index_" + column.Index, field);
            }

            StateHasChanged();
        }

        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();

        private DataTableColumn<TItem> sortColumn;
        private bool sortAsc;

        private CheckBox<string> cball;

        #region Sort

        [Parameter] public Action<DataTableColumn<TItem>, bool> OnSortChange { get; set; }

        string getSortIconClass(DataTableColumn<TItem> column)
        {
            return column == sortColumn ? "icon has-text-link" : "has-text-grey-lighter";
        }


        string getSortIconClassName(DataTableColumn<TItem> column)
        {
            if (column == sortColumn)
            {
                return sortAsc ? "fa fa-sort-asc" : "fa fa-sort-desc";
            }

            return "fa fa-sort";
        }

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

            DealView();
            OnSortChange?.Invoke(column, sortAsc);
        }

        #endregion

        [Parameter] public bool IsSelectable { get; set; }

        /// <summary>
        /// 单击选中
        /// </summary>
        [Parameter]
        public EventCallback<DataTableRow<TItem>> OnSelected { get; set; }

        /// <summary>
        /// 选中复选框
        /// </summary>
        [Parameter]
        public EventCallback<DataTableRow<TItem>> OnChecked { get; set; }

        // [Parameter]
        // public  EventCallback<DataTableRow<TItem>> OnExpandChanged { get; set; }

        private void TaggleExpand(DataTableRow<TItem> row)
        {
            row.IsExpanded = !row.IsExpanded;
            // OnExpandChanged.InvokeAsync(row);
        }

        private TItem selectedItem;

        private void TrClick(DataTableRow<TItem> row)
        {
            if (IsSelectable)
            {
                selectedItem = row.Item;
                OnSelected.InvokeAsync(row);
            }
        }


        private List<DataTableRow<TItem>> checkedRows = new List<DataTableRow<TItem>>();

        private void CheckBoxClick(DataTableRow<TItem> row, bool isck)
        {
            if (isck)
            {
                checkColumn.CheckItemSet.Add(row.Item);
            }
            else
            {
                checkColumn.CheckItemSet.Remove(row.Item);
            }

            DealView();
            OnChecked.InvokeAsync(row);
        }

        public List<DataTableRow<TItem>> GetCheckedRows()
        {
            return dataView.Where(x => x.IsChecked).ToList();
        }

        public void ClearCheckedRows()
        {
            checkColumn?.CheckItemSet.Clear();
            DealView();
        }

        public void ToggleCheckedRows()
        {
            if (checkColumn != null)
            {
                foreach (var dv in dataView)
                {
                    if (checkColumn.CheckItemSet.Contains(dv.Item))
                    {
                        checkColumn.CheckItemSet.Remove(dv.Item);
                    }
                    else
                    {
                        checkColumn.CheckItemSet.Add(dv.Item);
                    }
                }

                DealView();
            }
        }

        private void checkAll(bool cked)
        {
            foreach (var dv in dataView)
            {
                if (cked)
                {
                    checkColumn.CheckItemSet.Add(dv.Item);
                }
                else
                {
                    checkColumn.CheckItemSet.Remove(dv.Item);
                }

                DealView();
            }
        }

        private void DealView()
        {
            if (sortColumn != null && sortColumn.Prop.HasValue())
            {
                if (sortColumn.SortFunc == null)
                {
                    dataView = sortAsc
                        ? dataView.OrderBy(x => x.Fields[sortColumn.Prop].Value).ToList()
                        : dataView.OrderByDescending(x => x.Fields[sortColumn.Prop].Value).ToList();
                }
                else
                {
                    dataView = sortAsc
                        ? dataView.OrderBy(x => sortColumn.SortFunc(x.Item)).ToList()
                        : dataView.OrderByDescending(x => sortColumn.SortFunc(x.Item)).ToList();
                }
            }

            int ckCount = 0;
            foreach (var dv in dataView)
            {
                if (checkColumn != null)
                {
                    dv.IsChecked = checkColumn.CheckItemSet.Contains(dv.Item);
                    if (dv.IsChecked) ckCount++;
                }

                //处理Filter
                dv.IsHidden = false;
                foreach (var column in columns)
                {
                    if (column.AllFilters.Any() && column.Filters.Any() &&
                        column.AllFilters.Count != column.Filters.Count)
                    {
                        var field = dv.Fields[column.Prop];
                        if (!column.Filters.Contains(field.ShowValue))
                        {
                            dv.IsHidden = true;
                            break;
                        }
                    }
                }
            }

            //这里处理checked?
            if (checkColumn != null)
            {
                if (ckCount == dataView.Count)
                {
                    cball?.SetIndeterminate(false);
                    checkColumn.checkedAll = true;
                }
                else if (ckCount == 0)
                {
                    checkColumn.checkedAll = false;
                    cball?.SetIndeterminate(false);
                }
                else
                {
                    checkColumn.checkedAll = false;
                    cball?.SetIndeterminate();
                }
            }

            StateHasChanged();
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            dataView = new List<DataTableRow<TItem>>();

            //清空 columns Filter
            foreach (var column in columns)
            {
                column.AllFilters.Clear();
                column.Filters.Clear();
            }

            var index = 0;
            if (Data != null)
            {
                foreach (var item in Data)
                {
                    var dv = new DataTableRow<TItem>()
                    {
                        IsSelected = ReferenceEquals(item, selectedItem),
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
                            field.ShowValue = ExtendMethods.GetShowValue(field.Type, field.Value, column.Format);
                            column.AllFilters.Add(field.ShowValue);
                        }

                        dv.Fields.Add(column.Prop ?? "field_" + column.Index, field);
                    }

                    dataView.Add(dv);
                }
            }

            DealView();
        }

        #region Filter

        string getFilterIconClass(DataTableColumn<TItem> column)
        {
            return B.Join(B.Clickable, column.Filters.Any() ? "has-text-link" : "has-text-grey-lighter");
        }

        private void DoFilter(DataTableColumn<TItem> column)
        {
            column.FilterShow = false;
            DealView();
        }

        private void ResetFilter(DataTableColumn<TItem> column)
        {
            column.Filters = new HashSet<string>();
            column.FilterShow = false;
            DealView();
        }

        #endregion
    }
}