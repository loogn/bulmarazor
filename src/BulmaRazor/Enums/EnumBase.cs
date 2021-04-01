using System;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 仿枚举值基类
    /// </summary>
    public abstract class EnumBase
    {
        /// <summary>
        /// 初始化
        /// </summary>
        /// <param name="value"></param>
        protected EnumBase(string value)
        {
            Value = value;
        }

        /// <summary>
        /// 值
        /// </summary>
        public string Value { get; }


        /// <summary>
        /// 按具体的值比较
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public override bool Equals(object obj)
        {
            if (obj is EnumBase e)
            {
                return e.Value == Value;
            }

            if (obj is string str)
            {
                return str == Value;
            }

            return false;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return Value;
        }
    }
}