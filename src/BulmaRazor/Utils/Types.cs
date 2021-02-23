using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulmaRazor.Utils
{
    static class Types
    {

        public readonly static Type String = typeof(string);

        public readonly static Type Int32 = typeof(int);
        public readonly static Type NullableInt32 = typeof(int?);

        public readonly static Type DateTime = typeof(DateTime);
        public readonly static Type NullableDateTime = typeof(DateTime?);

        public readonly static Type Int64 = typeof(long);
        public readonly static Type NullableInt64 = typeof(long?);

        public readonly static Type Single = typeof(float);
        public readonly static Type NullableSingle = typeof(float?);

        public readonly static Type Double = typeof(double);
        public readonly static Type NullableDouble = typeof(double?);

        public readonly static Type Guid = typeof(Guid);
        public readonly static Type NullableGuid = typeof(Guid?);

        public readonly static Type Int16 = typeof(short);
        public readonly static Type NullableInt16 = typeof(short?);

        public readonly static Type Byte = typeof(byte);
        public readonly static Type NullableByte = typeof(byte?);

        public readonly static Type Char = typeof(char);
        public readonly static Type NullableChar = typeof(char?);

        public readonly static Type Decimal = typeof(decimal);
        public readonly static Type NullableDecimal = typeof(decimal?);

        public readonly static Type ByteArray = typeof(byte[]);

        public readonly static Type Bool = typeof(bool);
        public readonly static Type NullableBool = typeof(bool?);

        public readonly static Type TimeSpan = typeof(TimeSpan);
        public readonly static Type NullableTimeSpan = typeof(TimeSpan?);


        public readonly static Type NullableType = typeof(Nullable<>);
        public readonly static Type Object = typeof(object);
        public readonly static Type Type = typeof(Type); 
    }
}
