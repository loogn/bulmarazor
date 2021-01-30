using System;
namespace BulmaRazor.Components
{
    public class AreSize : EnumBase
    {

        private AreSize(string value) : base(value)
        {
        }

        public static AreSize Default = new AreSize("");


        public static AreSize Small = new AreSize("are-small");
        
        public static AreSize Medium = new AreSize("are-medium");
        public static AreSize Large = new AreSize("are-large");

      




    }
}
