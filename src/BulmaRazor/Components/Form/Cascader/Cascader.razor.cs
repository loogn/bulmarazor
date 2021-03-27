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
    public partial class Cascader<TValue>
    {
        [Inject] private BulmaRazorJsInterop JsInterop { get; set; }

        readonly string Id = "cascader_" + Guid.NewGuid().ToString("N");

        string classes => CssBuilder.Default("input")
            .AddClass("cascader")
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

        [Parameter] public bool IsSmall { get; set; }
        [Parameter] public bool IsNormal { get; set; }
        [Parameter] public bool IsMedium { get; set; }
        [Parameter] public bool IsLarge { get; set; }
        [Parameter] public bool Clearable { get; set; }
        [Parameter] public bool IsMultiple { get; set; }
        [Parameter] public bool IsIsolated { get; set; }
        [Parameter] public bool IsRoundedTag { get; set; }
        [Parameter] public string Separator { get; set; } = "/";

        private IEnumerable<CascaderItem<TValue>> dataView = new List<CascaderItem<TValue>>();
        [Parameter] public IEnumerable<CascaderItem<TValue>> Data { get; set; }

        [Parameter] public string Placeholder { get; set; } = "请选择";
        [Parameter] public bool ShowAllLevels { get; set; } = true;
        [Parameter] public bool IsCollapseTags { get; set; }
        [Parameter] public RenderFragment<CascaderItem<TValue>> ItemSlot { get; set; }

        [Parameter] public EventCallback<Cascader<TValue>> OnChange { get; set; }

        [Parameter] public TValue Value { get; set; }

        [Parameter] public EventCallback<TValue> ValueChanged { get; set; }
        [Parameter] public HashSet<TValue> Values { get; set; }

        [Parameter] public EventCallback<HashSet<TValue>> ValuesChanged { get; set; }

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

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
            if (firstRender)
            {
                await JsInterop.BindClickWithoutSelf(Id);
            }
        }

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

        private void InitData()
        {
            if (Data != null)
            {
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
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            InitData();
        }

        protected override Task OnInitializedAsync()
        {
            // InitData();
            JSCallbackManager.AddEventHandler(Id, "clickWithoutSelf", new Action(() =>
            {
                isShow = false;
                StateHasChanged();
            }));
            return base.OnInitializedAsync();
        }

        protected override ValueTask DisposeAsync(bool disposing)
        {
            JSCallbackManager.DisposeObject(Id);
            return base.DisposeAsync(disposing);
        }

        public void Toggle()
        {
            isShow = !isShow;
        }

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

        private async Task SelectOne(IEnumerable<CascaderItem<TValue>> list, CascaderItem<TValue> item)
        {
            if (item.Disabled) return;

            foreach (var cascaderItem in list)
            {
                cascaderItem.IsOpen = false;
                cascaderItem.IsSelected = false;
                cascaderItem.Children.ForEach(x =>
                {
                    x.IsOpen = false;
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
                item.IsOpen = true;
            }
        }


        private void CheckChildren(CascaderItem<TValue> item)
        {
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

        private void UnCheckChildren(CascaderItem<TValue> item)
        {
            item.IsChecked = false;
            SelectedList.Remove(item);

            foreach (var subItem in item.Children)
            {
                UnCheckChildren(subItem);
            }
        }

        private async Task Check(CascaderItem<TValue> item, bool cked)
        {
            if(item.Disabled) return;
            
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
                    //取消
                    UnCheckChildren(item);
                }
                else
                {
                    //全选
                    CheckChildren(item);
                }
            }

            await Fire();
        }

        private async Task CheckRadio(CascaderItem<TValue> item)
        {
            if(item.Disabled) return;
            foreach (var existsItems in SelectedList)
            {
                existsItems.IsChecked = false;
                // existsItems.IsSelected = false;
            }

            SelectedList.Clear();
            item.IsChecked = true;
            item.IsSelected = true;
            SelectedList.Add(item);
            await Fire();
        }

        private async Task Remove(CascaderItem<TValue> item)
        {
            item.IsSelected = false;
            item.IsChecked = false;
            SelectedList.Remove(item);
            await Fire();
        }

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

        public HashSet<CascaderItem<TValue>> GetSelectedNodes()
        {
            return SelectedList;
        }

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