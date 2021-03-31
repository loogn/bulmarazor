using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 文件上传组件
    /// </summary>
    public partial class File
    {
        string classes => CssBuilder.Default("file")
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("has-name", HasName)
            .AddClass("is-fullwidth", IsFullwidth)
            .AddClass("is-centered", IsCentered)
            .AddClass("is-right", IsRight)
            .AddClass("is-boxed", IsBoxed)
            .Build();

        private string name = "";

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
        /// 是否显示名称
        /// </summary>
        [Parameter]
        public bool HasName { get; set; }

        /// <summary>
        /// 居中
        /// </summary>
        [Parameter]
        public bool IsCentered { get; set; }

        /// <summary>
        /// 靠右
        /// </summary>
        [Parameter]
        public bool IsRight { get; set; }

        /// <summary>
        /// 全宽
        /// </summary>
        [Parameter]
        public bool IsFullwidth { get; set; }

        /// <summary>
        /// 方块外观
        /// </summary>
        [Parameter]
        public bool IsBoxed { get; set; }

        /// <summary>
        /// 显示文本
        /// </summary>
        [Parameter]
        public string Label { get; set; } = "选择文件";

        /// <summary>
        /// 是否允许多文件上传
        /// </summary>
        [Parameter]
        public bool Multiple { get; set; }

        /// <summary>
        /// 上传最大数量
        /// </summary>
        [Parameter]
        public int MaxCount { get; set; } = 1;

        /// <summary>
        /// 默认名称
        /// </summary>
        [Parameter]
        public string DefaultName { get; set; } = "没有文件";

        /// <summary>
        /// 上传图标类名
        /// </summary>
        [Parameter]
        public string IconClass { get; set; } = "fa fa-upload";

        private async Task ChangeHandle(InputFileChangeEventArgs e)
        {
            if (e.FileCount > MaxCount)
            {
                return;
            }

            name = e.File.Name;
            await OnChange.InvokeAsync(e);
        }

        /// <summary>
        /// change事件
        /// </summary>
        [Parameter]
        public EventCallback<InputFileChangeEventArgs> OnChange { get; set; }

        /// <summary>
        /// 初始化操作
        /// </summary>
        protected override void OnInitialized()
        {
            base.OnInitialized();
            name = DefaultName;
        }
    }
}