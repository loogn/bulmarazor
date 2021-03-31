using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Radio 组件
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Radio<TValue>
    {
        string id = "radio_" + Guid.NewGuid().ToString("N");
        private string name;
        private bool _checked;

        string classes => CssBuilder.Default("is-checkradio")
            .AddClassFromAttributes(Attributes)
            .AddClass(B.Invisible)
            .AddClass("is-rtl", IsRTL)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .Build();

        /// <summary>
        /// 从右到左
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
        /// 是否选中
        /// </summary>
        [Parameter]
        public bool Checked { get; set; }

        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }
        
        /// <summary>
        /// Radios 父组件
        /// </summary>
        [CascadingParameter]
        public Radios<TValue> Parent { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        
        private async Task ChangeHandle(ChangeEventArgs e)
        {
            await Parent.UnCheckAll(Value);
            _checked = true;
        }

        internal void SetChecked(bool ck)
        {
            _checked = ck;
        }

        /// <summary>
        /// 初始化
        /// </summary>
        protected override void OnInitialized()
        {
            base.OnInitialized();
            Parent?.AddItem(this);
            name = Parent?.Name;

            if (Parent != null && Parent.Value != null && Parent.Value.Equals(Value))
            {
                _checked = true;
            }
            else
            {
                _checked = Checked;
            }
        }
    }
}