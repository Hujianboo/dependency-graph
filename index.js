#!/usr/bin/env node

import Parser from '@babel/parser'
import File from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
let currentBasePath = process.cwd() + '/ ';
console.log(currentBasePath)
/**
 * 
 * @param {*} currentPath the current read file's absoulte path
 * @param {*} filePath the relative path of the file which is imported
 * @returns the absolute path of the file which is imported
 */
const getPath = (currentPath ,filePath) => {
    const current = path.dirname(currentPath);
    const res = path.resolve(current,filePath);
    return res;
}
/**
 * @param {*} path the absolute path of the file
 * @returns the AST of the file
 */
const getFileContent = (path) => {
    return Parser.parse(File.readFileSync(path, 'utf-8'),{sourceType:'module'}).program.body;
}
const traverse = (root,obj) => {
    for(let i = 0 ; i < root.length; i++){
        if(root[i].type === 'ImportDeclaration'){ 
            const specifierNode = root[i].specifiers;
            const sourceNode = root[i].source;
            currentBasePath = getPath(currentBasePath,sourceNode.value);
            const fileName = path.basename(currentBasePath);
            const depObj = {
                name: fileName,
                path: currentBasePath,
            }
            if(obj.dependencies){ 
                obj.dependencies.push(depObj) 
            }else{
                obj.dependencies = [depObj]
            }
            if(obj.importSpecifiers){
                obj.importSpecifiers.concat(specifierNode.map(item => {
                    return {
                        origin:depObj,
                        value: item.local.name
                    }
                }) )
            }else{
                obj.importSpecifiers = specifierNode.map(item => {
                    return {
                        origin:depObj,
                        value: item.local.name
                    }
                }) 
            }
            const programBody = getFileContent(currentBasePath);
            traverse(programBody,depObj);
        }
    }
}

const inputFile = process.argv[2];
currentBasePath = getPath(currentBasePath,inputFile);
const programBody = getFileContent(currentBasePath);
let obj = {
    name: path.basename(currentBasePath),
    path: currentBasePath,
};
traverse(programBody,obj);
console.log(JSON.stringify(obj,null,2))
