using System;
namespace BulmaRazor.Components
{
    /// <summary>
    /// 设备
    /// </summary>
    public class Device : EnumBase
    {

        private Device(string value) : base(value)
        {
        }


        public static Device Default = new Device("");
        public static Device Mobile = new Device("is-mobile");
        public static Device Tablet = new Device("is-tablet");
        public static Device Desktop = new Device("is-desktop");
        public static Device Widescreen = new Device("is-widescreen");
        public static Device Fullhd = new Device("is-fullhd");

    }

    /// <summary>
    /// 设备宽度
    /// </summary>
    public class MaxDevice : EnumBase
    {

        private MaxDevice(string value) : base(value)
        {
        }


        public static MaxDevice Default = new MaxDevice("");
        //public static MaxDevice Mobile = new MaxDevice("is-max-mobile");
        //public static MaxDevice Tablet = new MaxDevice("is-max-tablet");
        public static MaxDevice Desktop = new MaxDevice("is-max-desktop");
        public static MaxDevice Widescreen = new MaxDevice("is-max-widescreen");
        //public static MaxDevice Fullhd = new MaxDevice("is-max-fullhd");
    }
}
