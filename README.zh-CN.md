<h1 align="center">BulmaRazor 组件库</h1>

<div align="center">

<h2>一套基于 Bulma 和 Blazor 的轻量级组件库</h2>

[![Nuget](https://img.shields.io/nuget/v/BulmaRazor.svg?color=red&logo=nuget&logoColor=green)](https://www.nuget.org/packages/BulmaRazor/)
[![Nuget](https://img.shields.io/nuget/dt/BulmaRazor.svg?logo=nuget&logoColor=green)](https://www.nuget.org/packages/BulmaRazor/)
[![Github](https://img.shields.io/github/license/loogn/bulmarazor.svg?logo=git&logoColor=red)](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/loogn/BulmaRazor.svg?logo=github&logoColor=green&label=repo)](https://github.com/loogn/BulmaRazor)
[![Commit Date](https://img.shields.io/github/last-commit/loogn/BulmaRazor/master.svg?logo=github&logoColor=green&label=commit)](https://github.com/loogn/BulmaRazor)

</div>

---

English | <a href="README.zh-CN.md">中文</a>

---

## 项目介绍
Blazor 是一个使用 .NET 生成交互式客户端 Web UI 的框架：

- 使用 C# 代替 JavaScript 来创建丰富的交互式 UI。
- 共享使用 .NET 编写的服务器端和客户端应用逻辑。
- 将 UI 呈现为 HTML 和 CSS，以支持众多浏览器，其中包括移动浏览器。

使用 .NET 进行客户端 Web 开发可提供以下优势：

- 使用 C# 代替 JavaScript 来编写代码。
- 利用现有的 .NET 生态系统。
- 在服务器和客户端之间共享应用逻辑。
- 受益于 .NET 的性能、可靠性和安全性。
- 始终高效支持 Windows、Linux 和 macOS 上的 Visual Studio。
- 支持 Net5
- 以一组稳定、功能丰富且易用的通用语言、框架和工具为基础来进行生成。

本项目是利用 Bulma 样式进行封装的 UI 组件库

## 安装
通过nuget引入BulmaRazor包
```powershell
Install-Package BulmaRazor
```

## 用法

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

## QQ交流群

[![QQ](https://img.shields.io/badge/QQ-995865650-red.svg?logo=tencent%20qq&logoColor=red)](https://qm.qq.com/cgi-bin/qm/qr?k=w91UOwbsm9XjtR9MFxmExzZWDGaqgcSg&jump_from=webapi) 

## 组件

Blazor 应用基于组件。 Blazor 中的组件是指 UI 元素，例如页面、对话框或数据输入窗体。

组件是内置到 .NET 程序集的 .NET 类，用来：
- 定义灵活的 UI 呈现逻辑。
- 处理用户事件。
- 可以嵌套和重用。
- 可以作为 Razor 类库或 NuGet 包共享和分发。


内置组件 [传送门](https://bulmarazor.loogn.net)

## 分支说明

- master 稳定分支
- dev 开发功能分支
- 其他 均为临时分支

## 演示地址
[![website](https://img.shields.io/badge/linux-BulmaRazor-success.svg?logo=buzzfeed&logoColor=green)](https://bulmarazor.loogn.net) 

## 项目截图

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Button.png "Button.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Panel.png "Panel.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Tabs.png "Tabs.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Timeline.png "Timeline.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Tooltip.png "Tooltip.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Message.png "Message.png")  

![登录可查看](https://gitee.com/loogn/bulmarazor/raw/master/images/Cascader.png "Cascader.png") 




## 开源协议
[![Gitee license](https://img.shields.io/github/license/loogn/bulmarazor.svg?logo=git&logoColor=red)](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)


## 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

## 捐助

如果这个项目对您有所帮助，请扫下方二维码打赏一杯咖啡。

<img src="https://gitee.com/loogn/bulmarazor/raw/master/images/coffeemoney.png" width="382px;" />



## 相关资源
- [Bulma官网](https://bulma.io/)
- [Blazor微软文档](https://blazor.net/docs/components/index.html)

## 相关引用
- [foundation-datepicker](http://foundation-datepicker.peterbeno.com/)
- [jscolor](https://jscolor.com/)
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
