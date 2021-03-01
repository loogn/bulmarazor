using System;
using System.Collections.Generic;
using Microsoft.JSInterop;

namespace BulmaRazor
{
    public class CalendarCSharp
    {
        private static Dictionary<string, Action<string>> ActionDict = new(); 
        

        public static void SetAction(string guid, Action<string> action)
        {
            ActionDict[guid] = action;
        }
        public static void RemoveAction(string guid)
        {
            ActionDict.Remove(guid);
        }

        [JSInvokable]
        public static void SetCalendarValue(string guid, string value)
        {
            ActionDict[guid].Invoke(value);
        }
    }
}