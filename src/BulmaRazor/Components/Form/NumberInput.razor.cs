using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 计数器
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class NumberInput<TValue> where TValue : struct, IComparable, IComparable<TValue>, IEquatable<TValue>
    {
        /// <summary>
        /// 
        /// </summary>
        private string classes => CssBuilder.Default("field")
            .AddClassFromAttributes(Attributes)
            .AddClass("has-addons")
            .AddClass(Color.Value, Color.Value)
            .Build();

        private string elementClasses => CssBuilder.Default("")
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-outlined", IsOutlined)
            .Build();

        private string format;


        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;

        /// <summary>
        /// 轮廓样式
        /// </summary>
        [Parameter] public bool IsOutlined { get; set; }

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
        /// 是否禁用
        /// </summary>
        [Parameter]
        public bool Disabled { get; set; }

        /// <summary>
        /// 绑定事件 onchange | oninput
        /// </summary>

        [Parameter]
        public string BindEvent { get; set; } = "onchange";

        /// <summary>
        /// 最大值
        /// </summary>
        [Parameter] public TValue? Max { get; set; }
        /// <summary>
        /// 最小值
        /// </summary>
        [Parameter] public TValue? Min { get; set; }

        /// <summary>
        /// 步长 默认1
        /// </summary>
        [Parameter] public TValue Step { get; set; } = (TValue) Convert.ChangeType(1, typeof(TValue));

        /// <summary>
        /// 是否严格步长
        /// </summary>
        [Parameter] public bool IsStrictStep { get; set; }

        /// <summary>
        /// 精度，小数位
        /// </summary>
        [Parameter] public int? Precision { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }

        /// <summary>
        /// 绑定值事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }

        /// <summary>
        /// 改变事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> OnChanged { get; set; }


        private string ShowValue
        {
            get => ExtendMethods.GetShowValue(Value, format);
            set
            {
                if (!value.SetRealValue(out TValue val)) return;
                SetValue(Dec(val)).GetAwaiter().GetResult();
            }
        }

        private async Task SetValue(decimal val)
        {
            if (IsStrictStep)
            {
                var dec_step = Dec(Step);
                if (dec_step != 0)
                {
                    if (val % dec_step != 0)
                    {
                        return;
                    }
                }
            }

            if (Min.HasValue && Dec(Min.Value) > val) return;
            if (Max.HasValue && Dec(Max.Value) < val) return;

            Value = (TValue) Convert.ChangeType(val, typeof(TValue));
            await Fire();
        }

        private async Task Fire()
        {
            await ValueChanged.InvokeAsync(Value);
            await OnChanged.InvokeAsync(Value);
        }

        private async Task Increase()
        {
            var val = Dec(Value) + Dec(Step);
            await SetValue(val);
        }

        private async Task Reduce()
        {
            var val = Dec(Value) - Dec(Step);

            await SetValue(val);
        }

        private decimal Dec(TValue val)
        {
            return Convert.ToDecimal(val);
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (Precision >= 1)
            {
                format = "0." + new string('0', Precision.Value);
            }
        }
    }
}