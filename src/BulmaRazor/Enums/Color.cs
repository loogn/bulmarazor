using System;
using System.Collections.Generic;

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


        public static Color TextWhite = new Color("has-text-white");
        public static Color TextBlack = new Color("has-text-black");
        public static Color TextLight = new Color("has-text-light");
        public static Color TextDark = new Color("has-text-dark");
        public static Color TextPrimary = new Color("has-text-primary");
        public static Color TextLink = new Color("has-text-link");
        public static Color TextInfo = new Color("has-text-info");
        public static Color TextSuccess = new Color("has-text-success");
        public static Color TextWarning = new Color("has-text-warning");
        public static Color TextDanger = new Color("has-text-danger");


    }
}
