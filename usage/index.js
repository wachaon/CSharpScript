
const { resolve } = require('pathname')
const { compile, execScript, execSource } = require('../index')
const { execCommand } = require('utility')
const { readFileSync } = require('filesystem')

const script = resolve(__dirname, 'example.cs')
const exe = resolve(__dirname, 'example.exe')

console.log(() => script)
console.log(() => exe)

console.log('compile')
compile(script, { out: exe })

console.log('execCommand')
console.log(execCommand(`${exe} foo`))

console.log('execScript')
console.log(execScript(script, 'Example', 'Main', 'bar'))

console.log('execSource')
console.log(execSource(readFileSync(script, 'auto'), 'Example', 'Main', 'baz'))