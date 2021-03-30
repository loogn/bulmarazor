using System;
namespace BulmaRazor.Components
{

    /// <summary>
    /// 仿枚举值基类
    /// </summary>
    public abstract class EnumBase
    {
        protected EnumBase(string value) { Value = value; }
        public string Value { get;  }



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
        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public override string ToString()
        {
            return Value;
        }
    }

}
