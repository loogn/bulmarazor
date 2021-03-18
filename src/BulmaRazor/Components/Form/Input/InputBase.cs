using System;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BulmaRazor.Components
{
    public abstract class InputBase<TValue> : BulmaComponentBase
    {
        public string Id = "input_" + Guid.NewGuid().ToString("N");
        protected string classes => CssBuilder.Default("input")
            .AddClassFromAttributes(Attributes)
            .AddClass(Color.Value, Color.Value)
            .AddClass("is-small", IsSmall)
            .AddClass("is-normal", IsNormal)
            .AddClass("is-medium", IsMedium)
            .AddClass("is-large", IsLarge)
            .AddClass("is-rounded", IsRounded)
            .AddClass("is-hovered", IsHovered)
            .AddClass("is-focused", IsFocused)
            .AddClass("is-static", IsStatic)
            .Build();

        [Parameter]
        public Color Color { get; set; } = Color.Default;

    
        [Parameter]
        public bool IsSmall { get; set; }
        [Parameter]
        public bool IsNormal { get; set; }
        [Parameter]
        public bool IsMedium { get; set; }
        [Parameter]
        public bool IsLarge { get; set; }

        [Parameter]
        public bool IsHovered { get; set; }

        [Parameter]
        public bool IsFocused { get; set; }

        [Parameter]
        public bool IsRounded { get; set; }

        [Parameter]
        public bool IsStatic { get; set; }

        [Parameter]
        public string BindEvent { get; set; } = "onchange";

        [Parameter]
        public TValue Value { get; set; }
   
        [Parameter]
        public EventCallback<TValue> ValueChanged { get; set; }
    }
}