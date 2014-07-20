using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace AngularSignalR.Hubs
{
    public class HelloHub : Hub
    {
        public void Hello(string name)
        {
            Clients.All.hello(string.Format("hello {0}, the server time is: {1}", name, DateTime.Now));
        }
    }
}