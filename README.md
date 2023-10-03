# dependency-graph-js 
![Version](https://img.shields.io/npm/v/dependency-graph-js)
![License](https://img.shields.io/npm/l/dependency-graph-js) 

dependency-graph-js is a tool which is used to analyze the dependency of javascript files . 
## installation
`yarn add dependency-graph-js -g` 

`npm i dependency-graph-js -g` 

 or 

`pnpm add dependency-graph-js -g`

## usage
Providing a terminal command `seekDep` to analyze the dependency. 
`seekDep` allows you to add an entry file after it, and will detect the imported files in it. The action will be done recursively in every imported file until no more imported files are found. 
```
    seekDep ./test/main.js
```

## todolist
- [x] Analyzing the baisc dependency.
- [] Supported by analyzing node_modules's modudles. 
- [] Supported by being adapted to CommonJS.
- [] Supported by being used in TypeScript.
- [] Supported by drawing graph.
- [] Supported by being used as a plugin in webpack or vite.
  