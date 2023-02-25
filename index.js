const WShell = require('WScript.Shell')

const { readFileSync, writeFileSync, existsFileSync, deleteFileSync } = require('filesystem')
const { resolve, toWin32Sep, basename, extname } = require('pathname')
const { forEach, execCommand } = require('utility')
const { SPACE, LF, rLINE_SEP } = require('text')
const { isNumber } = require('typecheck')
const { unnamed } = require('argv')
const genGUID = require('genGUID')
const isCLI = require('isCLI')

if (isCLI(__filename)) {
    const args = unnamed.slice(1)
    console.log(execCommand(`${getCompiler()} ${args.join(SPACE)}`))
} else module.exports = {
    execScript,
    execSource,
    compile,
    pkg: __dirname
}

// methods
function execScript(input, Class, Method, ...params) {
    const source = readFileSync(resolve(process.cwd(), input), 'auto')
    return execSource(source, Class, Method, ...params)
}

function execSource(source, Class, Method, ...params) {
    let args = ""
    if (params.length) args = new Array(params.length).fill("").map((arg, i) => `$args[${i}]`).join(', ')
    const code = `
$Source = @"
${source}
"@
Add-Type -Language CSharp -TypeDefinition $Source
[${Class}]::${Method}(${args})
`.split(rLINE_SEP).join(LF)
    const temp = resolve(process.cwd(), genGUID() + '.ps1')

    try {
        console.weaklog(writeFileSync(temp, code, 'UTF-8'))
        const command = `powershell -ExecutionPolicy Bypass -File "${toWin32Sep(temp)}" ${params.map(param => convert(param)).join(SPACE)}`
        return execCommand(command)
    } catch (e) {
        throw e
    } finally {
        console.weaklog(deleteFileSync(temp))
    }
}

function compile(input, options = {}) {
    console.log(() => options)
    options.out = toWin32Sep(
        resolve(
            process.cwd(),
            (
                'out' in options
                    ? options.out
                    : basename(input, extname(input)) + ".exe"
            )
        )
    )
    const opts = Object.assign({
        target: "exe"
    }, options)

    let params = []
    forEach((value, key) => {
        params.push(`/${key}:${value}`)
    })(opts)

    const command = `${getCompiler()} ${params.join(" ")} ${toWin32Sep(resolve(process.cwd(), input))}`

    console.log(() => command)
    console.log(execCommand(command))
}

// util
function getCompiler() {
    return [
        "v4.0.30319",
        "V3.5",
        "V3.0",
        "v2.0.50727",
        "v1.1.4322",
        "v1.0.3705"
    ]
        .map((ver) => {
            return toWin32Sep(
                resolve(
                    WShell.ExpandEnvironmentStrings("%SystemRoot%"),
                    "Microsoft.NET/Framework",
                    ver,
                    "csc.exe"
                )
            )
        })
        .find(exe => existsFileSync(exe))
}

function convert(item) {
    if (item === true) return "$True"
    if (item === false) return "$False"
    if (item == null) return "$Null"
    if (isNumber(item)) {
        if (item !== item) "[double]::NaN"
        if (item === Number.POSITIVE_INFINITY) return "[double]::PositiveInfinity"
        if (item === Number.NEGATIVE_INFINITY) return "[double]::NegativeInfinity"
        return item
    }
    return `"${item}"`
}