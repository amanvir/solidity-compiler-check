import glob from 'glob'
import fs from 'fs'
import bugsbyVersion from './data/bugs_by_version.json'
import bugs from './data/bugs.json'
import parser from './parser/parser'
import Table from 'cli-table3'

const path = process.argv[2]

glob(`${path}/*.sol`, (err, files) => {
    files.forEach(filename => {
        const fileContent = fs.readFileSync(filename, "utf8")
        const p = new parser()
        const parsed = p.parse(fileContent)
        const extractedVersion = p.extractVersion(parsed)

        //remove the ^ if it exists 
        const version = extractedVersion.replace('^', '')

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
            head: ['Name', 'Summary', 'Severity', 'Link'], 
            colWidths: [30, 50, 20, 80]
        })
        
        //display
        foundBugs.forEach(bug => {
            const b = bug[0]
            table.push([b.name, b.summary, b.severity, b.link])
        })

        console.log(table.toString())
    })
})