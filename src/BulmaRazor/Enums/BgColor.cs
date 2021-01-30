using System;
namespace BulmaRazor.Components
{
    public class BgColor : EnumBase
    {

        private BgColor(string value) : base(value)
        {
        }

        public static BgColor Default = new BgColor("");

        public static BgColor White = new BgColor("has-background-white");
        public static BgColor Black = new BgColor("has-background-black");
        public static BgColor Light = new BgColor("has-background-light");
        public static BgColor Dark = new BgColor("has-background-dark");
        public static BgColor Primary = new BgColor("has-background-primary");
        public static BgColor Link = new BgColor("has-background-link");
        public static BgColor Info = new BgColor("has-background-info");
        public static BgColor Success = new BgColor("has-background-success");
        public static BgColor Warning = new BgColor("has-background-warning");
        public static BgColor Danger = new BgColor("has-background-danger");
        

    }
}
