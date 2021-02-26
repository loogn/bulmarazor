namespace BulmaRazor.Components
{
    public class ToastConfig
    {
        internal ToastConfig()
        {
        }

        /// <summary>
        /// 颜色，对应type
        /// </summary>
        public Color Color { get; set; }

        /// <summary>
        /// 消息显示时间，默认2000毫秒
        /// </summary>
        public int? Duration { get; set; }

        /// <summary>
        /// 默认top-center,位置:top-left, top-center, top-right, center,
        /// bottom-left, bottom-center,  bottom-right.
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// 点击是否销毁，默认true
        /// </summary>
        public bool? CloseOnClick { get; set; }

        /// <summary>
        /// 通知容器是否透明，默认1
        /// </summary>
        public double? Opacity { get; set; }

        /// <summary>
        /// 动画，使用animate.css,请自行引用 https://animate.style/
        /// </summary>
        public ToastAnimate Animate { get; set; }

        // public bool single { get; set; } = false;
        // public int offsetTop { get; set; }
        // public int offsetBottom{ get; set; }
        // public int offsetLeft{ get; set; }
        // public int offsetRight{ get; set; }
    }
}