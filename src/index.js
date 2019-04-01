import glob from 'glob'

const path = process.argv[0]

glob(`${path}/*.sol`, (err, files) => {
    files.forEach(file => 
        console.log(file)
    )
})