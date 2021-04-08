using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 穿梭框组件
    /// </summary>
    /// <typeparam name="TItem"></typeparam>
    public partial class Transfer<TItem>
    {
        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();
        private List<TransferItem<TItem>> leftView = new();
        private List<TransferItem<TItem>> rightView = new();

        private bool? leftAll = false;
        private bool? rightAll=false;
        private int leftCount;
        private int rightCount;
        private string leftWord;
        private string rightWord;

        private string ulStyle =>
            $"min-height: {MinHeight}px; max-height: {MaxHeight}px;margin:0;padding-top:0.5rem;width:100%; overflow: hidden;overflow-y: auto";

        /// <summary>
        /// 左侧数据
        /// </summary>

        [Parameter]
        public IEnumerable<TItem> LeftData { get; set; }

        /// <summary>
        /// 右侧数据
        /// </summary>
        [Parameter]
        public IEnumerable<TItem> RightData { get; set; }

        /// <summary>
        /// 是否可过滤
        /// </summary>
        [Parameter]
        public bool Filterable { get; set; }

        /// <summary>
        /// 过滤搜索占位符
        /// </summary>
        [Parameter]
        public string FilterPlaceholder { get; set; } = "请输入搜索内容";

        /// <summary>
        /// 过滤函数
        /// </summary>
        [Parameter]
        public Func<TItem, string, bool> FilterFunc { get; set; }

        /// <summary>
        /// 左标题 默认：列表1
        /// </summary>
        [Parameter]
        public string LeftTitle { get; set; } = "列表1";

        /// <summary>
        /// 右标题 默认：列表2
        /// </summary>
        [Parameter]
        public string RightTitle { get; set; } = "列表2";

        /// <summary>
        /// 显示属性
        /// </summary>
        [Parameter]
        public string ShowProp { get; set; }

        /// <summary>
        /// 格式，支持日期和数字
        /// </summary>
        [Parameter]
        public string Format { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Info;

        /// <summary>
        /// 自定义显示函数
        /// </summary>
        [Parameter]
        public Func<TItem, string> ShowValueFunc { get; set; }

        /// <summary>
        /// 左侧脚部卡槽
        /// </summary>
        [Parameter]
        public RenderFragment LeftFooterSlot { get; set; }

        /// <summary>
        /// 右侧脚部卡槽
        /// </summary>
        [Parameter]
        public RenderFragment RightFooterSlot { get; set; }

        /// <summary>
        /// 最小高度 默认260
        /// </summary>
        [Parameter]
        public int MinHeight { get; set; } = 260;

        /// <summary>
        /// 最大高度 默认260
        /// </summary>
        [Parameter]
        public int MaxHeight { get; set; } = 260;

        /// <summary>
        /// 左移按钮文本
        /// </summary>
        [Parameter]
        public string LeftButtonText { get; set; }

        /// <summary>
        /// 右移按钮文本
        /// </summary>
        [Parameter]
        public string RightButtonText { get; set; }

        /// <summary>
        /// 改变事件
        /// </summary>
        [Parameter]
        public EventCallback<Transfer<TItem>> OnChange { get; set; }

        private void ItemCheckChange(TransferItem<TItem> item)
        {
            item.IsChecked = !item.IsChecked;
            DealCheckBoxStatus();
        }

        private void Trans(List<TransferItem<TItem>> from, List<TransferItem<TItem>> to)
        {
            var list = from.Where(x => x.IsChecked && !x.IsHidden).ToList();
            foreach (var item in list)
            {
                from.Remove(item);
                item.IsChecked = false;
                to.Add(item);
            }

            if (list.Count > 0)
            {
                OnChange.InvokeAsync(this);
            }

            DealCheckBoxStatus();
        }

        private void CheckAll(int type, bool ischeck)
        {
            Action<TransferItem<TItem>> dealAction = (x) =>
            {
                if (ischeck)
                {
                    if (!x.IsHidden)
                    {
                        x.IsChecked = true;
                    }
                }
                else
                {
                    x.IsChecked = false;
                }
            };
            if (type == 1)
            {
                leftView.ForEach(dealAction);
            }
            else
            {
                rightView.ForEach(dealAction);
            }

            DealCheckBoxStatus();
        }

        private void DealCheckBoxStatus()
        {
            leftCount = leftView.Count(x => x.IsChecked);

            if (leftCount == 0)
            {
                leftAll = false;
            }
            else if (leftCount >= leftView.Count(x => !x.IsHidden))
            {
                leftAll = true;
            }
            else
            {
                leftAll = null;
            }

            rightCount = rightView.Count(x => x.IsChecked);
            if (rightCount == 0)
            {
                rightAll = false;
            }
            else if (rightCount >= rightView.Count(x => !x.IsHidden))
            {
                rightAll = true;
            }
            else
            {
                rightAll = null;
            }

            StateHasChanged();
        }

        private void leftWordChange()
        {
            foreach (var item in leftView)
            {
                if (leftWord.NoValue() ||
                    (FilterFunc?.Invoke(item.Item,
                        leftWord) ?? item.ShowValue.Contains(leftWord, StringComparison.OrdinalIgnoreCase)))
                {
                    item.IsHidden = false;
                }
                else
                {
                    item.IsHidden = true;
                }
            }

            DealCheckBoxStatus();
        }

        private void rightWordChange()
        {
            foreach (var item in rightView)
            {
                if (rightWord.NoValue() ||
                    (FilterFunc?.Invoke(item.Item, rightWord) ??
                     item.ShowValue.Contains(rightWord, StringComparison.OrdinalIgnoreCase))
                )
                {
                    item.IsHidden = false;
                }
                else
                {
                    item.IsHidden = true;
                }
            }

            DealCheckBoxStatus();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void OnInitialized()
        {
            base.OnInitialized();
            FillView(LeftData, leftView);
            FillView(RightData, rightView);
        }

        private void FillView(IEnumerable<TItem> data, List<TransferItem<TItem>> view)
        {
            if (data != null)
            {
                foreach (var item in data)
                {
                    var titem = new TransferItem<TItem>()
                    {
                        Item = item
                    };

                    if (ShowValueFunc != null)
                    {
                        titem.ShowValue = ShowValueFunc(item);
                    }
                    else
                    {
                        if (ShowProp.HasValue())
                        {
                            TypeCachedInfo<TItem>.Accessor accessor = typeCachedInfo.GetAccessor(ShowProp);
                            titem.ShowValue = ExtendMethods.GetShowValue(accessor.prop.PropertyType, accessor.Get(item),
                                Format);
                        }
                        else
                        {
                            titem.ShowValue = ExtendMethods.GetShowValue(typeof(TItem), item, Format);
                        }
                    }

                    view.Add(titem);
                }
            }
        }


        /// <summary>
        /// 清空某个面板的搜索关键词
        /// </summary>
        /// <param name="panelName"></param>
        public void ClearQuery(string panelName = null)
        {
            if (panelName == "left")
            {
                leftWord = "";
            }
            else if (panelName == "right")
            {
                rightWord = "";
            }
        }


        /// <summary>
        /// 获取左侧数据
        /// </summary>
        /// <returns></returns>
        public List<TItem> GetLeftData()
        {
            return leftView.Select(x => x.Item).ToList();
        }

        /// <summary>
        /// 获取右侧数据
        /// </summary>
        /// <returns></returns>
        public List<TItem> GetRightData()
        {
            return rightView.Select(x => x.Item).ToList();
        }
    }
}