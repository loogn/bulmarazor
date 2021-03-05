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
            eventHandlerList.Add(eventKey, @delegate);
        }

        public static void RemoveEventHandler(string objId, string eventKey)
        {
            var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());
            eventHandlerList.Remove(eventKey);
        }

        public static void DisposeObject(string objId)
        {
            if (eventHandlerDict.Remove(objId, out Dictionary<string, Delegate> handlers))
            {
                handlers.Clear();
            }
        }

        [JSInvokable]
        public static void JSCallback(string objId, string eventKey,params string[] args)
        {
            if (eventHandlerDict.TryGetValue(objId, out Dictionary<string, Delegate> handlers))
            {
                if (handlers.TryGetValue(eventKey, out Delegate d))
                {
                    var obj= d.DynamicInvoke(args);
                    if (obj is Task task)
                    {
                        task.GetAwaiter().GetResult();
                    }
                }
            }
        }
    }
}