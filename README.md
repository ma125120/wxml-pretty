# wxml-pretty README

该扩展可以提供美观的wxml文件格式化。

## 安装
直接在 vs code 插件扩展搜索 ``` wxml-pretty ```，安装即可

## 使用
保存格式化默认是关闭的，主要是考虑到可能已经有其他格式化的扩展，避免冲突。

可以在设置 -> wxml-pretty.format设置为true。

或在当前工作目录下的 ```.vscode/settings.json``` 文件中添加
```json
{
  "wxml-pretty.format": true,
  "wxml-pretty.maxWidth": 120, // 属性宽度大于该值时将会换行
}
```
开启保存自动格式化