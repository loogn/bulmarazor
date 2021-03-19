using System.Collections.Generic;
using System.Threading.Tasks;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public partial class Transfer<TItem, TValue>
    {
        private TypeCachedInfo<TItem> typeCachedInfo = TypeCachedDict.GetTypeCachedInfo<TItem>();
        private List<TransferItem<TItem>> dataView; //数据视图
        private string panelWidth = "41%";

        /// <summary>
        /// 数据源
        /// </summary>

        [Parameter]
        public IEnumerable<TItem> Data { get; set; }

        [Parameter] public string Prop { get; set; }
        [Parameter] public string Format { get; set; }

        [Parameter] public int MinHeight { get; set; } = 150;
        [Parameter] public int MaxHeight { get; set; } = 300;

        [Parameter] public IEnumerable<TValue> Value { get; set; }

        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);

            dataView = new List<TransferItem<TItem>>();

            if (Data != null)
            {
                foreach (var item in Data)
                {
                    var titem = new TransferItem<TItem>()
                    {
                        //IsSelected =
                        Item = item
                    };
                    if (Prop.HasValue())
                    {
                        TypeCachedInfo<TItem>.Accessor accessor = typeCachedInfo.GetAccessor(Prop);
                        titem.Value = accessor.Get(item);
                        titem.Type = accessor.prop.PropertyType;
                    }
                    else
                    {
                        titem.Value = item;
                        titem.Type = typeof(TItem);
                    }

                    titem.ShowValue = ExtendMethods.GetShowValue(titem.Type, titem.Value, Format);

                    dataView.Add(titem);
                }
            }

            // DealView();
        }
    }
}