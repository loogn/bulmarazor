using System;
namespace BulmaRazor.Components
{
    public class InputType : EnumBase
    {

        internal InputType(string value) : base(value)
        {
        }
        public static InputType Text = new InputType("text");
        public static InputType Password = new InputType("password");
        public static InputType Email = new InputType("email");
        public static InputType Tel = new InputType("tel");
        public static InputType Number = new InputType("number");

    }
}
