using System.Collections.Generic;

namespace BulmaRazor.Utils
{
    public class JsParams:Dictionary<string,object>
    {

        public void AddNotNull(string key, object value)
        {
            if (value != null)
            {
                base.Add(key,value);
            }
        }

        private new void Add(string key, object value)
        {
            ;
        }
    }
}