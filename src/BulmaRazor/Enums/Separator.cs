using System;
namespace BulmaRazor.Components
{
    public class Separator : EnumBase
    {

        private Separator(string value) : base(value)
        {
        }

        public static Separator Default = new Separator("");
        public static Separator Arrow = new Separator("has-arrow-separator");
        public static Separator Bullet = new Separator("has-bullet-separator");
        public static Separator Dot = new Separator("has-dot-separator");
        public static Separator Succeeds = new Separator("has-succeeds-separator");

    }
}
