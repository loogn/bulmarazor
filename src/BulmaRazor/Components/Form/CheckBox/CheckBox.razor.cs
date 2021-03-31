using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// CheckBox 组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class CheckBox<TValue>
    {
        string classes => CssBuilder.Default("is-checkradio")
            .AddClassFromAttributes(Attributes)
            .AddClass(B.Invisible)
            .AddClass("is-rtl", IsRTL)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-circle", IsCircle)
            .AddClass("is-block", IsBlock)
            .AddClass("has-no-border", HasNoBorder)
            .AddClass("has-background-color", HasBackgroundColor)
            .Build();

        string id = "check_" + Guid.NewGuid().ToString("N");

        [Inject] private BulmaRazorJsInterop JsInterop { get; set; }

        /// <summary>
        /// 是否从右到左
        /// </summary>
        [Parameter]
        public bool IsRTL { get; set; }

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
        /// 圆形样式
        /// </summary>
        [Parameter]
        public bool IsCircle { get; set; }

        /// <summary>
        /// 块状样式
        /// </summary>
        [Parameter]
        public bool IsBlock { get; set; }

        /// <summary>
        /// 无边框样式
        /// </summary>
        [Parameter]
        public bool HasNoBorder { get; set; }

        /// <summary>
        /// 背景色样式
        /// </summary>
        [Parameter]
        public bool HasBackgroundColor { get; set; }


        /// <summary>
        /// 选中状态
        /// </summary>
        [Parameter]
        public bool Checked { get; set; }

        /// <summary>
        /// 选中状态绑定事件
        /// </summary>
        [Parameter]
        public EventCallback<bool> CheckedChanged { get; set; }

        /// <summary>
        /// 选中状态改变事件
        /// </summary>

        [Parameter]
        public EventCallback<bool> OnChanged { get; set; }


        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }

        /// <summary>
        /// checkboxes
        /// </summary>
        [CascadingParameter]
        public CheckBoxes<TValue> Parent { get; set; }

        /// <summary>
        /// 子内容，label文字
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }

        private async Task ChangeHandle(ChangeEventArgs e)
        {
            Checked = !Checked;
            if (Parent != null)
            {
                await Parent.CheckTagger(Checked, Value);
            }

            await CheckedChanged.InvokeAsync(Checked);
            await OnChanged.InvokeAsync(Checked);
        }

        public void SetChecked(bool ck)
        {
            Checked = ck;
        }

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void OnInitialized()
        {
            base.OnInitialized();
            if (Parent == null) return;

            Parent.AddItem(this);
            if (Parent.Values != null && Parent.Values.Contains(Value))
            {
                Checked = true;
            }
        }
    }
}