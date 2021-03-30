using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;


namespace BulmaRazor.Components
{
    public partial class Tree<TValue>
    {
        readonly string Id = "tree_" + Guid.NewGuid().ToString("N");

        [Inject] private BulmaRazorJsInterop JsInterop { get; set; }
        private TreeItem<TValue> CurrentSelected;

        string classes => CssBuilder.Default("tree")
            // .AddClass("is-small", IsSmall)
            // .AddClass("is-normal", IsNormal)
            // .AddClass("is-medium", IsMedium)
            // .AddClass("is-large", IsLarge)
            .AddClassFromAttributes(Attributes)
            .Build();


        private string GetItemCls(TreeItem<TValue> item)
        {
            return CssBuilder.Default("tree-item")
                .AddClass("active", item.IsSelected)
                .AddClass("is-disabled", item.Disabled)
                .AddClass(B.Clickable, !item.Disabled)
                .Build();
        }

        private string GetListCls(TreeItem<TValue> item)
        {
            return CssBuilder.Default("tree-list")
                .AddClass("show", item.IsExpanded)

                // .AddClass(B.Clickable, !item.Disabled)
                .Build();
        }

        private string GetCheckCls(TreeItem<TValue> item)
        {
            return CssBuilder.Default("cb")
                .AddClass("active", item.GetHasChildrenChecked())
                .Build();
        }

        private bool? GetItemChecked(TreeItem<TValue> item)
        {
            if (!IsIsolated && item.Children.Any())
            {
                return item.GetCheckedStatus();
            }

            return item.IsChecked;
        }
       
        
        private HashSet<TreeItem<TValue>> SelectedList = new();

        [Parameter] public bool IsSmall { get; set; }
        [Parameter] public bool IsNormal { get; set; }
        [Parameter] public bool IsMedium { get; set; }
        [Parameter] public bool IsLarge { get; set; }

        [Parameter] public bool IsAccordion { get; set; }
        [Parameter] public bool ExpandOnClickNode { get; set; } = true;
        [Parameter] public bool CheckOnClickNode { get; set; }
        [Parameter] public bool IsIsolated { get; set; }

        private IEnumerable<TreeItem<TValue>> dataView = new List<TreeItem<TValue>>();
        [Parameter] public IEnumerable<TreeItem<TValue>> Data { get; set; }
        [Parameter] public bool ShowCheckBox { get; set; }

        [Parameter] public RenderFragment<TreeItem<TValue>> ItemSlot { get; set; }

        [Parameter] public Action<TreeItem<TValue>> OnItemClick { get; set; }
        [Parameter] public Action<TreeItem<TValue>> OnCheckClick { get; set; }

        [Parameter] public EventCallback<Tree<TValue>> OnChange { get; set; }

        [Parameter] public HashSet<TValue> Values { get; set; }

        [Parameter] public EventCallback<HashSet<TValue>> ValuesChanged { get; set; }

        private async Task Fire()
        {
            Values = new HashSet<TValue>(SelectedList.Select(x => x.Value));
            await ValuesChanged.InvokeAsync(Values);
            // await OnChange.InvokeAsync(this);
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            await base.OnAfterRenderAsync(firstRender);
        }

        private void CheckValues(TreeItem<TValue> item, HashSet<TValue> values, int level)
        {
            if (values.Contains(item.Value))
            {
                item.IsChecked = true;
                
                if (IsIsolated || item.Children.Count == 0)
                {
                    SelectedList.Add(item);
                }
            }

            item.Level = level;
            foreach (var subItem in item.Children)
            {
                CheckValues(subItem, values, level + 1);
            }
        }

        private void InitData()
        {
            if (Data != null)
            {
                SelectedList.Clear();
                HashSet<TValue> values = null;
                if (Values != null && Values.Any())
                {
                    values = Values;
                    foreach (var item in Data)
                    {
                        CheckValues(item, values, 0);
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
        
        private async Task ItemClick(TreeItem<TValue> item)
        {
            if (item.Disabled) return;
            if (CurrentSelected != null)
            {
                CurrentSelected.IsSelected = false;
            }

            CurrentSelected = item;

            //手风琴模式
            if (IsAccordion)
            {
                var list = item.Parent != null ? item.Parent.Children : Data;
                foreach (var treeNode in list)
                {
                    if (treeNode != item)
                    {
                        treeNode.IsExpanded = false;
                    }
                }
            }

            item.IsExpanded = !item.IsExpanded;
            item.IsSelected = true;
            
            OnItemClick?.Invoke(item);
        }

        private void CheckChildren(TreeItem<TValue> item)
        {
            if (item.Disabled) return;
            if (item.Children.Count == 0)
            {
                if (!item.Disabled)
                {
                    item.IsChecked = true;
                    SelectedList.Add(item);
                }
            }
            else
            {
                foreach (var subItem in item.Children)
                {
                    CheckChildren(subItem);
                }
            }
        }

        private void UnCheckChildren(TreeItem<TValue> item)
        {
            if (item.Disabled) return;
            if (!item.Disabled)
            {
                item.IsChecked = false;
                SelectedList.Remove(item);
            }

            foreach (var subItem in item.Children)
            {
                UnCheckChildren(subItem);
            }
        }

        private async Task Check(TreeItem<TValue> item, bool cked)
        {
            if (item.Disabled) return;
            if (IsIsolated ||  item.Children.Count == 0)
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

            OnCheckClick?.Invoke(item);

            await Fire();
        }


        private async Task Remove(TreeItem<TValue> item)
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

        public HashSet<TreeItem<TValue>> GetSelectedNodes()
        {
            return SelectedList;
        }

        public static List<TreeItem<TValue>> BuildDataFromJson(string json)
        {
            var list = JsonSerializer.Deserialize<List<TreeItem<TValue>>>(json, new JsonSerializerOptions()
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