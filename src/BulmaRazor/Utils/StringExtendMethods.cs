using System;
namespace BulmaRazor.Components
{
    public static class StringExtendMethods
    {
        public static bool HasValue(this string value)
        {
            return !string.IsNullOrEmpty(value);
        }
    }
}
