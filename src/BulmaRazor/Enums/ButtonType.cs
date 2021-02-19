using System;
namespace BulmaRazor.Components
{
    public class ButtonType : EnumBase
    {
        internal ButtonType(string value) : base(value)
        {
        }
        public static ButtonType Button = new ButtonType("button");
        public static ButtonType Submit = new ButtonType("submit");
        public static ButtonType Reset = new ButtonType("reset");
    }
}
