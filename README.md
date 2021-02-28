# BulmaRazor 

中文名字:布尔玛·瑞  
官网地址: [http://bulmarazor.loogn.net/](http://bulmarazor.loogn.net/)  

Bulma 是一个基于 Flexbox 构建的免费、开源的 CSS 框架，已经有超过200,000开发者在使用。而BulmaRazor是基于Bulma样式框架开发的一套适用于Blazor的组件库。

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
- _Host.cshtml或者index.html中引入样式
    ```css
    <link href="_content/BulmaRazor/bulma.css" rel="stylesheet" />
    如果使用图标,可以添加如下引用
    <link href="_content/BulmaRazor/font-awesome/css/font-awesome.css" rel="stylesheet" />
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
	- Hero :			☆☆☆☆☆
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
	- Select:			☆☆☆ 不支持多选
	- Textarea:		☆☆☆☆☆
	- Field:			☆☆☆☆☆
	- Help:			☆☆☆☆☆
	- Label:			☆☆☆☆☆
	- Control:		☆☆☆☆☆
	- File:			☆☆☆☆☆
- Components 
  -   DataTable     ☆
	- Breadcrumb :	☆☆☆☆
	- Card :			☆☆☆☆☆
	- Dropdown ：		☆☆☆☆☆
	- Menu ：			☆☆☆
	- Message ：		☆☆☆☆☆
	- Modal ：		☆☆☆☆☆
	- Navbar ：		☆☆☆☆
	- Pagination ：	☆☆☆☆
	- Panel :			☆☆☆☆☆
    - Tabs :	☆☆☆☆	
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
	

# 许可

[MIT](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)  @ loogn

# 感谢

- [Bulma官网](https://bulma.io/)
- [Bulma中文网](https://bulma.zcopy.site/)


