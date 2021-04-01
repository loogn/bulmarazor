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
    /// <summary>
    /// 数据表格组件
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    public partial class DataTable<TItem> : IDataTable where TItem : new()
    {
        #region 私有变量

        string classes => CssBuilder.Default("table")
            .AddClassFromAttributes(Attributes)
            .AddClass("is-bordered", IsBordered)
            .AddClass("is-striped", IsStriped)
            .AddClass("is-narrow", IsNarrow)
            .AddClass("is-hoverable", IsHoverable)
            .AddClass("is-fullwidth", IsFullwidth)
            .Build();

        private List<DataTableRow<TItem>> dataView; //数据视图

        private List<DataTableColumn> columns = new(); //列集合

        // private int colIndex = 0; //列索引

        private TItem selectedItem; //选中的当前项
        internal HashSet<TItem> CheckItemSet { get; set; }
        private DataTableColumn sortColumn; //当前排序列
        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();

        private DataTableColumn checkColumn = null; //复选列

        // private CheckBox<string> cball; //全选复选框
        // private bool checkAll;

        private List<DataTableRow<TItem>> checkedRows = new(); //复选中的行

        #endregion


        #region 组件参数

        /// <summary>
        /// 是否显示边框
        /// </summary>
        [Parameter]
        public bool IsBordered { get; set; }

        /// <summary>
        /// 是否显示条纹
        /// </summary>
        [Parameter]
        public bool IsStriped { get; set; }

        /// <summary>
        /// Th样式类
        /// </summary>
        [Parameter]
        public string ThClass { get; set; }

        /// <summary>
        /// Td样式类
        /// </summary>
        [Parameter]
        public string TdClass { get; set; }

        /// <summary>
        /// Th样式
        /// </summary>
        [Parameter]
        public string ThStyle { get; set; }

        /// <summary>
        /// Td样式
        /// </summary>
        [Parameter]
        public string TdStyle { get; set; }

        /// <summary>
        /// 是否隐藏表头
        /// </summary>
        [Parameter]
        public bool NoHeader { get; set; }

        /// <summary>
        /// 是否显示狭窄
        /// </summary>
        [Parameter]
        public bool IsNarrow { get; set; }

        /// <summary>
        /// 是否可鼠标悬浮
        /// </summary>
        [Parameter]
        public bool IsHoverable { get; set; }

        /// <summary>
        /// 是否全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 修饰的颜色，如排序和过滤
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Link;

        /// <summary>
        /// 是否有容器包裹
        /// </summary>
        [Parameter]
        public bool WithContainer { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ColumnsSlot { get; set; }

        /// <summary>
        /// 详细行
        /// </summary>
        [Parameter]
        public RenderFragment<TItem> ExpandSlot { get; set; }

        /// <summary>
        /// 空数据显示
        /// </summary>
        [Parameter]
        public RenderFragment EmptySlot { get; set; }

        /// <summary>
        /// 数据源
        /// </summary>

        [Parameter]
        public IEnumerable<TItem> Data { get; set; }

        /// <summary>
        /// 排序事件回调
        /// </summary>
        [Parameter]
        public EventCallback<DataTableColumn> OnSortChange { get; set; }

        /// <summary>
        /// 是否可选中
        /// </summary>
        [Parameter]
        public bool IsSelectable { get; set; }

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

        #endregion


        #region 私有方法

        /// <summary>
        /// 添加列
        /// </summary>
        /// <param name="column"></param>
        public void AddColumns(DataTableColumn column)
        {
            // column.Index = colIndex++;
            columns.Add(column);
            if (column.IsCheckBox)
            {
                checkColumn = column;
                CheckItemSet = new HashSet<TItem>();
            }

            foreach (var row in dataView)
            {
                AddRowFields(row, column);
            }

            StateHasChanged();
        }

        private void AddRowFields(DataTableRow<TItem> row, DataTableColumn column)
        {
            if (column.Prop.HasValue())
            {
                var field = new DataTableRowField();
                TypeCachedInfo<TItem>.Accessor accessor = typeCachedInfo.GetAccessor(column.Prop);
                field.Value = accessor.Get(row.Item);
                field.Type = accessor.prop.PropertyType;
                field.ShowValue = ExtendMethods.GetShowValue(field.Type, field.Value, column.Format);
                // column.AllFilters.Add(field.ShowValue);
                column.FilterItems.Add(new DataTableFilterItem() {Value = field.ShowValue});
                row.Fields.Add(column.Prop, field);
            }
        }


        string getSortIconClass(DataTableColumn column)
        {
            return column == sortColumn ? Color.ToTextColor() : "has-text-grey-lighter";
        }

        string getSortIconClassName(DataTableColumn column)
        {
            if (column == sortColumn)
            {
                return sortColumn.SortAsc ? "fa fa-sort-asc" : "fa fa-sort-desc";
            }

            return "fa fa-sort";
        }

        /// <summary>
        /// 排序方法
        /// </summary>
        /// <param name="column"></param>
        private void Sort(DataTableColumn column)
        {
            if (sortColumn == column)
            {
                sortColumn.SortAsc = !sortColumn.SortAsc;
            }
            else
            {
                sortColumn = column;
                sortColumn.SortAsc = true;
            }

            DealView();
            OnSortChange.InvokeAsync(column);
        }


        private void TaggleExpand(DataTableRow<TItem> row)
        {
            row.IsExpanded = !row.IsExpanded;
        }


        private void TrClick(DataTableRow<TItem> row)
        {
            if (IsSelectable)
            {
                selectedItem = row.Item;
                OnSelected.InvokeAsync(row);
            }
        }


        private void CheckBoxClick(DataTableRow<TItem> row, bool isck)
        {
            if (isck)
            {
                CheckItemSet.Add(row.Item);
            }
            else
            {
                CheckItemSet.Remove(row.Item);
            }

            DealView();
            OnChecked.InvokeAsync(row);
        }

        string getFilterIconClass(DataTableColumn column)
        {
            return B.Join(B.Clickable,
                column.FilterItems.Any(x => x.Checked) ? Color.ToTextColor() : "has-text-grey-lighter");
        }

        /// <summary>
        /// 过滤方法
        /// </summary>
        /// <param name="column"></param>
        private void Filter(DataTableColumn column)
        {
            column.FilterShow = false;
            DealView();
        }

        private void ResetFilter(DataTableColumn column)
        {
            column.ClearCheckedFilter();
            column.FilterShow = false;
            DealView();
        }

        private void DealView()
        {
            //处理排序
            if (sortColumn != null && sortColumn.Prop.HasValue())
            {
                if (sortColumn.SortFunc == null)
                {
                    dataView = sortColumn.SortAsc
                        ? dataView.OrderBy(x => x.Fields[sortColumn.Prop].Value).ToList()
                        : dataView.OrderByDescending(x => x.Fields[sortColumn.Prop].Value).ToList();
                }
                else
                {
                    dataView = sortColumn.SortAsc
                        ? dataView.OrderBy(x => sortColumn.SortFunc(x.Item)).ToList()
                        : dataView.OrderByDescending(x => sortColumn.SortFunc(x.Item)).ToList();
                }
            }

            int ckCount = 0;
            foreach (var dv in dataView)
            {
                //处理选中
                if (checkColumn != null)
                {
                    dv.IsChecked = CheckItemSet.Contains(dv.Item);
                    if (dv.IsChecked) ckCount++;
                }

                //处理Filter
                dv.IsHidden = false;
                foreach (var column in columns)
                {
                    if (column.FilterItems.Any(x => x.Checked) &&
                        !column.FilterItems.All(x => x.Checked))
                    {
                        var field = dv.Fields[column.Prop];
                        if (!column.FilterItems.Any(x => x.Checked && x.Value.Equals(field.ShowValue)))
                        {
                            dv.IsHidden = true;
                            break;
                        }
                    }
                }
            }

            //这里处理checked状态
            if (checkColumn != null)
            {
                if (ckCount == dataView.Count)
                {
                    // cball?.SetIndeterminate(false);
                    checkColumn.CheckedAll = true;
                }
                else if (ckCount == 0)
                {
                    checkColumn.CheckedAll = false;
                    // cball?.SetIndeterminate(false);
                }
                else
                {
                    checkColumn.CheckedAll = null;
                    // cball?.SetIndeterminate();
                }
            }

            StateHasChanged();
        }

        #endregion

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            dataView = new List<DataTableRow<TItem>>();

            //清空 columns Filter
            foreach (var column in columns)
            {
                column.FilterItems.Clear();
                // column.AllFilters.Clear();
                // column.Filters.Clear();
            }

            var index = 0;
            if (Data != null)
            {
                foreach (var item in Data)
                {
                    var row = new DataTableRow<TItem>()
                    {
                        IsSelected = ReferenceEquals(item, selectedItem),
                        Index = index++,
                        Item = item
                    };
                    foreach (var column in columns)
                    {
                        AddRowFields(row, column);
                    }

                    dataView.Add(row);
                }
            }

            DealView();
        }

        #region 公开方法

        /// <summary>
        /// 反选行
        /// </summary>
        public void ToggleCheckedRows()
        {
            if (checkColumn != null)
            {
                foreach (var dv in dataView)
                {
                    if (CheckItemSet.Contains(dv.Item))
                    {
                        CheckItemSet.Remove(dv.Item);
                    }
                    else
                    {
                        CheckItemSet.Add(dv.Item);
                    }
                }

                DealView();
            }
        }

        /// <summary>
        /// 清空所有选中行
        /// </summary>
        /// <param name="allData">是否所有数据，用于分页记忆</param>
        public void ClearCheckedRows(bool allData = false)
        {
            if (checkColumn != null)
            {
                if (allData)
                {
                    CheckItemSet.Clear();
                }
                else
                {
                    foreach (var dv in dataView)
                    {
                        CheckItemSet.Remove(dv.Item);
                    }
                }
            }

            DealView();
        }

        /// <summary>
        /// 选中所有行
        /// </summary>
        /// <param name="cked">是否选中，false是全部取消</param>
        public void CheckAllRows(bool cked)
        {
            // var cked = checkColumn.CheckedAll;
            foreach (var dv in dataView)
            {
                if (cked)
                {
                    CheckItemSet.Add(dv.Item);
                }
                else
                {
                    CheckItemSet.Remove(dv.Item);
                }

                DealView();
            }
        }

        /// <summary>
        /// 获取所有选中行
        /// </summary>
        /// <returns></returns>
        public List<DataTableRow<TItem>> GetCheckedRows()
        {
            return dataView.Where(x => x.IsChecked).ToList();
        }

        /// <summary>
        /// 获取所有选中数据项
        /// </summary>
        /// <returns></returns>
        public List<TItem> GetCheckedItems(bool allData = false)
        {
            if (allData)
            {
                return CheckItemSet.ToList();
            }
            else
            {
                return dataView.Where(x => x.IsChecked).Select(x => x.Item).ToList();
            }
        }

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
                    column.ClearCheckedFilter();
                    column.FilterShow = false;
                });
                DealView();
            }
            else
            {
                var column = columns.FirstOrDefault(x => prop.Equals(x.Prop, StringComparison.OrdinalIgnoreCase));
                if (column != null)
                {
                    column.ClearCheckedFilter();
                    column.FilterShow = false;
                    DealView();
                }
            }
        }

        #endregion
    }
}