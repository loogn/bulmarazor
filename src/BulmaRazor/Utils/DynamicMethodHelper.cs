using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace BulmaRazor.Utils
{
    static class DynamicMethodHelper
    {
        /// <summary>
        /// 实例化对象 用EMIT
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="constructor"></param>
        /// <returns></returns>
        public static Func<object> BuildConstructorInvoker(ConstructorInfo constructor)
        {
            var newConstructor = Expression.New(constructor);
            UnaryExpression castCallExpr = Expression.Convert(newConstructor, typeof(object));
            var func = Expression.Lambda<Func<object>>(castCallExpr).Compile();
            return func;
            ////动态方法
            //var dynamicMethod = new DynamicMethod(Guid.NewGuid().ToString("N"), typeof(object), new[] { typeof(object[]) }, true);
            ////方法IL
            //ILGenerator il = dynamicMethod.GetILGenerator();
            ////实例化命令
            //il.Emit(OpCodes.Newobj, constructor);
            ////如果是值类型装箱
            //if (constructor.ReflectedType.IsValueType)
            //    il.Emit(OpCodes.Box, constructor.ReflectedType);
            ////返回
            //il.Emit(OpCodes.Ret);
            ////用FUNC去关联方法
            //return (Func<object>)dynamicMethod.CreateDelegate(typeof(Func<object>));
        }

        public static Func<object> BuildConstructorInvoker(Type type)
        {
            var constructor = type.GetConstructor(Type.EmptyTypes);
            if (constructor != null)
            {
                return BuildConstructorInvoker(constructor);
            }
            else
            {
                return () =>
                {
                    throw new Exception(type.FullName + " 类型没有无参构造，无法实例化。");
                };
            }
        }

        public static Func<object, object> BuildGetterInvoker(MethodInfo methodInfo)
        {
            if (methodInfo == null) return (obj) => { return null; };
            var instanceParameter = Expression.Parameter(typeof(object), "instance");
            var instanceExpr = methodInfo.IsStatic ? null : Expression.Convert(instanceParameter, methodInfo.ReflectedType);
            var callExpr = Expression.Call(instanceExpr, methodInfo, null);
            UnaryExpression castCallExpr = Expression.Convert(callExpr, typeof(object));
            var fun = Expression.Lambda<Func<object, object>>(castCallExpr, instanceParameter).Compile();
            return fun;
        }

        public static Action<object, object> BuildSetterInvoker(MethodInfo methodInfo)
        {
            if (methodInfo == null) return (obj, value) => {; };

            var instanceParameter = Expression.Parameter(typeof(object), "instance");
            var parametersParameter = Expression.Parameter(typeof(object), "value");
            var instanceExpr = methodInfo.IsStatic ? null : Expression.Convert(instanceParameter, methodInfo.ReflectedType);
            var paramInfo = methodInfo.GetParameters().First();

            Expression caseExp = null;
            var underlyingType = Nullable.GetUnderlyingType(paramInfo.ParameterType);
            if (underlyingType != null && underlyingType.IsEnum)
            {
                var case1 = Expression.Convert(parametersParameter, Enum.GetUnderlyingType(underlyingType));
                caseExp = Expression.Convert(case1, paramInfo.ParameterType);
            }
            else
            {
                if (paramInfo.ParameterType == Types.Bool)
                {
                    var changeTypeMethod = typeof(Convert).GetMethod("ChangeType", new Type[] {Types.Object, Types.Type});
                    caseExp = Expression.Convert(Expression.Call(null, changeTypeMethod, 
                            parametersParameter,
                            Expression.Constant(paramInfo.ParameterType)),
                        paramInfo.ParameterType);
                }
                else
                {
                    caseExp = Expression.Convert(parametersParameter, paramInfo.ParameterType);    
                }
                
            }
            var callExpr = Expression.Call(instanceExpr, methodInfo, caseExp);
            var action = Expression.Lambda<Action<object, object>>(callExpr,
                instanceParameter, parametersParameter).Compile();
            return action;
        }

        public static Action<object, object> BuildEnumSetterInvoker(Type underlyingType, MethodInfo methodInfo)
        {
            if (methodInfo == null) return (obj, value) => {; };

            var instanceParameter = Expression.Parameter(typeof(object), "instance");
            var parametersParameter = Expression.Parameter(typeof(object), "value");
            var instanceExpr = methodInfo.IsStatic ? null : Expression.Convert(instanceParameter, methodInfo.ReflectedType);
            var paramInfo = methodInfo.GetParameters().First();
            var arrCase = Expression.Convert(parametersParameter, underlyingType);
            var arrCase1 = Expression.Convert(arrCase, paramInfo.ParameterType);
            var callExpr = Expression.Call(instanceExpr, methodInfo, arrCase1);
            var action = Expression.Lambda<Action<object, object>>(callExpr,
                instanceParameter, parametersParameter).Compile();
            return action;
        }


        public static Func<T> BuildConstructorInvoker<T>(Type type)
        {
            var constructor = type.GetConstructor(Type.EmptyTypes);
            if (constructor != null)
            {
                return Expression.Lambda<Func<T>>(Expression.New(constructor)).Compile();
            }
            else
            {
                return () =>
                {
                    throw new Exception(type.FullName + " 类型没有无参构造，无法实例化。");
                };
            }
        }
    }
}
