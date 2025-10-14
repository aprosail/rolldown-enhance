# Rolldown 插件 TSConfig 路径解析

[en(English)](./README.md) |
[zh(中文)](./README_zh.md)

为 Rolldown 解析 tsconfig 中的路径映射的插件。

这个插件将帮助您从默认或指定的 `tsconfig.json` / `tsconfig.xxx.json`
文件，或已解析的 tsconfig 对象中解析路径映射，然后修改 Rolldown 的
`resolve.alias` 选项。您只需要一行代码即可在 Rolldown 中支持 tsconfig 别名。

## 使用方法

默认情况下，它会检测当前工作目录中的 `tsconfig.json` 文件。

```ts
// rolldown.config.ts
import { defineConfig } from "rolldown"

export default defineConfig({
  plugins: [tsconfigPaths()],
  ...
})
```

您也可以自定义 tsconfig 路径：

```ts
// rolldown.config.ts
import { join } from "node:path"
import { defineConfig } from "rolldown"

const root = import.meta.dirname
export default defineConfig({
  plugins: [tsconfigPaths(join(root, "tsconfig.xxx.json"))],
  ...
})
```

您也可以自定义 tsconfig 对象：

```ts
// rolldown.config.ts
import { defineConfig } from "rolldown"

export default defineConfig({
  plugins: [tsconfigPaths({ compilerOptions: { ... } })],
  ...
})
```

## 开源许可证

本包以 [Apache 2.0 许可证](./LICENSE) 开源。
