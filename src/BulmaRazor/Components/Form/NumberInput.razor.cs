using System;
using System.Collections;
using System.Collections.Generic;
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
            // .AddClass("is-hovered", IsHovered)
            // .AddClass("is-focused", IsFocused)
            // .AddClass("is-static", IsStatic)
            .Build();

        private string format;


        /// <summary>
        /// 颜色
        /// </summary>
        [Parameter]
        public Color Color { get; set; } = Color.Default;

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

        [Parameter] public TValue? Max { get; set; }
        [Parameter] public TValue? Min { get; set; }

        [Parameter] public TValue Step { get; set; } = (TValue) Convert.ChangeType(1, typeof(TValue));

        [Parameter] public bool IsStrictStep { get; set; }

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
                SetValue(Dec(val));
            }
        }

        private void SetValue(decimal val)
        {
            if (IsStrictStep)
            {
                var dstep = Dec(Step);
                if (dstep != 0)
                {
                    if (val % dstep != 0)
                    {
                        return;
                    }
                }
            }

            if (Min.HasValue && Dec(Min.Value) > val) return;
            if (Max.HasValue && Dec(Max.Value) < val) return;

            Value = (TValue) Convert.ChangeType(val, typeof(TValue));
            Fire();
        }

        private async Task Fire()
        {
            await ValueChanged.InvokeAsync(Value);
            await OnChanged.InvokeAsync(Value);
        }

        private async Task Increase()
        {
            var val = Dec(Value) + Dec(Step);
            SetValue(val);
        }

        private async Task Reduce()
        {
            var val = Dec(Value) - Dec(Step);

            SetValue(val);
        }

        private decimal Dec(TValue val)
        {
            return Convert.ToDecimal(val);
        }

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