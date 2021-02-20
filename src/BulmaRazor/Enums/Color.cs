using System;
namespace BulmaRazor.Components
{
    public class Color : EnumBase
    {

        private Color(string value) : base(value)
        {
        }

        public static Color Default = new Color("");

        public static Color White = new Color("is-white");
        public static Color Black = new Color("is-black");
        public static Color Light = new Color("is-light");
        public static Color Dark = new Color("is-dark");
        public static Color Primary = new Color("is-primary");
        public static Color Link = new Color("is-link");
        public static Color Info = new Color("is-info");
        public static Color Success = new Color("is-success");
        public static Color Warning = new Color("is-warning");
        public static Color Danger = new Color("is-danger");

        public static Color Ghost = new Color("is-ghost");
       

    }
}
