using System;
namespace BulmaRazor.Components
{
    public class Size : EnumBase
    {

        private Size(string value) : base(value)
        {
        }

        public static Size Default = new Size("");

        // public static readonly Size Small = new Size("is-small");
        // public static Size Normal = new Size("is-normal");
        // public static Size Medium = new Size("is-medium");
        // public static Size Large = new Size("is-large");

        /// <summary>
        /// HeroSize
        /// </summary>
        public static Size FullHeight = new Size("is-fullheight");
        public static Size HalfHeight = new Size("is-halfheight");

        public static Size Size1 = new Size("is-1");
        public static Size Size2 = new Size("is-2");
        public static Size Size3 = new Size("is-3");
        public static Size Size4 = new Size("is-4");
        public static Size Size5 = new Size("is-5");
        public static Size Size6 = new Size("is-6");
        public static Size Size7 = new Size("is-7");
        public static Size Size8 = new Size("is-8");
        public static Size Size9 = new Size("is-9");
        public static Size Size10 = new Size("is-10");
        public static Size Size11 = new Size("is-11");
        public static Size Size12 = new Size("is-12");


        public static Size Square16 = new Size("is-16x16");
        public static Size Square24 = new Size("is-24x24");
        public static Size Square32 = new Size("is-32x32");
        public static Size Square48 = new Size("is-48x48");
        public static Size Square64 = new Size("is-64x64");
        public static Size Square96 = new Size("is-96x96");
        public static Size Square128 = new Size("is-128x128");




        /// <summary>
        /// 五分之一
        /// </summary>
        public static Size OneFifth = new Size("is-one-fifth");

        /// <summary>
        /// 四分之一
        /// </summary>
        public static Size OneQuarter = new Size("is-one-quarter");

        /// <summary>
        /// 三分之一
        /// </summary>
        public static Size OneThird = new Size("is-one-third");

        /// <summary>
        /// 五分之二
        /// </summary>
        public static Size TwoFifths = new Size("is-two-fifths");

        /// <summary>
        /// 二分之一
        /// </summary>
        public static Size Half = new Size("is-half");

        /// <summary>
        /// 五分之三
        /// </summary>
        public static Size ThreeFifths = new Size("is-three-fifths");

        /// <summary>
        /// 三分之二
        /// </summary>
        public static Size TwoThirds = new Size("is-two-thirds");

        /// <summary>
        /// 四分之三
        /// </summary>
        public static Size ThreeQuarters = new Size("is-three-quarters");

        /// <summary>
        /// 五分之四
        /// </summary>
        public static Size FourFifths = new Size("is-four-fifths");

        /// <summary>
        /// 百分之百
        /// </summary>
        public static Size Full = new Size("is-full");


    }
}
