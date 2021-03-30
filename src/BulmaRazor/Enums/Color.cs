using System;
using System.Collections.Generic;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 主体颜色
    /// </summary>
    public class Color : EnumBase
    {

        private Color(string value) : base(value)
        {
        }

        /// <summary>
        /// 默认
        /// </summary>
        public static readonly Color Default = new("");

        /// <summary>
        /// 白色
        /// </summary>
        public static readonly Color White = new("is-white");
        /// <summary>
        /// 黑色
        /// </summary>
        public static readonly Color Black = new("is-black");
        /// <summary>
        /// 浅色
        /// </summary>
        public static readonly Color Light = new("is-light");
        /// <summary>
        /// 深色
        /// </summary>
        public static readonly Color Dark = new("is-dark");
        /// <summary>
        /// 主色
        /// </summary>
        public static readonly Color Primary = new("is-primary");
        /// <summary>
        /// 链接色
        /// </summary>
        public static readonly Color Link = new("is-link");
        /// <summary>
        /// 信息色
        /// </summary>
        public static readonly Color Info = new("is-info");
        /// <summary>
        /// 成功色
        /// </summary>
        public static readonly Color Success = new("is-success");
        /// <summary>
        /// 警告色
        /// </summary>
        public static readonly Color Warning = new("is-warning");
        /// <summary>
        /// 危险色
        /// </summary>
        public static readonly Color Danger = new("is-danger");

        /// <summary>
        /// 幽灵色
        /// </summary>
        public static Color Ghost = new("is-ghost");
        /// <summary>
        /// 转换成 TextColor 类
        /// </summary>
        /// <returns></returns>
        public string ToTextColor()
        {
            return Value.Replace("is-", "has-text-");
        }
        
        

    }
}
