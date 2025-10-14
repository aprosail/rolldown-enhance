# Current Changelog

[en(English)](./README.md) |
[zh(中文)](./README_zh.md)

用于解析当前或指定版本变更日志文本的命令行工具。
该包提供了命令行工具和可供开发者在其他项目中使用的 API 导出。

## 使用方法

### 命令行工具

```bash
current-changelog                     # 默认自动检测
current-changelog -h                  # 显示帮助信息
current-changelog -v 1.0.0            # 指定版本
current-changelog -f CHANGELOG.xxx.md # 指定变更日志文件
current-changelog -o CHANGELOG.md     # 输出到指定文件

current-changelog check 1.2.3 # 检查版本是否匹配 package.json 中的配置
```

### API 库

```ts
import currentChangelog from "current-changelog"

currentChangelog() // 默认自动检测
currentChangelog({ version: "1.0.0" }) // 指定版本
currentChangelog({ file: "CHANGELOG.xxx.md" }) // 指定变更日志文件
currentChangelog({ code: "..." }) // 指定变更日志内容
currentChangelog({ workdir: "..." }) // 指定工作目录
```

注意在 CommonJS 模式下，你需要使用 `default`
来访问默认导出的函数，如下所示：

```js
const currentChangelog = require("current-changelog").default
```

或：

```js
const { default: currentChangelog } = require("current-changelog")
```

## Open Source License

本包基于 [Apache 2.0 许可证](./LICENSE) 发布。
