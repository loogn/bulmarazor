# BulmaRazor 

中文名字:布尔玛·瑞  
官网地址: [http://bulmarazor.loogn.net/](http://bulmarazor.loogn.net/)  

Bulma 是一个基于 Flexbox 构建的免费、开源的 CSS
框架，已经有超过200,000开发者在使用。而BulmaRazor是基于Bulma样式框架开发的一套适用于Blazor的组件库。
qq交流群:995865650
![qq群:995865650](http://bulmarazor.loogn.net/images/qqqun.png)

# 安装
通过nuget引入BulmaRazor包
```powershell
Install-Package BulmaRazor
```

# 用法

- 在Startup中添加服务
    ```csharp
    services.AddBulmaRazor();
    ```
- _Host.cshtml或者index.html中引入样式和脚本
    ```xml
    <!--bulma.min.css可以使用自定义皮肤替换-->
    <link href="_content/BulmaRazor/bulma.min.css" rel="stylesheet"/>
    <link href="_content/BulmaRazor/bulmarazor.min.css" rel="stylesheet" />
    <script src="_content/BulmaRazor/bulmarazor.min.js"></script>
    ```
- 在_Imports.razor中导入名称空间
    ```xml
    @using BulmaRazor.Components
    ```
- 开始使用,组件元素名对应Bulma.css中的类名
    ```xml
    <Button Color="Color.Primary">Click</Button>
    ```
# 包含的组件

*☆代表稳定性,最高五颗星*

- Columns
	- Column :		☆☆☆☆☆
- Layout
	- Container :		☆☆☆☆☆
	- Footer :		☆☆☆☆☆
	- Hero :			☆☆☆☆
	- Level :			☆☆☆☆☆
	- Media :			☆☆☆☆☆
	- Section :		☆☆☆☆☆
	- Tile :			☆☆☆☆☆
	- Divider : 		☆☆☆☆☆
- Form
	- Input:			☆☆☆☆☆
	- CheckBox:		☆☆☆☆☆
	- Switch:		☆☆☆☆
	- Radio:			☆☆☆☆☆
	- Select:			☆☆☆☆ 不支持多选
	- Textarea:		☆☆☆☆☆
	- Field:			☆☆☆☆☆
	- Help:			☆☆☆☆☆
	- Label:			☆☆☆☆☆
	- Control:		☆☆☆☆☆
	- File:			☆☆☆☆☆
    - TagsInput:	☆☆☆
    - DatePicker:   ☆☆☆
    - TuiEditor:    ☆☆☆
- Components 
  -   DataTable     ☆☆☆
	- Breadcrumb :	☆☆☆☆
	- Card :			☆☆☆☆☆
	- Dropdown ：		☆☆☆☆
	- Menu ：			☆☆☆
	- Message ：		☆☆☆☆☆
	- Modal ：		☆☆☆☆☆
	- Navbar ：		☆☆☆☆
	- Pagination ：	☆☆☆☆
	- Panel :			☆☆☆☆☆
    - Tabs :	☆☆☆☆	
    - Timeline :	☆☆☆☆
    - Collapse:     ☆☆☆☆
- Elements
	- Block :			☆☆☆☆☆
	- Box :			☆☆☆☆☆
	- Button :		☆☆☆☆☆
	- Content :		☆☆☆☆☆
	- Delete :		☆☆☆☆☆
	- Icon :			☆☆☆☆☆
	- Image ：		☆☆☆☆☆
	- Notification ：	☆☆☆☆☆
	- Progress ：		☆☆☆☆☆
	- Table ：		☆☆☆☆☆
	- Tag ：			☆☆☆☆☆
	- Badge ：		☆☆☆
	- Title ：		☆☆☆☆☆
    - Tooltip ：	☆☆☆☆
    - BlockList ：	☆☆☆☆
    - Pageloader:   ☆☆☆☆
	

# 许可

[MIT](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)  @ loogn

# 相关项目

- [Bulma官网](https://bulma.io/)
- [Blazor微软文档](https://blazor.net/docs/components/index.html)
- [Bulma中文网](https://bulma.zcopy.site/)
- [bulma-calendar](https://github.com/Wikiki/bulma-calendar)
- [bulma-checkradio](https://github.com/Wikiki/bulma-checkradio)
- [bulma-collapsible](https://github.com/CreativeBulma/bulma-collapsible)
- [bulma-badge](https://github.com/CreativeBulma/bulma-badge)
- [bulma-divider](https://github.com/CreativeBulma/bulma-divider)
- [bulma-pageloader](https://github.com/Wikiki/bulma-pageloader)
- [bulma-quickview](https://github.com/Wikiki/bulma-quickview)
- [bulma-carousel](https://github.com/Wikiki/bulma-carousel)
- [bulma-ribbon](https://github.com/Wikiki/bulma-ribbon)
- [bulma-switch](https://github.com/Wikiki/bulma-switch)
- [bulma-timeline](https://github.com/Wikiki/bulma-timeline)
- [bulma-slider](https://github.com/Wikiki/bulma-slider)
- [bulma-tooltip](https://github.com/CreativeBulma/bulma-tooltip)
- [bulma-o-steps](https://github.com/octoshrimpy/bulma-o-steps)
- [bulma-tagsinput](https://github.com/CreativeBulma/bulma-tagsinput)



