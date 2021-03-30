using System;
namespace BulmaRazor.Components
{
    /// <summary>
    /// Columns 间隙
    /// </summary>
    public class Gap : EnumBase
    {

        private Gap(string value) : base(value)
        {
        }

        public static Gap Default = new Gap("");
        public static Gap Gap0 = new Gap("is-0");
        public static Gap Gap1 = new Gap("is-1");
        public static Gap Gap2 = new Gap("is-2");
        public static Gap Gap3 = new Gap("is-3");
        public static Gap Gap4 = new Gap("is-4");
        public static Gap Gap5 = new Gap("is-5");
        public static Gap Gap6 = new Gap("is-6");
        public static Gap Gap7 = new Gap("is-7");
        public static Gap Gap8 = new Gap("is-8");

    }

    /// <summary>
    /// 列可变间隙-手机
    /// </summary>
    public class GapMobile : EnumBase
    {

        private GapMobile(string value) : base(value)
        {
        }

        public static GapMobile Default = new GapMobile("");
        public static GapMobile Gap0 = new GapMobile("is-0-mobile");
        public static GapMobile Gap1 = new GapMobile("is-1-mobile");
        public static GapMobile Gap2 = new GapMobile("is-2-mobile");
        public static GapMobile Gap3 = new GapMobile("is-3-mobile");
        public static GapMobile Gap4 = new GapMobile("is-4-mobile");
        public static GapMobile Gap5 = new GapMobile("is-5-mobile");
        public static GapMobile Gap6 = new GapMobile("is-6-mobile");
        public static GapMobile Gap7 = new GapMobile("is-7-mobile");
        public static GapMobile Gap8 = new GapMobile("is-8-mobile");

    }

    /// <summary>
    /// 列可变间隙-平板
    /// </summary>
    public class GapTablet : EnumBase
    {

        private GapTablet(string value) : base(value)
        {
        }
        public static GapTablet Default = new GapTablet("");
        public static GapTablet Gap0 = new GapTablet("is-0-tablet");
        public static GapTablet Gap1 = new GapTablet("is-1-tablet");
        public static GapTablet Gap2 = new GapTablet("is-2-tablet");
        public static GapTablet Gap3 = new GapTablet("is-3-tablet");
        public static GapTablet Gap4 = new GapTablet("is-4-tablet");
        public static GapTablet Gap5 = new GapTablet("is-5-tablet");
        public static GapTablet Gap6 = new GapTablet("is-6-tablet");
        public static GapTablet Gap7 = new GapTablet("is-7-tablet");
        public static GapTablet Gap8 = new GapTablet("is-8-tablet");
    }

    /// <summary>
    /// 列可变间隙-桌面
    /// </summary>
    public class GapDesktop : EnumBase
    {

        private GapDesktop(string value) : base(value)
        {
        }
        public static GapDesktop Default = new GapDesktop("");
        public static GapDesktop Gap0 = new GapDesktop("is-0-desktop");
        public static GapDesktop Gap1 = new GapDesktop("is-1-desktop");
        public static GapDesktop Gap2 = new GapDesktop("is-2-desktop");
        public static GapDesktop Gap3 = new GapDesktop("is-3-desktop");
        public static GapDesktop Gap4 = new GapDesktop("is-4-desktop");
        public static GapDesktop Gap5 = new GapDesktop("is-5-desktop");
        public static GapDesktop Gap6 = new GapDesktop("is-6-desktop");
        public static GapDesktop Gap7 = new GapDesktop("is-7-desktop");
        public static GapDesktop Gap8 = new GapDesktop("is-8-desktop");
    }

    /// <summary>
    /// 列可变间隙-桌面
    /// </summary>
    public class GapWidescreen : EnumBase
    {

        private GapWidescreen(string value) : base(value)
        {
        }
        public static GapWidescreen Default = new GapWidescreen("");
        public static GapWidescreen Gap0 = new GapWidescreen("is-0-widescreen");
        public static GapWidescreen Gap1 = new GapWidescreen("is-1-widescreen");
        public static GapWidescreen Gap2 = new GapWidescreen("is-2-widescreen");
        public static GapWidescreen Gap3 = new GapWidescreen("is-3-widescreen");
        public static GapWidescreen Gap4 = new GapWidescreen("is-4-widescreen");
        public static GapWidescreen Gap5 = new GapWidescreen("is-5-widescreen");
        public static GapWidescreen Gap6 = new GapWidescreen("is-6-widescreen");
        public static GapWidescreen Gap7 = new GapWidescreen("is-7-widescreen");
        public static GapWidescreen Gap8 = new GapWidescreen("is-8-widescreen");
    }

    /// <summary>
    /// 列可变间隙-桌面
    /// </summary>
    public class GapFullhd : EnumBase
    {

        private GapFullhd(string value) : base(value)
        {
        }
        public static GapFullhd Default = new GapFullhd("");
        public static GapFullhd Gap0 = new GapFullhd("is-0-fullhd");
        public static GapFullhd Gap1 = new GapFullhd("is-1-fullhd");
        public static GapFullhd Gap2 = new GapFullhd("is-2-fullhd");
        public static GapFullhd Gap3 = new GapFullhd("is-3-fullhd");
        public static GapFullhd Gap4 = new GapFullhd("is-4-fullhd");
        public static GapFullhd Gap5 = new GapFullhd("is-5-fullhd");
        public static GapFullhd Gap6 = new GapFullhd("is-6-fullhd");
        public static GapFullhd Gap7 = new GapFullhd("is-7-fullhd");
        public static GapFullhd Gap8 = new GapFullhd("is-8-fullhd");
    }
}
