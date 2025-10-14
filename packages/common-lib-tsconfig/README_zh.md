# Common Lib TSConfig

用于库开发的通用 tsconfig.json 模板。

## 使用方法

从本包导出的 tsconfig 文件复用代码，可使你的 tsconfig.json 文件更加简洁：

```jsonc
{
  // tsconfig.json 或 tsconfig.xxx.json
  "extends": "common-lib-tsconfig/tsconfig.json",
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    // 在此处覆盖默认的编译器选项...
  },
}
```

## 开源协议

本包以 [Apache 2.0 许可证](./LICENSE) 开源。
