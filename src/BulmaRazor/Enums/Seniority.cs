using System;
namespace BulmaRazor.Components
{
    /// <summary>
    /// 辈分
    /// </summary>
    public class Seniority : EnumBase
    {

        private Seniority(string value) : base(value)
        {
        }

        public static Seniority Default = new Seniority("");

        /// <summary>
        /// 祖先
        /// </summary>
        public static Seniority Ancestor = new Seniority("is-ancestor");

        /// <summary>
        /// 父辈
        /// </summary>
        public static Seniority Parent = new Seniority("is-parent");

        /// <summary>
        /// 孩子
        /// </summary>
        public static Seniority Child = new Seniority("is-child");

    }
}
