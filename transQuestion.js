var fs = require('fs')
var path = require('path')
var Questions1 = require('./app/Questions1.json')
var Questions2 = require('./app/Questions2.json')
var Questions3 = require('./app/Questions3.json')
var Questions4 = require('./app/Questions4.json')
var Questions5 = require('./app/Questions5.json')

var json = JSON.stringify(Questions1)
json += JSON.stringify(Questions2)
json += JSON.stringify(Questions3)
json += JSON.stringify(Questions4)
json += JSON.stringify(Questions5)

var jsdom = require('jsdom')
var data = fs.readFileSync('./font_replace.html', 'utf-8')
var html = data.replace('{{WORDS}}', json)
fs.writeFile(path.join(__dirname, 'font.html'), html)

