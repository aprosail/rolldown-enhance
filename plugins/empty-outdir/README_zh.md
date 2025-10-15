# Rolldown Plugin Empty Outdir

[en(English)](./README.md) |
[zh(中文)](./README_zh.md)

用于清空所有 Rolldown 输出目录的插件。

## 使用方法

将此插件添加到你的 Rolldown 配置中，它将清空所有 Rolldown 输出目录。

```ts
// rolldown.config.ts
import { defineConfig } from 'rolldown'
import emptyOutdir from "rolldown-plugin-empty-outdir"

export default defineConfig({
  plugins: [..., emptyOutdir()],
  ...
})
```

清空输出目录有三种模式：

- `"disable"`: 不清空输出目录。
- `"enable"`: 仅在 `root` 目录内清空输出目录。
- `"force"`: 即使输出目录在 `root` 目录外也清空。

默认情况下，它只会清空 `root`
目录内的输出目录。一旦要清空的输出目录在 `root`
目录外，将不会清空此类目录，并会打印警告信息。因为在有些情况下可能会删除 `root`
之外的内容，这种操作具有风险，可能也不是您想要的效果。

根目录默认为 `cwd`，你也可以像这样自定义此选项：

```ts
// rolldown.config.ts
import { defineConfig } from 'rolldown'
import emptyOutdir from "rolldown-plugin-empty-outdir"

const monorepoRoot = ...
export default defineConfig({
  plugins: [..., emptyOutdir({root: monorepoRoot})],
  ...
})
```

当你想要强制清空输出目录，即使它们可能不在 `root`
目录内。并且你了解风险，并确保可以处理此类情况时，你可以将 `mode`
设置为 `"force"`，如下所示：

```ts
// rolldown.config.ts
import { defineConfig } from 'rolldown'
import emptyOutdir from "rolldown-plugin-empty-outdir"

export default defineConfig({
  plugins: [..., emptyOutdir({mode: "force"})],
  ...
})
```

## 开源协议

本库以 [Apache 2.0 许可证](./LICENSE) 开源。
