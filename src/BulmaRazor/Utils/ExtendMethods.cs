using System;
namespace BulmaRazor.Components
{
    public static class ExtendMethods
    {
        public static bool HasValue(this string value)
        {
            return !string.IsNullOrEmpty(value);
        }

        public static bool IsNumber(this Type type)
        {
            type = Nullable.GetUnderlyingType(type) ?? type;
            return type == typeof(byte) ||
                type == typeof(sbyte) ||
                type == typeof(int) ||
                type == typeof(long) ||
                type == typeof(short) ||
                type == typeof(float) ||
                type == typeof(double) ||
                type == typeof(decimal);
        }
    }
}
