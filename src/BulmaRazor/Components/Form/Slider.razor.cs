using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 滑块组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Slider<TValue>
    {
        string Id = "slider_" + Guid.NewGuid().ToString("N");

        string classes => CssBuilder.Default("slider")
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-fullwidth", IsFullwidth)
            .AddClass("has-output", HasOutput)
            .AddClass("is-circle", IsCircle)
            .Build();

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
        /// 全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 圆形样式
        /// </summary>
        [Parameter]
        public bool IsCircle { get; set; }

        /// <summary>
        /// 是否显示值
        /// </summary>
        [Parameter]
        public bool HasOutput { get; set; }

        /// <summary>
        /// 绑定事件 onchange | oninput
        /// </summary>
        [Parameter]
        public string BindEvent { get; set; } = "onchange";

        /// <summary>
        /// 值，数字类型
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }


        /// <summary>
        /// Value 绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }


        private TValue ShowValue
        {
            get => Value;
            set
            {
                Value = value;
                ValueChanged.InvokeAsync(Value).GetAwaiter().GetResult();
            }
        }

        /// <summary>
        /// 设置参数
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns></returns>
        public override async Task SetParametersAsync(ParameterView parameters)
        {
            await base.SetParametersAsync(parameters);
            if (HasOutput) BindEvent = "oninput";
        }
    }
}