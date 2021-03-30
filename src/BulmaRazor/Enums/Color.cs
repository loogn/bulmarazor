using System;
using System.Collections.Generic;

namespace BulmaRazor.Components
{
    public class Color : EnumBase
    {

        private Color(string value) : base(value)
        {
        }

        public static Color Default = new("");

        public static Color White = new("is-white");
        public static Color Black = new("is-black");
        public static Color Light = new("is-light");
        public static Color Dark = new("is-dark");
        public static Color Primary = new("is-primary");
        public static Color Link = new("is-link");
        public static Color Info = new("is-info");
        public static Color Success = new("is-success");
        public static Color Warning = new("is-warning");
        public static Color Danger = new("is-danger");

        /// <summary>
        /// 转换成 TextColor 类
        /// </summary>
        /// <returns></returns>
        public string ToTextColor()
        {
            return Value.Replace("is-", "has-text-");
        }
        
        public static Color Ghost = new("is-ghost");

    }
}
