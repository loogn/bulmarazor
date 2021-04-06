using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace BulmaRazor.Utils
{
    /// <summary>
    /// JSCallback管理器
    /// </summary>
    public static class JSCallbackManager
    {
        //该类必须是public，JSInvokable才可用
        
        private static ConcurrentDictionary<string, Dictionary<string, Delegate>> eventHandlerDict = new();

        /// <summary>
        /// 添加js回调委托
        /// </summary>
        /// <param name="objId">对象Id</param>
        /// <param name="eventKey">时间key</param>
        /// <param name="delegate">回调委托</param>
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

        // public static void RemoveEventHandler(string objId, string eventKey)
        // {
        //     var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());
        //     eventHandlerList.Remove(eventKey);
        // }
        // public static void RemoveEventHandler(string objId, string eventKey,Delegate @delegate)
        // {
        //     var eventHandlerList = eventHandlerDict.GetOrAdd(objId, (key) => new Dictionary<string, Delegate>());
        //     
        //     if (eventHandlerList.TryGetValue(eventKey, out Delegate oldDel))
        //     {
        //         eventHandlerList[eventKey] = Delegate.Remove(oldDel, @delegate);
        //     }
        // }

        /// <summary>
        /// 删除对象所有回调委托
        /// </summary>
        /// <param name="objId">对象Id</param>
        public static void DisposeObject(string objId)
        {
            if (eventHandlerDict.Remove(objId, out Dictionary<string, Delegate> handlers))
            {
                handlers.Clear();
            }
        }

        /// <summary>
        /// js互调用方法，带参数
        /// </summary>
        /// <param name="objId"></param>
        /// <param name="eventKey"></param>
        /// <param name="ps">key,value形式的参数</param>
        /// <returns></returns>
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

        /// <summary>
        /// js互调用方法，不带参数
        /// </summary>
        /// <param name="objId"></param>
        /// <param name="eventKey"></param>
        /// <returns></returns>
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