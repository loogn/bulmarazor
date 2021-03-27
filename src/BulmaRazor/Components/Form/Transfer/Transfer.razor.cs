using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace BulmaRazor.Components
{
    public partial class Transfer<TItem>
    {
        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();
        private List<TransferItem<TItem>> leftView = new();
        private List<TransferItem<TItem>> rightView = new();
        
        private bool? leftAll=false;
        private bool? rightAll;
        private int leftCount;
        private int rightCount;
        private string leftWord;
        private string rightWord;

        private string ulStyle =>
            $"min-height: {MinHeight}px; max-height: {MaxHeight}px;margin:0; width:100%; overflow: hidden;overflow-y: auto";

        /// <summary>
        /// 数据源
        /// </summary>

        [Parameter]
        public IEnumerable<TItem> LeftData { get; set; }

        [Parameter] public IEnumerable<TItem> RightData { get; set; }

        [Parameter] public bool Filterable { get; set; }

        [Parameter] public string FilterPlaceholder { get; set; } = "请输入搜索内容";
        [Parameter] public Func<TItem, string, bool> FilterFunc { get; set; }
        [Parameter] public string LeftTitle { get; set; } = "列表1";
        [Parameter] public string RightTitle { get; set; } = "列表2";

        [Parameter] public string ShowProp { get; set; }
        [Parameter] public string Format { get; set; }
        [Parameter] public Color Color { get; set; } = Color.Link;

        [Parameter] public Func<TItem, string> ShowFunc { get; set; }

        [Parameter] public RenderFragment LeftFooterSlot { get; set; }
        [Parameter] public RenderFragment RightFooterSlot { get; set; }

        [Parameter] public int MinHeight { get; set; } = 150;
        [Parameter] public int MaxHeight { get; set; } = 250;
        [Parameter] public string LeftButtonText { get; set; }
        [Parameter] public string RightButtonText { get; set; }

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
                OnChange?.Invoke(this);
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

                    if (ShowFunc != null)
                    {
                        titem.ShowValue = ShowFunc(item);
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

        [Parameter] public Action<Transfer<TItem>> OnChange { get; set; }

        public List<TItem> GetLeftData()
        {
            return leftView.Select(x => x.Item).ToList();
        }

        public List<TItem> GetRightData()
        {
            return rightView.Select(x => x.Item).ToList();
        }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
        }
    }
}