using System;
namespace BulmaRazor.Components
{
    public class Align : EnumBase
    {

        private Align(string value) : base(value)
        {
        }

        public static Align Default = new Align("");
        public static Align Centered = new Align("is-centered");
        public static Align Right = new Align("is-right");
        public static Align Left = new Align("is-left");
    }
  
}
