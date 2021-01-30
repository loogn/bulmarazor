using System;
namespace BulmaRazor.Components
{
    public class Fixed : EnumBase
    {
        private Fixed(string value) : base(value)
        {
        }

        public static Fixed Default = new Fixed("");


        public static Fixed Top = new Fixed("is-fixed-top");

        public static Fixed Bottom = new Fixed("is-fixed-bottom");


    }
}
