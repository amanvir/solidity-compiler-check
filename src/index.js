import glob from 'glob'
import fs from 'fs'
import nodepath from 'path'
import bugsbyVersion from './data/bugs_by_version.json'
import bugs from './data/bugs.json'
import parser from './parser/parser'
import Table from 'cli-table3'

//otherwise assume it's a path
const InFiles = (path) => {
    glob(`${path}/*.sol`, (err, files) => {
        files.forEach(fileName => {
            FindBugs(fileName)
        })
    })
}

const FindBugs = (fileName) => {
    const fileContent = fs.readFileSync(fileName, "utf8")
    const p = new parser()
    const parsed = p.parse(fileContent)
    const extractedVersion = p.extractVersion(parsed)

    //remove the ^ if it exists 
    const version = extractedVersion.replace('^', '')

    console.log(`\n\nFile name: ${fileName}, Version: ${version}`)

    if(!bugsbyVersion[version]) {
        //todo: automatically update databases 
        console.log(`Need to update database...`)
        return
    }

    let foundBugs = []

    //find the bugs 
    if(bugsbyVersion[version].bugs.length > 0) {
        bugsbyVersion[version].bugs.forEach(bug => {
            const found = bugs.filter(b => b.name == bug)
            foundBugs.push(found)
        })
    }

    let table = new Table({
        head: ['Name', 'Link', 'Severity']
    })
    
    //display
    foundBugs.forEach(bug => {
        const b = bug[0]
        table.push([b.name, b.link, b.severity])
    })

    console.log(table.toString())
}


const path = process.argv[2]

if(!path) {
    console.log(`
        Usage: sol-compiler-check [filename.sol || file path]
    `)

    process.exit()
}

//just a file?
path.endsWith('.sol') ? FindBugs(nodepath.join(process.cwd(), path)) : InFiles(path)
