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
    public class AddonsAlign : EnumBase
    {
        private AddonsAlign(string value) : base(value)
        {
        }
        public static AddonsAlign Default = new AddonsAlign("");


        public static AddonsAlign Right = new AddonsAlign("has-addons-right");
        public static AddonsAlign Centered = new AddonsAlign("has-addons-centered");
    }

    public class GroupedAlign : EnumBase
    {
        private GroupedAlign(string value) : base(value)
        {
        }
        public static GroupedAlign Default = new GroupedAlign("");

        public static GroupedAlign Right = new GroupedAlign("is-grouped-right");
        public static GroupedAlign Centered = new GroupedAlign("is-grouped-centered");
    }
}
