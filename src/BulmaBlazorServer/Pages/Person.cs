using System;

namespace BulmaRazorServer.Pages
{
    public sealed class Person
    {
        public  int Id { get; set; }
        public string Name{ get; set; }
        public  int Age{ get; set; } 
        public DateTime Birthday{ get; set; }

        public Person(int id, string name, int age, DateTime birthday)
        {
            Id = id;
            Name = name;
            Age = age;
            Birthday = birthday;
        }

        public Person(){}
    }
}