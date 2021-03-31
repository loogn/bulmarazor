using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// Select Option
    /// </summary>
    /// <typeparam name="TValue"></typeparam>
    public partial class Option<TValue>
    {
        string classes => CssBuilder.Default("")
            .AddClassFromAttributes(Attributes)
            .Build();

        private string ShowValue => ExtendMethods.GetShowValue(Value, string.Empty);

        private ElementReference opt;
        /// <summary>
        /// 是否选中
        /// </summary>
        [Parameter] public bool Selected { get; set; }


        /// <summary>
        /// 值
        /// </summary>
        [Parameter]
        public TValue Value { get; set; }


        /// <summary>
        /// 父组件 Select
        /// </summary>
        [CascadingParameter]
        public Select<TValue> Parent { get; set; }

        /// <summary>
        /// 子内容
        /// </summary>
        [Parameter]
        public RenderFragment ChildContent { get; set; }
        
        internal void SetSelected(bool ck)
        {
            Selected = ck;
            StateHasChanged();
        }

        /// <summary>
        /// 初始化
        /// </summary>
        /// <exception cref="ArgumentException"></exception>
        protected override void OnInitialized()
        {
            if (Parent == null) throw new ArgumentException("Option必须是Select的子组件");
            base.OnInitialized();

            Parent.AddItem(this);
            if (Parent.Value != null)
            {
                Selected = Parent.Value.Equals(Value);
            }
        }
    }
}