using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;


namespace BulmaRazor.Components
{
    /// <summary>
    /// 树形组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Tree<TValue>
    {
        readonly string Id = "tree_" + Guid.NewGuid().ToString("N");

        [Inject] private BulmaRazorJsInterop JsInterop { get; set; }
        private TreeItem<TValue> CurrentSelected;
        private IEnumerable<TreeItem<TValue>> dataView = new List<TreeItem<TValue>>();
        private HashSet<TreeItem<TValue>> SelectedList = new();

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
        /// 是否手风琴模式
        /// </summary>
        [Parameter]
        public bool IsAccordion { get; set; }

        /// <summary>
        /// 是否点击节点展开，默认true
        /// </summary>
        [Parameter]
        public bool ExpandOnClickNode { get; set; } = true;

        /// <summary>
        /// 是否点击节点就选中
        /// </summary>
        [Parameter]
        public bool CheckOnClickNode { get; set; }

        /// <summary>
        /// 是否孤立选择
        /// </summary>
        [Parameter]
        public bool IsIsolated { get; set; }


        /// <summary>
        /// 数据源
        /// </summary>
        [Parameter]
        public IEnumerable<TreeItem<TValue>> Data { get; set; }

        /// <summary>
        /// 是否显示复选框
        /// </summary>
        [Parameter]
        public bool ShowCheckBox { get; set; }

        /// <summary>
        /// Item卡槽
        /// </summary>
        [Parameter]
        public RenderFragment<TreeItem<TValue>> ItemSlot { get; set; }

        /// <summary>
        /// Item点击事件
        /// </summary>
        [Parameter]
        public EventCallback<TreeItem<TValue>> OnItemClick { get; set; }

        /// <summary>
        /// CheckBox点击事件
        /// </summary>
        [Parameter]
        public EventCallback<TreeItem<TValue>> OnCheckClick { get; set; }

        /// <summary>
        /// 选中节点变化事件
        /// </summary>
        [Parameter]
        public EventCallback<Tree<TValue>> OnChange { get; set; }

        /// <summary>
        /// 选中节点值
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
            Values = new HashSet<TValue>(SelectedList.Select(x => x.Value));
            await ValuesChanged.InvokeAsync(Values);
            await OnChange.InvokeAsync(this);
        }

        //选中值
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

        //初始化数据
        private void InitData()
        {
            if (Data == null) return;
            SelectedList.Clear();
            if (Values != null && Values.Any())
            {
                var values = Values;
                foreach (var item in Data)
                {
                    CheckValues(item, values, 0);
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

        //单击节点
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

            await OnItemClick.InvokeAsync(item);
        }

        //选中子节点
        private void CheckChildren(TreeItem<TValue> item)
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

        //取消选中子节点
        private void UnCheckChildren(TreeItem<TValue> item)
        {
            if (item.Disabled) return;
            item.IsChecked = false;
            SelectedList.Remove(item);

            foreach (var subItem in item.Children)
            {
                UnCheckChildren(subItem);
            }
        }

        //选中CheckBox
        private async Task Check(TreeItem<TValue> item, bool cked)
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

            await OnCheckClick.InvokeAsync(item);

            await Fire();
        }

        /// <summary>
        /// 情况选中节点
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
        /// 获取选中节点
        /// </summary>
        /// <returns></returns>
        public HashSet<TreeItem<TValue>> GetSelectedNodes()
        {
            return SelectedList;
        }

        // public void Remove(TreeItem<TValue> item)
        // {
        //     SelectedList.Remove(item);
        //     if (item.Parent != null)
        //     {
        //         item.Parent.Children.Remove(item);
        //         item.Parent = null;
        //     }
        //     else
        //     {
        //     }
        // }
        // insertBefore
        // insertAfter
        
        //Expand/collapse 

        /// <summary>
        /// 
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
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