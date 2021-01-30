using System;
namespace BulmaRazor.Components
{
    public class Ratio : EnumBase
    {

        private Ratio(string value) : base(value)
        {
        }

        public static Ratio Default = new Ratio("");


        public static Ratio Square = new Ratio("is-square");
        public static Ratio Ratio1by1 = new Ratio("is-1by1");
        public static Ratio Ratio5by4 = new Ratio("is-5by4");
        public static Ratio Ratio4by3 = new Ratio("is-4by3");

        public static Ratio Ratio3by2 = new Ratio("is-3by2");

        public static Ratio Ratio5by3 = new Ratio("is-5by3");
        public static Ratio Ratio16by9 = new Ratio("is-16by9");
        public static Ratio Ratio2by1 = new Ratio("is-2by1");
        public static Ratio Ratio3by1 = new Ratio("is-3by1");
        public static Ratio Ratio4by5 = new Ratio("is-4by5");
        public static Ratio Ratio3by4 = new Ratio("is-3by4");
        public static Ratio Ratio2by3 = new Ratio("is-2by3");
        public static Ratio Ratio3by5 = new Ratio("is-3by5");
        public static Ratio Ratio9by16 = new Ratio("is-9by16");
        public static Ratio Ratio1by2 = new Ratio("is-1by2");
        public static Ratio Ratio1by3 = new Ratio("is-1by3");


        /// <summary>
        /// HeroSize
        /// </summary>
        public static Ratio Fullheight = new Ratio("is-fullheight");

        public static Ratio Ratio1 = new Ratio("is-1");
        public static Ratio Ratio2 = new Ratio("is-2");
        public static Ratio Ratio3 = new Ratio("is-3");
        public static Ratio Ratio4 = new Ratio("is-4");
        public static Ratio Ratio5 = new Ratio("is-5");
        public static Ratio Ratio6 = new Ratio("is-6");
        public static Ratio Ratio7 = new Ratio("is-7");
        public static Ratio Ratio8 = new Ratio("is-8");
        public static Ratio Ratio9 = new Ratio("is-9");
        public static Ratio Ratio10 = new Ratio("is-10");
        public static Ratio Ratio11 = new Ratio("is-11");
        public static Ratio Ratio12 = new Ratio("is-12");


        public static Ratio Square16 = new Ratio("is-16x16");
        public static Ratio Square24 = new Ratio("is-24x24");
        public static Ratio Square32 = new Ratio("is-32x32");
        public static Ratio Square48 = new Ratio("is-48x48");
        public static Ratio Square64 = new Ratio("is-64x64");
        public static Ratio Square96 = new Ratio("is-96x96");
        public static Ratio Square128 = new Ratio("is-128x128");



    }
}
