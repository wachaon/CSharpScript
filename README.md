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


## *csharpscript* を内包したパッケージを作成する

```
current_directory ┬ wes_modules ─ csharpscript ─ index.js
                  ├ src ┬ foo.cs
                  │     └ bar.cs
                  └ index.js
```


```javasctip:current_directory/index.js
const { compile } = require('csharpscript')
const { resolve } = require('pathname')

const foo_cs = resovle(__dirname, 'src/foo.cs')

```