using System;
namespace BulmaRazor.Components
{
    /// <summary>
    /// Column 偏移
    /// </summary>
    public class Offset : EnumBase
    {

        private Offset(string value) : base(value)
        {
        }

        /// <summary>
        /// 默认
        /// </summary>
        public static Offset Default = new Offset("");

        /// <summary>
        /// 五分之一
        /// </summary>
        public static Offset OneFifth = new Offset("is-offset-one-fifth");

        /// <summary>
        /// 四分之一
        /// </summary>
        public static Offset OneQuarter = new Offset("is-offset-one-quarter");

        /// <summary>
        /// 三分之一
        /// </summary>
        public static Offset OneThird = new Offset("is-offset-one-third");

        /// <summary>
        /// 五分之二
        /// </summary>
        public static Offset TwoFifths = new Offset("is-offset-two-fifths");

        /// <summary>
        /// 二分之一
        /// </summary>
        public static Offset Half = new Offset("is-offset-half");

        /// <summary>
        /// 五分之三
        /// </summary>
        public static Offset ThreeFifths = new Offset("is-offset-three-fifths");

        /// <summary>
        /// 三分之二
        /// </summary>
        public static Offset TwoThirds = new Offset("is-offset-two-thirds");

        /// <summary>
        /// 四分之三
        /// </summary>
        public static Offset ThreeQuarters = new Offset("is-offset-three-quarters");

        /// <summary>
        /// 五分之四
        /// </summary>
        public static Offset FourFifths = new Offset("is-offset-four-fifths");

        ///// <summary>
        ///// 百分之百
        ///// </summary>
        //public static ColumnOffset Full = new ColumnOffset("is-offset-full");


        public static Offset Offset1 = new Offset("is-offset-1");
        public static Offset Offset2 = new Offset("is-offset-2");
        public static Offset Offset3 = new Offset("is-offset-3");
        public static Offset Offset4 = new Offset("is-offset-4");
        public static Offset Offset5 = new Offset("is-offset-5");
        public static Offset Offset6 = new Offset("is-offset-6");
        public static Offset Offset7 = new Offset("is-offset-7");
        public static Offset Offset8 = new Offset("is-offset-8");
        public static Offset Offset9 = new Offset("is-offset-9");
        public static Offset Offset10 = new Offset("is-offset-10");
        public static Offset Offset11 = new Offset("is-offset-11");
        public static Offset Offset12 = new Offset("is-offset-12");



    }
}
