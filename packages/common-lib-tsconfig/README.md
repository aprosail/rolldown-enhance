# Common Lib TSConfig

Common tsconfig.json templates for libraries development.

## Usage

Extends tsconfig files exported from this package
to make your tsconfig.json file more concise:

```jsonc
{
  // tsconfig.json or tsconfig.xxx.json
  "extends": "common-lib-tsconfig/tsconfig.json",
  "include": ["src/**/*.ts"],
  "compilerOptions": {
    // Override default compiler options here...
  },
}
```

## Open Source License

This package is released under the [Apache 2.0 License](./LICENSE).
