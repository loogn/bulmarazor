using System.Collections.Generic;
using BulmaRazor.Utils;

namespace BulmaRazor.Components
{
    /// <summary>
    /// 
    /// </summary>
    public class TagsInputOptions
    {
        /// <summary>
        /// When true, the same tag can be added multiple times. def false
        /// </summary>
        public bool? AllowDuplicates { get; set; }

        /// <summary>
        /// When true, duplicate tags value check is case sensitive. def true
        /// </summary>
        public bool? CaseSensitive { get; set; }

        /// <summary>
        /// When true, tags will be unselected when new tag is entered. def false
        /// </summary>
        public bool? ClearSelectionOnTyping { get; set; }

        /// <summary>
        /// When true, datalist will close automatically after an item have been selected. def true
        /// </summary>
        public bool? CloseDropdownOnItemSelect { get; set; }

        /// <summary>
        /// Multiple tags can be added at once. Delimiter is used to separate all tags. def ","
        /// </summary>
        public string Delimiter { get; set; }

        /// <summary>
        /// When true, tags can be entered manually. This option is useful with select Tags inputs. Set to false automatically when using on select element.def true
        /// </summary>
        public bool? FreeInput { get; set; }

        /// <summary>
        /// When true, if allowDuplicates option if false then the already existing tag will be temporarly and visually identified as duplicate
        /// Boolean	true
        /// </summary>
        public bool? HighlightDuplicate { get; set; }


        /// <summary>
        /// When true, identified matches strings when searching is highlighted.	Boolean	true
        /// </summary>
        public bool? HighlightMatchesString { get; set; }

        /// <summary>
        /// When adding objects as tags, you can set itemText to the name of the property of item to use for a its tag’s text. When this options is not set, the value of itemValue will be used.
        /// String	undefined
        /// </summary>
        internal string ItemText { get; set; }

        /// <summary>
        /// When adding objects as tags, itemValue must be set to the name of the property containing the item’s value.
        /// String	undefined
        /// </summary>
        internal string ItemValue { get; set; }

        /// <summary>
        /// When set, no more than the given number of tags are allowed to add.
        /// Integer	undefined
        /// </summary>
        public int? MaxTags { get; set; }

        /// <summary>
        /// Defines the maximum length of a single tag.
        /// Integer	undefined
        /// </summary>
        public int? MaxChars { get; set; }

        /// <summary>
        /// 	Defines the minimum length of a single tag.	Integer	1
        /// </summary>
        public int? MinChars { get; set; }

        /// <summary>
        /// Empty dropdown label.	String	No results found
        /// </summary>
        public string NoResultsLabel { get; set; }

        /// <summary>
        /// TagsInput placeholder text if original input doesn’t have one.
        /// String	undefined
        /// </summary>
        public string Placeholder { get; set; }

        /// <summary>
        /// When true, tags are removable either using the associted delete button or backspace and delete keys.
        /// Boolean	true
        /// </summary>
        public bool? Removable { get; set; }

        /// <summary>
        /// searchMinChars	Defines the minimum length of input value before loading auto-complete.
        /// Integer	1 
        /// </summary>
        public int? SearchMinChars { get; set; }

        /// <summary>
        /// Defines on what dropdown item data do we search the entered value. Possible value: ‘value’ or ‘text’.	String	text
        /// </summary>
        internal string SearchOn { get; set; }

        /// <summary>
        /// When true, tags can be selected either by mouse click or using left or right arrow keys.
        /// Boolean	true
        /// </summary>
        public bool? Selectable { get; set; }

        /// <summary>
        /// source	Source of data proposed in dropdown (used for auto-complete).
        /// Can be one of the following types:
        /// Array of Strings / Objects
        /// Function => Array of Strings / Objects
        /// Promise => Array of Strings / Objects.
        /// undefined
        /// </summary>
        public IEnumerable<string> Source { get; set; }

        /// <summary>
        /// Classname applied to each tag.	String	is-rounded
        /// </summary>
        public string TagClass { get; set; }

        /// <summary>
        /// When true, automatically removes all whitespace around tags.
        /// Boolean	true
        /// </summary>
        public bool? Trim { get; set; }

        internal JsParams ToParams()
        {
            JsParams ps = new JsParams();
            
            ps.AddNotNull("allowDuplicates",AllowDuplicates);
            ps.AddNotNull("caseSensitive",CaseSensitive);
            ps.AddNotNull("clearSelectionOnTyping",ClearSelectionOnTyping);
            ps.AddNotNull("closeDropdownOnItemSelect",CloseDropdownOnItemSelect);
            ps.AddNotNull("delimiter",Delimiter);
            ps.AddNotNull("freeInput",FreeInput);
            ps.AddNotNull("highlightDuplicate",HighlightDuplicate);
            ps.AddNotNull("highlightMatchesString",HighlightMatchesString);
            ps.AddNotNull("itemValue",ItemValue);
            ps.AddNotNull("itemText",ItemText);
            ps.AddNotNull("maxTags",MaxTags);
            ps.AddNotNull("maxChars",MaxChars);
            ps.AddNotNull("minChars",MinChars);
            ps.AddNotNull("noResultsLabel",NoResultsLabel);
            ps.AddNotNull("placeholder",Placeholder);
            ps.AddNotNull("removable",Removable);
            ps.AddNotNull("searchMinChars",SearchMinChars);
            ps.AddNotNull("searchOn",SearchOn);
            ps.AddNotNull("selectable",Selectable);
            ps.AddNotNull("source",Source);
            ps.AddNotNull("tagClass",TagClass);
            ps.AddNotNull("trim",Trim);
            return ps;
        }
    }
}