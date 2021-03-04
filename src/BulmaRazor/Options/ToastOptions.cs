using BulmaRazor.Utils;

namespace BulmaRazor.Components
{
    public class ToastAnimate
    {
        public ToastAnimate(string _in, string _out)
        {
            @in = _in;
            @out = _out;

        }
        public string @in { get; set; }
        public string @out { get; set; }
    };

    public class ToastOptions
    {
        /// <summary>
        /// 消息，必填
        /// </summary>
        public string Message { get; set; }

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
        /// 是否有关闭按钮，默认false
        /// </summary>
        public bool? Dismissible { get; set; }

        /// <summary>
        /// 鼠标Hover时是否延迟显示,默认false
        /// </summary>
        public bool? PauseOnHover { get; set; }

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

        public JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.ToastOptions;
            ps.AddNotNull("message", Message ?? def.Message);

            ps.AddNotNull("type", Color?.Value ?? def.Color?.Value);

            ps.AddNotNull("duration", Duration ?? def.Duration);

            ps.AddNotNull("position", Position ?? def.Position);

            ps.AddNotNull("dismissible", Dismissible ?? def.Dismissible);

            ps.AddNotNull("pauseOnHover", PauseOnHover ?? def.PauseOnHover);

            ps.AddNotNull("closeOnClick", CloseOnClick ?? def.CloseOnClick);

            ps.AddNotNull("opacity", Opacity ?? def.Opacity);

            ps.AddNotNull("animate", Animate ?? def.Animate);

            return ps;
        }
    }
}