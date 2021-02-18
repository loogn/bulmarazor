using System;
using Microsoft.JSInterop;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
namespace BulmaRazor.Components
{

    //BulmaClass
    public static class B
    {
        #region Typography
        public static readonly string IsSize1="is-size-1";
        public static readonly string IsSize2="is-size-2";
        public static readonly string IsSize3="is-size-3";
        public static readonly string IsSize4="is-size-4";
        public static readonly string IsSize5="is-size-5";
        public static readonly string IsSize6="is-size-6";
        public static readonly string IsSize7="is-size-7";
        //...
        #endregion

        #region Visibility
        public static readonly string IsBlock="is-block";
        public static readonly string IsFlex="is-flex";
        public static readonly string IsInline="is-inline";
        public static readonly string IsInlineBlock="is-inline-block";
        public static readonly string IsInlineFlex="is-inline-flex";
        //...
        #endregion


        #region OtherClass
        public static readonly string IsClearfix = "is-clearfix";
        public static readonly string IsPulledLeft = "is-pulled-left";
        public static readonly string IsPulledRight = "is-pulled-right";
        public static readonly string IsOverlay = "is-overlay";
        public static readonly string IsClipped = "is-clipped";
        public static readonly string IsRadiusless = "is-radiusless";
        public static readonly string IsShadowless = "is-shadowless";
        public static readonly string IsUnselectable = "is-unselectable";
        public static readonly string IsClickable = "is-clickable";
        public static readonly string IsRelative = "is-relative";

        #endregion

    }
}