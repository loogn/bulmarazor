using System;
#pragma warning disable 1591
namespace BulmaRazor.Components
{
    /// <summary>
    /// 大小
    /// </summary>
    public class Size : EnumBase
    {

        private Size(string value) : base(value)
        {
        }

        public static Size Default = new("");

        /// <summary>
        /// HeroSize
        /// </summary>
        public static Size FullHeight = new("is-fullheight");
        public static Size HalfHeight = new("is-halfheight");

        public static Size Size1 = new("is-1");
        public static Size Size2 = new("is-2");
        public static Size Size3 = new("is-3");
        public static Size Size4 = new("is-4");
        public static Size Size5 = new("is-5");
        public static Size Size6 = new("is-6");
        public static Size Size7 = new("is-7");
        public static Size Size8 = new("is-8");
        public static Size Size9 = new("is-9");
        public static Size Size10 = new("is-10");
        public static Size Size11 = new("is-11");
        public static Size Size12 = new("is-12");


        public static Size Square16 = new("is-16x16");
        public static Size Square24 = new("is-24x24");
        public static Size Square32 = new("is-32x32");
        public static Size Square48 = new("is-48x48");
        public static Size Square64 = new("is-64x64");
        public static Size Square96 = new("is-96x96");
        public static Size Square128 = new("is-128x128");




        /// <summary>
        /// 五分之一
        /// </summary>
        public static Size OneFifth = new("is-one-fifth");

        /// <summary>
        /// 四分之一
        /// </summary>
        public static Size OneQuarter = new("is-one-quarter");

        /// <summary>
        /// 三分之一
        /// </summary>
        public static Size OneThird = new("is-one-third");

        /// <summary>
        /// 五分之二
        /// </summary>
        public static Size TwoFifths = new("is-two-fifths");

        /// <summary>
        /// 二分之一
        /// </summary>
        public static Size Half = new("is-half");

        /// <summary>
        /// 五分之三
        /// </summary>
        public static Size ThreeFifths = new("is-three-fifths");

        /// <summary>
        /// 三分之二
        /// </summary>
        public static Size TwoThirds = new("is-two-thirds");

        /// <summary>
        /// 四分之三
        /// </summary>
        public static Size ThreeQuarters = new("is-three-quarters");

        /// <summary>
        /// 五分之四
        /// </summary>
        public static Size FourFifths = new("is-four-fifths");

        /// <summary>
        /// 百分之百
        /// </summary>
        public static Size Full = new("is-full");


    }
}
