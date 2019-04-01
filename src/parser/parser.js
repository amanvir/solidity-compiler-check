import parser from 'solidity-parser-antlr'

export default class SolidityParser {
    parse (code) {
        try {
            return parser.parse(code)                    
        } catch (e){
            console.log(`Unable to parse code`)
        }
    }

    extractVersion(ast) {
        //this can be written so much better... very hacky
        if(ast.children[0].type == "PragmaDirective"){
            return ast.children[0].value
        }       
    }
}