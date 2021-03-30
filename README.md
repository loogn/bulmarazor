<h1 align="center">BulmaRazor Component</h1>

<div align="center">
<h2>A set of lightweight component libraries based on Bulma and Blazor.</h2>

[![Github build](https://img.shields.io/github/workflow/status/ArgoZhang/BootstrapBlazor/Package%20to%20Nuget/master?label=master&logo=github&logoColor=green)](https://github.com/ArgoZhang/BootstrapAdmin/actions?query=workflow%3A%22Auto+Build+CI%22+branch%3Amaster)
[![Nuget](https://img.shields.io/nuget/v/BulmaRazor.svg?color=red&logo=nuget&logoColor=green)](https://www.nuget.org/packages/BulmaRazor/)
[![Nuget](https://img.shields.io/nuget/dt/BulmaRazor.svg?logo=nuget&logoColor=green)](https://www.nuget.org/packages/BulmaRazor/)
[![Github](https://img.shields.io/github/license/loogn/bulmarazor.svg?logo=git&logoColor=red)](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)
[![Repo Size](https://img.shields.io/github/repo-size/loogn/BulmaRazor.svg?logo=github&logoColor=green&label=repo)](https://github.com/loogn/BulmaRazor)
[![Commit Date](https://img.shields.io/github/last-commit/loogn/BulmaRazor/master.svg?logo=github&logoColor=green&label=commit)](https://github.com/loogn/BulmaRazor)

</div>

---

<a href="README.md">English</a> | <span>中文</span>

---

## Features
- Lightweight UI designed for web applications.
- A set of high-quality Blazor components out of the box.
- Supports WebAssembly-based client-side and SignalR-based server-side UI event interaction.
- Supports Progressive Web Applications (PWA).
- Build with C#, a multi-paradigm static language for an efficient development experience.
- .NET5 based, with direct reference to the rich .NET ecosystem.
- Seamless integration with existing ASP.NET Core MVC and Razor Pages projects.

## Installation Guide
Install the Nuget package reference
```powershell
Install-Package BulmaRazor
```

## Usage

- Add BulmaRazor Service
    ```csharp
    services.AddBulmaRazor();
    ```
- Add Style and Scripts in _Host.cshtml or index.html
    ```xml
    <!--bulma.min.css can replace with customer bulma css-->
    <link href="_content/BulmaRazor/bulma.min.css" rel="stylesheet"/>
    <link href="_content/BulmaRazor/bulmarazor.min.css" rel="stylesheet" />
    <script src="_content/BulmaRazor/bulmarazor.min.js"></script>
    ```
- Import the Namespace in _Imports.razor
    ```xml
    @using BulmaRazor.Components
    ```
- Get started
    ```xml
    <Button Color="Color.Primary">Click</Button>
    ```



## Demo
[![website](https://img.shields.io/badge/linux-BulmaRazor-success.svg?logo=buzzfeed&logoColor=green)](https://bulmarazor.loogn.net) 

## Screenshots

![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Button.png "Button.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Panel.png "Panel.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Tabs.png "Tabs.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Timeline.png "Timeline.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Tooltip.png "Tooltip.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Message.png "Message.png")
![Log in to view](https://gitee.com/loogn/bulmarazor/raw/master/images/Cascader.png "Cascader.png")


## Agreement
[![Gitee license](https://img.shields.io/github/license/loogn/bulmarazor.svg?logo=git&logoColor=red)](https://gitee.com/loogn/bulmarazor/blob/master/LICENSE)


## Contribution

1. Fork
2. Create Feat_xxx branch
3. Commit
4. Create Pull Request

## Donate

If this project is helpful to you, please scan the QR code below for a cup of coffee.

<img src="https://gitee.com/loogn/bulmarazor/raw/master/images/coffeemoney.png" width="382px;" />



## Resources
- [Bulma](https://bulma.io/)
- [Blazor](https://blazor.net/docs/components/index.html)

## References
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