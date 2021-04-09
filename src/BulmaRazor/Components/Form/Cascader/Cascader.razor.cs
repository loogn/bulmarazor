using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Transactions;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 级联组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Cascader<TValue>
    {
        [Inject] private BulmaRazorJsInterop JsInterop { get; set; }

        readonly string Id = "cascader_" + Guid.NewGuid().ToString("N");

        string classes => CssBuilder.Default("input")
            .AddClass("cascader")
            .AddClass(Color.Value,Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClassFromAttributes(Attributes)
            .Build();

        private string dropDownCls => CssBuilder.Default("cascader-dropdown")
            .AddClass(B.Hidden, !isShow)
            .Build();

        private string tagsInputCls => CssBuilder.Default("cascader-tags")
            .AddClass(B.Clickable)
            .Build();

        private string GetItemCls(CascaderItem<TValue> item)
        {
            return CssBuilder.Default()
                .AddClass("active", item.GetIsActive())
                .AddClass("is-disabled", item.Disabled)
                .AddClass(B.Clickable, !item.Disabled)
                .Build();
        }

        private string GetCheckCls(CascaderItem<TValue> item)
        {
            return CssBuilder.Default()
                .AddClass("active", item.GetHasChildrenChecked())
                .Build();
        }

        private bool? GetItemChecked(CascaderItem<TValue> item)
        {
            if (IsMultiple && !IsIsolated && item.Children.Any())
            {
                return item.GetCheckedStatus();
            }

            return item.IsChecked;
        }

        private string GetTagCls()
        {
            if (IsRoundedTag)
            {
                return "tag is-rounded";
            }
            else
            {
                return "tag";
            }
        }

        private bool isShow = false;

        private HashSet<CascaderItem<TValue>> SelectedList = new();
        private IEnumerable<CascaderItem<TValue>> dataView = new List<CascaderItem<TValue>>();

        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Link;

            /// <summary>
        /// 小尺寸
        /// </summary>
        [Parameter]
        public bool IsSmall { get; set; }

        /// <summary>
        /// 正常尺寸
        /// </summary>
        [Parameter]
        public bool IsNormal { get; set; }

        /// <summary>
        /// 中尺寸
        /// </summary>
        [Parameter]
        public bool IsMedium { get; set; }

        /// <summary>
        /// 大尺寸
        /// </summary>
        [Parameter]
        public bool IsLarge { get; set; }

        /// <summary>
        /// 是否可清空
        /// </summary>
        [Parameter]
        public bool Clearable { get; set; }

        /// <summary>
        /// 是否多选
        /// </summary>
        [Parameter]
        public bool IsMultiple { get; set; }

        /// <summary>
        /// 节点是否孤立
        /// </summary>
        [Parameter]
        public bool IsIsolated { get; set; }

        /// <summary>
        /// 是否圆角Tag
        /// </summary>
        [Parameter]
        public bool IsRoundedTag { get; set; }

        /// <summary>
        /// 级联值的分隔符
        /// </summary>
        [Parameter]
        public string Separator { get; set; } = "/";

        /// <summary>
        /// 数据源
        /// </summary>
        [Parameter]
        public IEnumerable<CascaderItem<TValue>> Data { get; set; }

        /// <summary>
        /// 未选择时占位符
        /// </summary>
        [Parameter]
        public string Placeholder { get; set; } = "请选择";

        /// <summary>
        /// 显示所有层级，默认true
        /// </summary>
        [Parameter]
        public bool ShowAllLevels { get; set; } = true;

        /// <summary>
        /// 多选时，是否折叠选中tag
        /// </summary>
        [Parameter]
        public bool IsCollapseTags { get; set; }

        /// <summary>
        /// 节点显示卡槽
        /// </summary>
        [Parameter]
        public RenderFragment<CascaderItem<TValue>> ItemSlot { get; set; }

        /// <summary>
        /// 选中值发生变化事件
        /// </summary>
        [Parameter]
        public EventCallback<Cascader<TValue>> OnChange { get; set; }

        /// <summary>
        /// 单选时的值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }

        /// <summary>
        /// Value绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }

        /// <summary>
        /// 多选时的值
        /// </summary>
        [Parameter]
        public HashSet<TValue> Values { get; set; }

        /// <summary>
        /// Values绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<HashSet<TValue>> ValuesChanged { get; set; }

        //触发事件
        private async Task Fire()
        {
            if (IsMultiple)
            {
                Values = new HashSet<TValue>(SelectedList.Select(x => x.Value));
                await ValuesChanged.InvokeAsync(Values);
            }
            else
            {
                var item = SelectedList.FirstOrDefault();
                var vv = item == null ? default : item.Value;
                await ValueChanged.InvokeAsync(vv);
            }

            await OnChange.InvokeAsync(this);
        }


        //选中值
        private void CheckValues(CascaderItem<TValue> item, HashSet<TValue> values)
        {
            if (values.Contains(item.Value))
            {
                item.IsChecked = true;
                if (IsIsolated || item.Children.Count == 0)
                {
                    SelectedList.Add(item);
                }
            }

            foreach (var subItem in item.Children)
            {
                CheckValues(subItem, values);
            }
        }

        //初始化数据
        private void InitData()
        {
            if (Data == null) return;
            SelectedList.Clear();
            HashSet<TValue> values = null;
            if (IsMultiple && Values != null && Values.Any())
            {
                values = Values;
            }
            else if (Value != null)
            {
                values = new HashSet<TValue>() {Value};
            }

            if (values != null)
            {
                foreach (var item in Data)
                {
                    CheckValues(item, values);
                }
            }

            dataView = Data;
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            InitData();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        /// <returns></returns>
        protected override Task OnInitializedAsync()
        {
            JSCallbackManager.AddEventHandler(Id, "clickWithoutSelf", new Action(() =>
            {
                isShow = false;
                StateHasChanged();
            }));
            return base.OnInitializedAsync();
        }

        /// <summary>
        /// 渲染后
        /// </summary>
        /// <param name="firstRender"></param>
        /// <returns></returns>
        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
            if (firstRender)
            {
                await JsInterop.BindClickWithoutSelf(Id);
            }
        }

        /// <summary>
        /// 释放资源
        /// </summary>
        /// <param name="disposing"></param>
        /// <returns></returns>
        protected override ValueTask DisposeAsync(bool disposing)
        {
            JSCallbackManager.DisposeObject(Id);
            return base.DisposeAsync(disposing);
        }


        //获取显示文本
        private string GetText(CascaderItem<TValue> item)
        {
            if (item == null) return string.Empty;

            if (!ShowAllLevels) return item.Text;

            List<string> linkList = new List<string>();
            var cur = item;
            do
            {
                linkList.Add(cur.Text);
                cur = cur.Parent;
            } while (cur != null);

            linkList.Reverse();
            return String.Join(" " + Separator + " ", linkList);
        }

        //单击选中一项
        private async Task SelectOne(IEnumerable<CascaderItem<TValue>> list, CascaderItem<TValue> item)
        {
            if (item.Disabled) return;

            foreach (var cascaderItem in list)
            {
                cascaderItem.IsExpanded = false;
                cascaderItem.IsSelected = false;
                cascaderItem.Children.ForEach(x =>
                {
                    x.IsExpanded = false;
                    x.IsSelected = false;
                });
            }

            if (IsMultiple && item.Children.Count == 0) return;
            if (IsIsolated && !IsMultiple && item.Children.Count == 0) return;

            if (item.Children.Count == 0)
            {
                var curr = SelectedList.FirstOrDefault();
                if (curr != null) curr.IsChecked = false;
                item.IsChecked = true;
                SelectedList.Clear();
                SelectedList.Add(item);
                isShow = false;
                await Fire();
            }
            else
            {
                item.IsSelected = true;
                item.IsExpanded = true;
            }
        }

        //选中子节点
        private void CheckChildren(CascaderItem<TValue> item)
        {
            if (item.Disabled) return;
            if (item.Children.Count == 0)
            {
                item.IsChecked = true;
                SelectedList.Add(item);
            }
            else
            {
                foreach (var subItem in item.Children)
                {
                    CheckChildren(subItem);
                }
            }
        }

        //取消子节点选择
        private void UnCheckChildren(CascaderItem<TValue> item)
        {
            if (item.Disabled) return;
            item.IsChecked = false;
            SelectedList.Remove(item);

            foreach (var subItem in item.Children)
            {
                UnCheckChildren(subItem);
            }
        }

        //选中Checkbox
        private async Task Check(CascaderItem<TValue> item, bool cked)
        {
            if (item.Disabled) return;

            if (IsIsolated || item.Children.Count == 0)
            {
                //直接处理自己
                if (item.IsChecked)
                {
                    SelectedList.Remove(item);
                    item.IsChecked = false;
                }
                else
                {
                    SelectedList.Add(item);
                    item.IsChecked = true;
                }
            }
            else
            {
                //级联多选
                if (cked)
                {
                    //全选
                    CheckChildren(item);
                }
                else
                {
                    //取消
                    UnCheckChildren(item);
                }
            }

            await Fire();
        }

        //选中Radio
        private async Task CheckRadio(CascaderItem<TValue> item)
        {
            if (item.Disabled) return;
            foreach (var existsItems in SelectedList)
            {
                existsItems.IsChecked = false;
            }

            SelectedList.Clear();
            item.IsChecked = true;
            item.IsSelected = true;
            SelectedList.Add(item);
            await Fire();
        }

        //移除项
        private async Task Remove(CascaderItem<TValue> item)
        {
            item.IsSelected = false;
            item.IsChecked = false;
            SelectedList.Remove(item);
            await Fire();
        }

        /// <summary>
        /// 清空选中节点
        /// </summary>
        /// <returns></returns>
        public async Task ClearSelectedNodes()
        {
            foreach (var item in SelectedList)
            {
                item.IsSelected = false;
                item.IsChecked = false;
            }

            SelectedList.Clear();
            await Fire();
        }

        /// <summary>
        /// 切换显示状态
        /// </summary>
        public void Toggle(bool? visible = null)
        {
            isShow = visible ?? !isShow;
        }

        /// <summary>
        /// 获取选中节点
        /// </summary>
        /// <returns></returns>
        public HashSet<CascaderItem<TValue>> GetSelectedNodes()
        {
            return SelectedList;
        }

        /// <summary>
        /// 从json数据加载级联数据
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static List<CascaderItem<TValue>> BuildDataFromJson(string json)
        {
            var list = JsonSerializer.Deserialize<List<CascaderItem<TValue>>>(json, new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true
            });

            foreach (var item in list)
            {
                item.SetParent();
            }

            return list;
        }
    }
}