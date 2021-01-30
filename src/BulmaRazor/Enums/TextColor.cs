using System;
namespace BulmaRazor.Components
{
    public class TextColor : EnumBase
    {

        internal TextColor(string value) : base(value)
        {
        }

        public static TextColor Default = new TextColor("");

        public static TextColor White = new TextColor("has-text-white");
        public static TextColor Black = new TextColor("has-text-black");
        public static TextColor Light = new TextColor("has-text-light");
        public static TextColor Dark = new TextColor("has-text-dark");
        public static TextColor Primary = new TextColor("has-text-primary");
        public static TextColor Link = new TextColor("has-text-link");
        public static TextColor Info = new TextColor("has-text-info");
        public static TextColor Success = new TextColor("has-text-success");
        public static TextColor Warning = new TextColor("has-text-warning");
        public static TextColor Danger = new TextColor("has-text-danger");

    }
}
