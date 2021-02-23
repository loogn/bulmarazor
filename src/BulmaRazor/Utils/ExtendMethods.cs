using System;
using System.Globalization;
using Microsoft.AspNetCore.Components;

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

        public static string GetShowValue<TValue>(TValue value, string format)
        {
            var otype = typeof(TValue);
            return GetShowValue(otype, value, format);
        }

        public static string GetShowValue(Type otype, object value, string format)
        {
            if (value == null)
                return string.Empty;
            if (string.IsNullOrEmpty(format))
            {
                return value.ToString();
            }

            var type = Nullable.GetUnderlyingType(otype) ?? otype;
            if (type == typeof(DateTime))
            {
                return ((DateTime) (object) value).ToString(format);
            }

            if (type == typeof(DateTimeOffset))
            {
                return ((DateTimeOffset) (object) value).ToString(format);
            }

            return value.ToString();
        }

        public static bool SetRealValue<TValue>(this string str, out TValue value)
        {
            value = default(TValue);

            var otype = typeof(TValue);
            var type = Nullable.GetUnderlyingType(otype) ?? otype;
            if (string.IsNullOrEmpty(str) && otype != typeof(string))
            {
                if (otype != type)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            if (type == typeof(bool))
            {
                if (str.Equals("true", StringComparison.OrdinalIgnoreCase))
                {
                    value = (TValue) (object) true;
                    return true;
                }
                else if (str.Equals("false", StringComparison.OrdinalIgnoreCase))
                {
                    value = (TValue) (object) false;
                    return true;
                }
                else
                {
                    return false;
                }
            }

            //好奇怪，TryConvertTo<DateTimeOffset> 不行,估计是个bug
            if (type == typeof(DateTimeOffset))
            {
                if (BindConverter.TryConvertToDateTimeOffset(str, CultureInfo.InvariantCulture, out DateTimeOffset val))
                {
                    value = (TValue) (object) val;
                    return true;
                }

                return false;
            }
            else
            {
                if (BindConverter.TryConvertTo<TValue>(str, CultureInfo.InvariantCulture, out TValue val))
                {
                    value = val;
                    return true;
                }

                return false;
            }
        }
    }
}