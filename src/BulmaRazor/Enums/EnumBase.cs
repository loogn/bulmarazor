using System;
namespace BulmaRazor.Components
{

    public abstract class EnumBase
    {
        protected EnumBase(string value) { Value = value; }
        public string Value { get; set; }



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

    }

}
