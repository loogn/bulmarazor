using System;
using System.Collections.Generic;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 轮播组件参数
    /// </summary>
    public class CarouselOptions
    {
        ///<summary>
        ///Initial item index	0
        /// </summary>
        public int? InitialSlide { get; set; }

        ///<summary>
        ///Slide to scroll on each step	1
        /// </summary>
        public int? SlidesToScroll { get; set; }

        ///<summary>
        ///Slides to show at a time	1
        /// </summary>
        public int? SlidesToShow { get; set; }

        ///<summary>
        ///Display navigation buttons	true
        /// </summary>
        public bool? Navigation { get; set; }

        ///<summary>
        ///Enable navigation with arrow keys	true
        /// </summary>
        public bool? NavigationKeys { get; set; }

        ///<summary>
        ///Enable swipe navigation	true
        /// </summary>
        public bool? NavigationSwipe { get; set; }

        ///<summary>
        ///Display pagination bullets	true
        /// </summary>
        public bool? Pagination { get; set; }

        ///<summary>
        ///Activate loop display mode	false
        /// </summary>
        public bool? Loop { get; set; }

        ///<summary>
        ///Activate infinite display mode	false
        /// </summary>
        public bool? Infinite { get; set; }

        ///<summary>
        ///Animation effect for item transition (translate|fade)	translate
        /// </summary>
        public string Effect { get; set; }

        ///<summary>
        ///Transition animation duration (in ms)	300
        /// </summary>
        public int? Duration { get; set; }

        ///<summary>
        ///Transiation animation type	ease
        /// </summary>
        public string Timing { get; set; }

        ///<summary>
        ///Autoplay carousel	false
        /// </summary>
        public bool? Autoplay { get; set; }

        ///<summary>
        ///Time between each transition when autoplay is active (ms)	3000
        /// </summary>
        public int? AutoplaySpeed { get; set; }

        ///<summary>
        ///Stop autoplay when cursor hover carousel	true
        /// </summary>
        public bool? PauseOnHover { get; set; }

        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.CarouselOptions;
            ps.AddNotNull("initialSlide", InitialSlide ?? def.InitialSlide);
            ps.AddNotNull("slidesToScroll", SlidesToScroll ?? def.SlidesToScroll);
            ps.AddNotNull("slidesToShow", SlidesToShow ?? def.SlidesToShow);
            ps.AddNotNull("navigation", Navigation ?? def.Navigation);
            ps.AddNotNull("navigationKeys", NavigationKeys ?? def.NavigationKeys);
            ps.AddNotNull("navigationSwipe", NavigationSwipe ?? def.NavigationSwipe);
            ps.AddNotNull("pagination", Pagination ?? def.Pagination);
            ps.AddNotNull("loop", Loop ?? def.Loop);
            ps.AddNotNull("infinite", Infinite ?? def.Infinite);
            ps.AddNotNull("effect", Effect ?? def.Effect);
            ps.AddNotNull("duration", Duration ?? def.Duration);
            ps.AddNotNull("timing", Timing ?? def.Timing);
            ps.AddNotNull("autoplay", Autoplay ?? def.Autoplay);
            ps.AddNotNull("autoplaySpeed", AutoplaySpeed ?? def.AutoplaySpeed);
            ps.AddNotNull("pauseOnHover", PauseOnHover ?? def.PauseOnHover);
            return ps;
        }
    }
}