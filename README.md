# 点云前端项目——小程序模板说明

[TOC]

## 说明

此模板是基于京东[Taro.js](https://taro-docs.jd.com/docs) v3.6.20 多端框架 + [NutUI-React](https://nutui.jd.com/taro/react/2x/#/zh-CN/guide/intro-react) 小程序 UI 组件库，并结合了目前部分业务特殊性所封装的一套小程序开发模板，开发人员可基于此模板快速进行开发业务功能;

## 下载方式

- 使用内网环境 Gitlab 地址下载 [模板地址](http://192.168.101.96:8090/pointcloud_frontend/basiclibrary/pcloud-template-miniprogram.git);

- 使用点云前端脚手架`pcloud-cli`, npm 全局安装后, 执行命令 `pcloud create [文件夹名称]`,依照提示选择模板下载即可;

## 目录结构

```
|-- 📁 config 项目编译配置目录
| |-- 📄 dev.js 开发环境配置文件
| |-- 📄 index.js 默认配置文件
| |-- 📄 prod.js 生产环境配置文件
|-- 📁 src 源码目录
| |-- 📁 assets 静态资源目录(存放小图片、图标等)
| |-- 📁 components 通用组件目录
| |-- 📁 pages 页面文件目录
| |   └── 📁 index              index 页面目录
| |       ├──📄 index.config.js index 页面配置
| |       ├──📄 index.scss      index 页面样式
| |       ├──📄 index.tsx       index 页面文件
| |       └──📄 interface.ts    index ts类型定义文件
| |-- 📁 service 数据请求目录
| | |-- 📄 request.ts 全局请求配置文件
| | |-- 📄 prefix.ts 请求路径前缀配置文件
| |-- 📄 app.config.ts 项目入口配置
| |-- 📄 app.scss 主样式文件
| |-- 📄 app.ts 入口文件
|-- 📁 types ts类型定义目录
|-- 📄 babel.config.js Babel 配置
|-- 📄 project.config.json 项目配置文件
|-- 📄 project.private.config.json 项目私有配置文件
|-- 📄 project.tt.json 抖音小程序配置文件
|-- 📄 tsconfig.json ts 配置文件
```

更多配置请参考 Taro 官方文档。

## 功能特性

- **内置登录功能**
  模板中内置了登录功能,开发者只需要针对页面进行定制化开发，具体代码逻辑无需过多更改，只需修改后台对应的地址即可;
- **内置图片上传组件`ImagePicker`**
  基于特殊业务场景,模板中内置了基于后台`minio`的图片上传组件,组件内内置上传、删除、编辑等逻辑处理,开发者只需根据具体项目替换请求的 url 即可;
- **内置图片展示组件`ImageList`**
  图片列表展示组件支持多图片展示,支持图片预览及滑动切换;
- **封装统一请求**
  模板中已经封装了业务请求文件`request.ts`,包含拦截器及各类 http/https 请求类型, 并对接口错误响应有统一处理;
- **跨端兼容**
  Taro.js 本身就是一套跨端框架,支持小程序、App、H5、PC 应用,基于此模板开发亦可选择不同的环境进行开发;

## 注意事项

- Node.js 版本建议 `>=16.20.0`, 包管理器建议`npm`, 若使用`pnpm`,建议使用高版本,经验证,个别版本的 pnpm 安装的 nut-ui 组件库会有兼容问题;
- 项目配置文件 project.config.json 中的`projectname`、`description`, `appid`字段建议自行设置;
- 采用微信小程序开发时,要特别注意各个页面的分包大小,components 目录虽然是通用组件目录，但基于小程序规则限制,所以非必要时不在此目录中存储过多文件;
  [小程序分包指南](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html)
  [代码包体积优化指南](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips/start_optimizeA.html)
- 采用微信小程序开发时,建议下载微信开发者工具配合开发;
- 由于此模板的基础依赖一直处于迭代更新中,开发者可根据具体的项目情况，自行升级 Taro、NutUI 等依赖包,以便达到更好的体验;
