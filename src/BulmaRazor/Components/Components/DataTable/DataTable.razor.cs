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
    public partial class DataTable<TItem> where TItem : new()
    {
        string classes => CssBuilder.Default("table")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-bordered", IsBordered)
            .AddClass("is-striped", IsStriped)
            .AddClass("is-narrow", IsNarrow)
            .AddClass("is-hoverable", IsHoverable)
            .AddClass("is-fullwidth", IsFullwidth)
            .Build();

        #region 组件参数

        /// <summary>
        /// 是否显示边框
        /// </summary>
        [Parameter] public bool IsBordered { get; set; }

        /// <summary>
        /// 是否显示条纹
        /// </summary>
        [Parameter] public bool IsStriped { get; set; }

        /// <summary>
        /// Th样式类
        /// </summary>
        [Parameter] public string ThClass { get; set; }

        /// <summary>
        /// Td样式类
        /// </summary>
        [Parameter] public string TdClass { get; set; }

        /// <summary>
        /// Th样式
        /// </summary>
        [Parameter] public string ThStyle { get; set; }

        /// <summary>
        /// Td样式
        /// </summary>
        [Parameter] public string TdStyle { get; set; }

        /// <summary>
        /// 是否隐藏表头
        /// </summary>
        [Parameter] public bool NoHeader { get; set; }

        /// <summary>
        /// 是否显示狭窄
        /// </summary>
        [Parameter] public bool IsNarrow { get; set; }

        /// <summary>
        /// 是否可鼠标悬浮
        /// </summary>
        [Parameter] public bool IsHoverable { get; set; }

        /// <summary>
        /// 是否全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 修饰的颜色，如排序和过滤
        /// </summary>
        [Parameter] public Color Color { get; set; } = Color.Link;

        /// <summary>
        /// 是否有容器包裹
        /// </summary>
        [Parameter] public bool WithContainer { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter] public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// 数据源
        /// </summary>

        [Parameter] public IEnumerable<TItem> Data { get; set; }
        
        /// <summary>
        /// 排序事件回调
        /// </summary>
        [Parameter] public Action<DataTableColumn<TItem>, bool> OnSortChange { get; set; }
        #endregion

        private List<DataTableRow<TItem>> dataView { get; set; }

        private List<DataTableColumn<TItem>> columns { get; set; } = new();

        private int colIndex = 0;


        internal void AddColumns(DataTableColumn<TItem> column)
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

        private DataTableColumn<TItem> checkColumn = null;

        /// <summary>
        /// 全选复选框
        /// </summary>
        private CheckBox<string> cball;

        #region Sort

        private DataTableColumn<TItem> sortColumn;
        private bool sortAsc;
        

        string getSortIconClass(DataTableColumn<TItem> column)
        {
            return column == sortColumn ? Color.ToTextColor() : "has-text-grey-lighter";
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

        /// <summary>
        /// 清空过滤条件
        /// </summary>
        /// <param name="prop"></param>
        public void ClearFilter(string prop = null)
        {
            if (string.IsNullOrEmpty(prop))
            {
                columns.ForEach(column =>
                {
                    column.Filters = new HashSet<string>();
                    column.FilterShow = false;
                });
                DealView();
            }
            else
            {
                var column = columns.FirstOrDefault(x => prop.Equals(x.Prop, StringComparison.OrdinalIgnoreCase));
                if (column != null)
                {
                    column.Filters = new HashSet<string>();
                    column.FilterShow = false;
                    DealView();
                }
            }
        }

        string getFilterIconClass(DataTableColumn<TItem> column)
        {
            return B.Join(B.Clickable, column.Filters.Any() ? Color.ToTextColor() : "has-text-grey-lighter");
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