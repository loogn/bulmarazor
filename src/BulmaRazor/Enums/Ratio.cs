using System;
namespace BulmaRazor.Components
{
    
    /// <summary>
    /// Image 比例
    /// </summary>
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


       

    }
}
