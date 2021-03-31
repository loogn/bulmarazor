using System;
using System.Collections.Generic;
using BulmaRazor.Utils;
using Microsoft.AspNetCore.Components;

namespace BulmaRazor.Components
{
    public class TuiEditorOptions
    {
        internal string elid { get; set; }

        /// <summary>
        /// Editor's height style value. Height is applied as border-box ex) '300px', '100%', 'auto'
        /// </summary>
        public string Height { get; set; }

        /// <summary>
        /// Editor's min-height style value in pixel ex) '300px'
        /// </summary>
        public string MinHeight { get; set; } 

        /// <summary>
        /// Editor's initial value
        /// </summary>
        internal string InitialValue { get; set; }

        /// <summary>
        /// Markdown editor's preview style (tab, vertical)
        /// </summary>
        public string PreviewStyle { get; set; }

        /// <summary>
        /// Highlight a preview element corresponds to the cursor position in the markdwon editor
        /// </summary>
        public bool? PreviewHighlight { get; set; }

        /// <summary>
        /// Initial editor type (markdown, wysiwyg)
        /// </summary>
        public string InitialEditType { get; set; }

        /// <summary>
        /// language
        /// </summary>
        public string Language { get; set; } = "zh-CN";

        /// <summary>
        /// whether use keyboard shortcuts to perform commands
        /// </summary>
        public bool? UseCommandShortcut { get; set; }

        /// <summary>
        /// use default htmlSanitizer
        /// </summary>
        public bool? UseDefaultHTMLSanitizer { get; set; }

        /// <summary>
        /// send hostname to google analytics
        /// </summary>
        public bool? UsageStatistics { get; set; } = false;

        /// <summary>
        /// toolbar items.
        /// heading,bold,italic,strike,divider,hr,quote,divider,ul,ol,task,indent,outdent,divider,table,image,link,divider,code,codeblock
        /// </summary>
        public IEnumerable<string> ToolbarItems { get; set; }

        /// <summary>
        /// hide mode switch tab bar
        /// </summary>
        public bool? HideModeSwitch { get; set; } 

        /// <summary>
        /// The placeholder text of the editable element.
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// whether use the front matter
        /// </summary>
        public bool? FrontMatter { get; set; } 
        public bool? Viewer { get; set; }

        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            var def = BulmaRazorOptions.DefaultOptions.TuiEditorOptions;
            ps.AddNotNull("elid", elid);
            ps.AddNotNull("viewer",Viewer);
            ps.AddNotNull("height", Height ?? def.Height);
            ps.AddNotNull("minHeight", MinHeight ?? def.MinHeight);
            ps.AddNotNull("initialValue", InitialValue ?? def.InitialValue);
            ps.AddNotNull("previewStyle", PreviewStyle ?? def.PreviewStyle);
            ps.AddNotNull("previewHighlight", PreviewHighlight ?? def.PreviewHighlight);
            ps.AddNotNull("initialEditType", InitialEditType ?? def.InitialEditType);
            ps.AddNotNull("language", Language ?? def.Language);
            ps.AddNotNull("useCommandShortcut", UseCommandShortcut ?? def.UseCommandShortcut);
            ps.AddNotNull("useDefaultHTMLSanitizer", UseDefaultHTMLSanitizer ?? def.UseDefaultHTMLSanitizer);
            ps.AddNotNull("usageStatistics", UsageStatistics ?? def.UsageStatistics);
            ps.AddNotNull("toolbarItems", ToolbarItems ?? def.ToolbarItems);
            ps.AddNotNull("hideModeSwitch", HideModeSwitch ?? def.HideModeSwitch);
            ps.AddNotNull("placeholder", Placeholder ?? def.Placeholder);
            ps.AddNotNull("frontMatter", FrontMatter ?? def.FrontMatter);

            return ps;
        }
    }
}