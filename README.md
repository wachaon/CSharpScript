# csharpscript

*C#* コードのコンパイルやコンパイルせずに実行できる *wes* のモジュールになります。

## インストール

```bash
wes install @wachaon/csharpscript --bare
```

## `compile(input, options)`

`input` のファイルをコンパイルします。`options` はコンパイルオプションを列挙します。
コンパイル後の実行ファイルは既定値で `input` のファイル名 + `.exe` になります。

| arg | type | description |
| --- | --- | --- |
| `input` | `{String}` | ファイル名 |
| `options` | `{Object}` | *csc.exe* のコンパイルオプション |

## `execScript(input, Class, Method, ...params)`

`input` のファイルをコンパイルせずに実行します。`input` のファイルを読み込んで `execSource` に渡してます。

| arg | type | description |
| --- | --- | --- |
| `input` | `{String}` | ファイル名 |
| `Class` | `{String}` | 実行するメソッドを保有するクラス名 |
| `Method` | `{String}` | 実行するメソッド名 |
| `params` | `{any}` | メソッドに渡す引数 |

## `execSource(source, Class, Method, ...params)`

`source` のスクリプトをコンパイルせずに実行します。

| arg | type | description |
| --- | --- | --- |
| `input` | `{String}` | ファイル名 |
| `Class` | `{String}` | 実行するメソッドを保有するクラス名 |
| `Method` | `{String}` | 実行するメソッド名 |
| `params` | `{any}` | メソッドに渡す引数 |

## `pkg`

*csharpscript* があるディレクトリのパス。
*csharpscript* を内包したパッケージを作成する際に必要になります。

## *csharpscript* を内包したパッケージを作成する

```
current_directory ┬ wes_modules ─ csharpscript ─ index.js
                  ├ src ┬ foo.cs
                  │     └ bar.cs
                  └ index.js
```

```csharp:current_directory/src/foo.js
// current_directory/src/foo.js
using System;

public class Foo {
    public static void Main (params string[] args) {
        Console.WriteLine(args[0]);
    }
}
```

```javascript:current_directory/index.js
// current_directory/index.js
const { execScript } = require('csharpscript')
const { resolve } = require('pathname')

const foo_cs = resolve(__dirname, 'src/foo.cs')
console.log(execScript(foo_cs, 'Foo', 'Main', 'Hello World'))
```