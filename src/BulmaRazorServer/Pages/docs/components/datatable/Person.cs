using System;
using System.Collections.Generic;
using System.Linq;
using BulmaRazor.Components;

namespace BulmaRazorServer.Pages.docs.components.datatable
{
    public enum Gender
    {
        Famle,
        Male
    }

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public Gender Gender { get; set; }
        public DateTime Birthday { get; set; }

        public Person(int id, string name, int age, DateTime birthday, Gender gender)
        {
            Id = id;
            Name = name;
            Age = age;
            Birthday = birthday;
            Gender = gender;
        }

        public Person()
        {
        }


        //表示从后台获取数据
        static List<Person> allData;

        static Person()
        {
            allData = new List<Person>();
            for (int i = 0; i < 1983; i++)
            {
                allData.Add(new Person()
                {
                    Id = i,
                    Name = "name" + i,
                    Birthday = DateTime.Now.AddDays(-i),
                    Age = i + 2,
                    Gender = i % 3 == 0 ? Gender.Famle : Gender.Male
                });
            }
        }

        internal static IEnumerable<Person> GetPageData(string kw, int pageIndex, int pageSize, out int totalCount)
        {
            IEnumerable<Person> list = allData;
            if (!string.IsNullOrEmpty(kw))
            {
                list = allData.Where(x => x.Name.Contains(kw));
            }

            totalCount = list.Count();
            return list.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        }
    }
}