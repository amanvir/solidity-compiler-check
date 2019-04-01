# sol-compiler-check 

Checks for known issues with the solidity compiler

## Install 

```
npm i -g sol-compiler-check
```

## Usage 
```
sol-compiler-check [filename.sol || file path]
```

Example output: 
```
File name: C:\test.sol, Version: 0.4.23
┌───────────────────────────┬───────────────────────────────────────────────────────────────────────────────┬─────────────┐
│ Name                      │ Link                                                                          │ Severity    │
├───────────────────────────┼───────────────────────────────────────────────────────────────────────────────┼─────────────┤
│ ABIEncoderV2PackedStorage │ https://blog.ethereum.org/2019/03/26/solidity-optimizer-and-abiencoderv2-bug/ │ low         │
├───────────────────────────┼───────────────────────────────────────────────────────────────────────────────┼─────────────┤
│ ExpExponentCleanup        │ https://blog.ethereum.org/2018/09/13/solidity-bugfix-release/                 │ medium/high │
├───────────────────────────┼───────────────────────────────────────────────────────────────────────────────┼─────────────┤
│ EventStructWrongData      │ https://blog.ethereum.org/2018/09/13/solidity-bugfix-release/                 │ very low    │
└───────────────────────────┴───────────────────────────────────────────────────────────────────────────────┴─────────────┘
```
