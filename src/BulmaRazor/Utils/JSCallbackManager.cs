using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace BulmaRazor.Utils
{
    public static class JSCallbackManager
    {
        private static ConcurrentDictionary<string, Dictionary<string, Delegate>> eventHandlerDict = new();

        public static void AddEventHandler(string objId, string eventKey, Delegate @delegate)
        {
            var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());

            if (eventHandlerList.TryGetValue(eventKey, out Delegate oldDel))
            {
                eventHandlerList[eventKey] = Delegate.Combine(oldDel, @delegate);
            }
            else
            {
                eventHandlerList.Add(eventKey, @delegate);
            }
        }

        public static void RemoveEventHandler(string objId, string eventKey)
        {
            var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());
            eventHandlerList.Remove(eventKey);
        }
        public static void RemoveEventHandler(string objId, string eventKey,Delegate @delegate)
        {
            var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());
            
            if (eventHandlerList.TryGetValue(eventKey, out Delegate oldDel))
            {
                eventHandlerList[eventKey] = Delegate.Remove(oldDel, @delegate);
            }
        }

        public static void DisposeObject(string objId)
        {
            if (eventHandlerDict.Remove(objId, out Dictionary<string, Delegate> handlers))
            {
                handlers.Clear();
            }
        }

        [JSInvokable]
        public static object JSCallbackWithParams(string objId, string eventKey, Dictionary<string, object> ps)
        {
            if (eventHandlerDict.TryGetValue(objId, out Dictionary<string, Delegate> handlers))
            {
                if (handlers.TryGetValue(eventKey, out Delegate d))
                {
                    var obj = d.DynamicInvoke(ps);
                    return obj;
                }
            }

            return null;
        }

        [JSInvokable]
        public static object JSCallback(string objId, string eventKey)
        {
            if (eventHandlerDict.TryGetValue(objId, out Dictionary<string, Delegate> handlers))
            {
                if (handlers.TryGetValue(eventKey, out Delegate d))
                {
                    var obj = d.DynamicInvoke();
                    return obj;
                }
            }

            return null;
        }
    }
}