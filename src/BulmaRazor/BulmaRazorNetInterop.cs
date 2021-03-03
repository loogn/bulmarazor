using System;
using System.Threading.Tasks;
using Microsoft.JSInterop;

namespace BulmaRazor
{
    public class BulmaRazorNetInterop
    {
        public static event Func<Task> DocumentClick;

        [JSInvokable]
        public static Task OnDocumentClick()
        {
            return DocumentClick?.Invoke();
        }
    }
}