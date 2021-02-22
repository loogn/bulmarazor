using System;
using Microsoft.JSInterop;
using Microsoft.AspNetCore.Components;
using System.Collections.Generic;
namespace BulmaRazor.Components
{

    /// <summary>
    /// BulmaClass Helper
    /// </summary>
    public static class B
    {
        #region Color
        // font-color
        public static readonly string TextWhite = "has-text-white";
        public static readonly string TextBlack = "has-text-black";
        public static readonly string TextLight = "has-text-light";
        public static readonly string TextDark = "has-text-dark";
        public static readonly string TextPrimary = "has-text-primary";
        public static readonly string TextLink = "has-text-link";
        public static readonly string TextInfo = "has-text-info";
        public static readonly string TextSuccess = "has-text-success";
        public static readonly string TextWarning = "has-text-warning";
        public static readonly string TextDanger = "has-text-danger";

        // shadow
        public static readonly string TextBlackBis = "has-text-black-bis";
        public static readonly string TextBlackTer = "has-text-black-ter";
        public static readonly string TextGreyDarker = "has-text-grey-darker";
        public static readonly string TextGreyDark = "has-text-grey-dark";
        public static readonly string TextGrey = "has-text-grey";
        public static readonly string TextGreyLight = "has-text-grey-light";
        public static readonly string TextGreyLighter = "has-text-grey-lighter";
        public static readonly string TextWhiteTer = "has-text-white-ter";
        public static readonly string TextWhiteBis = "has-text-white-bis";

        //light
        public static readonly string TextPrimaryLight = "has-text-primary-light";
        public static readonly string TextLinkLight = "has-text-link-light";
        public static readonly string TextInfoLight = "has-text-info-light";
        public static readonly string TextSuccessLight = "has-text-success-light";
        public static readonly string TextWarningLight = "has-text-warning-light";
        public static readonly string TextDangerLight = "has-text-danger-light";

        public static readonly string TextPrimaryDark = "has-text-primary-dark";
        public static readonly string TextLinkDark = "has-text-link-dark";
        public static readonly string TextInfoDark = "has-text-info-dark";
        public static readonly string TextSuccessDark = "has-text-success-dark";
        public static readonly string TextWarningDark = "has-text-warning-dark";
        public static readonly string TextDangerDark = "has-text-danger-dark";

        // background color
        public static readonly string BackgroundWhite = "has-background-white";
        public static readonly string BackgroundBlack = "has-background-black";
        public static readonly string BackgroundLight = "has-background-light";
        public static readonly string BackgroundDark = "has-background-dark";
        public static readonly string BackgroundPrimary = "has-background-primary";
        public static readonly string BackgroundLink = "has-background-link";
        public static readonly string BackgroundInfo = "has-background-info";
        public static readonly string BackgroundSuccess = "has-background-success";
        public static readonly string BackgroundWarning = "has-background-warning";
        public static readonly string BackgroundDanger = "has-background-danger";

        public static readonly string BackgroundBlackBis = "has-background-black-bis";
        public static readonly string BackgroundBlackTer = "has-background-black-ter";
        public static readonly string BackgroundGreyDarker = "has-background-grey-darker";
        public static readonly string BackgroundGreyDark = "has-background-grey-dark";
        public static readonly string BackgroundGrey = "has-background-grey";
        public static readonly string BackgroundGreyLight = "has-background-grey-light";
        public static readonly string BackgroundGreyLighter = "has-background-grey-lighter";
        public static readonly string BackgroundWhiteTer = "has-background-white-ter";
        public static readonly string BackgroundWhiteBis = "has-background-white-bis";

        //light
        public static readonly string BackgroundPrimaryLight = "has-background-primary-light";
        public static readonly string BackgroundLinkLight = "has-background-link-light";
        public static readonly string BackgroundInfoLight = "has-background-info-light";
        public static readonly string BackgroundSuccessLight = "has-background-success-light";
        public static readonly string BackgroundWarningLight = "has-background-warning-light";
        public static readonly string BackgroundDangerLight = "has-background-danger-light";

        public static readonly string BackgroundPrimaryDark = "has-background-primary-dark";
        public static readonly string BackgroundLinkDark = "has-background-link-dark";
        public static readonly string BackgroundInfoDark = "has-background-info-dark";
        public static readonly string BackgroundSuccessDark = "has-background-success-dark";
        public static readonly string BackgroundWarningDark = "has-background-warning-dark";
        public static readonly string BackgroundDangerDark = "has-background-danger-dark";
        #endregion


        #region Spacing

        public static readonly string M0 = "m-0";
        public static readonly string M1 = "m-1";
        public static readonly string M2 = "m-2";
        public static readonly string M3 = "m-3";
        public static readonly string M4 = "m-4";
        public static readonly string M5 = "m-5";
        public static readonly string M6 = "m-6";

        public static readonly string MT0 = "mt-0";
        public static readonly string MT1 = "mt-1";
        public static readonly string MT2 = "mt-2";
        public static readonly string MT3 = "mt-3";
        public static readonly string MT4 = "mt-4";
        public static readonly string MT5 = "mt-5";
        public static readonly string MT6 = "mt-6";

        public static readonly string MR0 = "mr-0";
        public static readonly string MR1 = "mr-1";
        public static readonly string MR2 = "mr-2";
        public static readonly string MR3 = "mr-3";
        public static readonly string MR4 = "mr-4";
        public static readonly string MR5 = "mr-5";
        public static readonly string MR6 = "mr-6";

        public static readonly string MB0 = "mb-0";
        public static readonly string MB1 = "mb-1";
        public static readonly string MB2 = "mb-2";
        public static readonly string MB3 = "mb-3";
        public static readonly string MB4 = "mb-4";
        public static readonly string MB5 = "mb-5";
        public static readonly string MB6 = "mb-6";

        public static readonly string ML0 = "ml-0";
        public static readonly string ML1 = "ml-1";
        public static readonly string ML2 = "ml-2";
        public static readonly string ML3 = "ml-3";
        public static readonly string ML4 = "ml-4";
        public static readonly string ML5 = "ml-5";
        public static readonly string ML6 = "ml-6";

        public static readonly string MX0 = "mx-0";
        public static readonly string MX1 = "mx-1";
        public static readonly string MX2 = "mx-2";
        public static readonly string MX3 = "mx-3";
        public static readonly string MX4 = "mx-4";
        public static readonly string MX5 = "mx-5";
        public static readonly string MX6 = "mx-6";

        public static readonly string MY0 = "my-0";
        public static readonly string MY1 = "my-1";
        public static readonly string MY2 = "my-2";
        public static readonly string MY3 = "my-3";
        public static readonly string MY4 = "my-4";
        public static readonly string MY5 = "my-5";
        public static readonly string MY6 = "my-6";

        public static readonly string P0 = "p-0";
        public static readonly string P1 = "p-1";
        public static readonly string P2 = "p-2";
        public static readonly string P3 = "p-3";
        public static readonly string P4 = "p-4";
        public static readonly string P5 = "p-5";
        public static readonly string P6 = "p-6";

        public static readonly string PT0 = "pt-0";
        public static readonly string PT1 = "pt-1";
        public static readonly string PT2 = "pt-2";
        public static readonly string PT3 = "pt-3";
        public static readonly string PT4 = "pt-4";
        public static readonly string PT5 = "pt-5";
        public static readonly string PT6 = "pt-6";

        public static readonly string PR0 = "pr-0";
        public static readonly string PR1 = "pr-1";
        public static readonly string PR2 = "pr-2";
        public static readonly string PR3 = "pr-3";
        public static readonly string PR4 = "pr-4";
        public static readonly string PR5 = "pr-5";
        public static readonly string PR6 = "pr-6";

        public static readonly string PB0 = "pb-0";
        public static readonly string PB1 = "pb-1";
        public static readonly string PB2 = "pb-2";
        public static readonly string PB3 = "pb-3";
        public static readonly string PB4 = "pb-4";
        public static readonly string PB5 = "pb-5";
        public static readonly string PB6 = "pb-6";

        public static readonly string PL0 = "pl-0";
        public static readonly string PL1 = "pl-1";
        public static readonly string PL2 = "pl-2";
        public static readonly string PL3 = "pl-3";
        public static readonly string PL4 = "pl-4";
        public static readonly string PL5 = "pl-5";
        public static readonly string PL6 = "pl-6";

        public static readonly string PX0 = "px-0";
        public static readonly string PX1 = "px-1";
        public static readonly string PX2 = "px-2";
        public static readonly string PX3 = "px-3";
        public static readonly string PX4 = "px-4";
        public static readonly string PX5 = "px-5";
        public static readonly string PX6 = "px-6";

        public static readonly string PY0 = "py-0";
        public static readonly string PY1 = "py-1";
        public static readonly string PY2 = "py-2";
        public static readonly string PY3 = "py-3";
        public static readonly string PY4 = "py-4";
        public static readonly string PY5 = "py-5";
        public static readonly string PY6 = "py-6";

        #endregion

        #region Typography
        //font-size
        public static readonly string Size1 = "is-size-1";
        public static readonly string Size2 = "is-size-2";
        public static readonly string Size3 = "is-size-3";
        public static readonly string Size4 = "is-size-4";
        public static readonly string Size5 = "is-size-5";
        public static readonly string Size6 = "is-size-6";
        public static readonly string Size7 = "is-size-7";
        //Responsive size
        public static readonly string Size1Mobile = "is-size-1-mobile";
        public static readonly string Size2Touch = "is-size-2-touch";
        public static readonly string Size3Tablet = "is-size-3-tablet";
        public static readonly string Size4Desktop = "is-size-4-desktop";
        public static readonly string Size5Widescreen = "is-size-5-widescreen";
        public static readonly string Size6Fullhd = "is-size-6-fullhd";

        //text alignment
        public static readonly string TextCentered = "has-text-centered";
        public static readonly string TextJustified = "has-text-justified";
        public static readonly string TextLeft = "has-text-left";
        public static readonly string TextRight = "has-text-right";

        //Responsive Alignment
        public static readonly string TextCenteredMobile = "has-text-centered-mobile";
        public static readonly string TextCenteredTouch = "has-text-centered-touch";
        public static readonly string TextCenteredTabletOnly = "has-text-centered-tablet-only";
        public static readonly string TextCenteredTablet = "has-text-centered-tablet";
        public static readonly string TextCenteredDesktopOnly = "has-text-centered-desktop-only";
        public static readonly string TextCenteredDesktop = "has-text-centered-desktop";
        public static readonly string TextCenteredWidescreenOnly = "has-text-centered-widescreen-only";
        public static readonly string TextCenteredWidescreen = "has-text-centered-widescreen";
        public static readonly string TextCenteredFullhd = "has-text-centered-fullhd";

        public static readonly string TextJustifiedMobile = "has-text-justified-mobile";
        public static readonly string TextJustifiedTouch = "has-text-justified-touch";
        public static readonly string TextJustifiedTabletOnly = "has-text-justified-tablet-only";
        public static readonly string TextJustifiedTablet = "has-text-justified-tablet";
        public static readonly string TextJustifiedDesktopOnly = "has-text-justified-desktop-only";
        public static readonly string TextJustifiedDesktop = "has-text-justified-desktop";
        public static readonly string TextJustifiedWidescreenOnly = "has-text-justified-widescreen-only";
        public static readonly string TextJustifiedWidescreen = "has-text-justified-widescreen";
        public static readonly string TextJustifiedFullhd = "has-text-justified-fullhd";

        public static readonly string TextLeftMobile = "has-text-left-mobile";
        public static readonly string TextLeftTouch = "has-text-left-touch";
        public static readonly string TextLeftTabletOnly = "has-text-left-tablet-only";
        public static readonly string TextLeftTablet = "has-text-left-tablet";
        public static readonly string TextLeftDesktopOnly = "has-text-left-desktop-only";
        public static readonly string TextLeftDesktop = "has-text-left-desktop";
        public static readonly string TextLeftWidescreenOnly = "has-text-left-widescreen-only";
        public static readonly string TextLeftWidescreen = "has-text-left-widescreen";
        public static readonly string TextLeftFullhd = "has-text-left-fullhd";

        public static readonly string TextRightMobile = "has-text-right-mobile";
        public static readonly string TextRightTouch = "has-text-right-touch";
        public static readonly string TextRightTabletOnly = "has-text-right-tablet-only";
        public static readonly string TextRightTablet = "has-text-right-tablet";
        public static readonly string TextRightDesktopOnly = "has-text-right-desktop-only";
        public static readonly string TextRightDesktop = "has-text-right-desktop";
        public static readonly string TextRightWidescreenOnly = "has-text-right-widescreen-only";
        public static readonly string TextRightWidescreen = "has-text-right-widescreen";
        public static readonly string TextRightFullhd = "has-text-right-fullhd";

        //Text transformation
        public static readonly string Capitalized = "is-capitalized";
        public static readonly string Lowercase = "is-lowercase";
        public static readonly string Uppercase = "is-uppercase";
        public static readonly string Italic = "is-italic";

        //Text Weight

        public static readonly string TextWeightLight = "has-text-weight-light";
        public static readonly string TextWeightNormal = "has-text-weight-normal";
        public static readonly string TextWeightMedium = "has-text-weight-medium";
        public static readonly string TextWeightSemibold = "has-text-weight-semibold";
        public static readonly string TextWeightBold = "has-text-weight-bold";

        //Font family
        public static readonly string FamilySansSerif = "is-family-sans-serif";
        public static readonly string FamilyMonospace = "is-family-monospace";
        public static readonly string FamilyPrimary = "is-family-primary";
        public static readonly string FamilySecondary = "is-family-secondary";
        public static readonly string FamilyCode = "is-family-code";


        #endregion

        #region Visibility
        public static readonly string Block = "is-block";
        public static readonly string Flex = "is-flex";
        public static readonly string Inline = "is-inline";
        public static readonly string InlineBlock = "is-inline-block";
        public static readonly string InlineFlex = "is-inline-flex";


        public static readonly string FlexMobile = "is-flex-mobile";
        public static readonly string FlexTouch = "is-flex-touch";
        public static readonly string FlexTabletOnly = "is-flex-tablet-only";
        public static readonly string FlexTablet = "is-flex-tablet";
        public static readonly string FlexDesktopOnly = "is-flex-desktop-only";
        public static readonly string FlexDesktop = "is-flex-desktop";
        public static readonly string FlexWidescreenOnly = "is-flex-widescreen-only";
        public static readonly string FlexWidescreen = "is-flex-widescreen";
        public static readonly string FlexFullhd = "is-flex-fullhd";

        public static readonly string BlockMobile = "is-block-mobile";
        public static readonly string BlockTouch = "is-block-touch";
        public static readonly string BlockTabletOnly = "is-block-tablet-only";
        public static readonly string BlockTablet = "is-block-tablet";
        public static readonly string BlockDesktopOnly = "is-block-desktop-only";
        public static readonly string BlockDesktop = "is-block-desktop";
        public static readonly string BlockWidescreenOnly = "is-block-widescreen-only";
        public static readonly string BlockWidescreen = "is-block-widescreen";
        public static readonly string BlockFullhd = "is-block-fullhd";

        public static readonly string InlineMobile = "is-inline-mobile";
        public static readonly string InlineTouch = "is-inline-touch";
        public static readonly string InlineTabletOnly = "is-inline-tablet-only";
        public static readonly string InlineTablet = "is-inline-tablet";
        public static readonly string InlineDesktopOnly = "is-inline-desktop-only";
        public static readonly string InlineDesktop = "is-inline-desktop";
        public static readonly string InlineWidescreenOnly = "is-inline-widescreen-only";
        public static readonly string InlineWidescreen = "is-inline-widescreen";
        public static readonly string InlineFullhd = "is-inline-fullhd";

        public static readonly string InlineBlockMobile = "is-inline-block-mobile";
        public static readonly string InlineBlockTouch = "is-inline-block-touch";
        public static readonly string InlineBlockTabletOnly = "is-inline-block-tablet-only";
        public static readonly string InlineBlockTablet = "is-inline-block-tablet";
        public static readonly string InlineBlockDesktopOnly = "is-inline-block-desktop-only";
        public static readonly string InlineBlockDesktop = "is-inline-block-desktop";
        public static readonly string InlineBlockWidescreenOnly = "is-inline-block-widescreen-only";
        public static readonly string InlineBlockWidescreen = "is-inline-block-widescreen";
        public static readonly string InlineBlockFullhd = "is-inline-block-fullhd";

        public static readonly string InlineFlexMobile = "is-inline-flex-mobile";
        public static readonly string InlineFlexTouch = "is-inline-flex-touch";
        public static readonly string InlineFlexTabletOnly = "is-inline-flex-tablet-only";
        public static readonly string InlineFlexTablet = "is-inline-flex-tablet";
        public static readonly string InlineFlexDesktopOnly = "is-inline-flex-desktop-only";
        public static readonly string InlineFlexDesktop = "is-inline-flex-desktop";
        public static readonly string InlineFlexWidescreenOnly = "is-inline-flex-widescreen-only";
        public static readonly string InlineFlexWidescreen = "is-inline-flex-widescreen";
        public static readonly string InlineFlexFullhd = "is-inline-flex-fullhd";

        //Hide
        public static readonly string HiddenMobile = "is-hidden-mobile";
        public static readonly string HiddenTouch = "is-hidden-touch";
        public static readonly string HiddenTabletOnly = "is-hidden-tablet-only";
        public static readonly string HiddenTablet = "is-hidden-tablet";
        public static readonly string HiddenDesktopOnly = "is-hidden-desktop-only";
        public static readonly string HiddenDesktop = "is-hidden-desktop";
        public static readonly string HiddenWidescreenOnly = "is-hidden-widescreen-only";
        public static readonly string HiddenWidescreen = "is-hidden-widescreen";
        public static readonly string HiddenFullhd = "is-hidden-fullhd";

        public static readonly string Invisible = "is-invisible";
        public static readonly string Hidden = "is-hidden";
        public static readonly string SrOnly = "is-sr-only";

        #endregion

        #region Flexbox
        //todo
        #endregion


        #region OtherClass
        public static readonly string Clearfix = "is-clearfix";
        public static readonly string PulledLeft = "is-pulled-left";
        public static readonly string PulledRight = "is-pulled-right";
        public static readonly string Overlay = "is-overlay";
        public static readonly string Clipped = "is-clipped";
        public static readonly string Radiusless = "is-radiusless";
        public static readonly string Shadowless = "is-shadowless";
        public static readonly string Unselectable = "is-unselectable";
        public static readonly string Clickable = "is-clickable";
        public static readonly string Relative = "is-relative";

        public static readonly string Fullwidth="is-fullwidth";

        #endregion

    }
}