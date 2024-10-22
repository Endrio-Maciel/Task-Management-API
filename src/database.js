import fs from 'node:fs/promises'
import { URL } from 'node:url'
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}
    constructor(){
        fs.readFile(databasePath, 'utf8').then(data =>{
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist()
        })
    }
    #persist(){
        fs.writeFile('db.json', JSON.stringify(this.#database))
    }
    verificationId(id){

        const task = this.#database['tasks'] ?? [];
        const verification = task.findIndex((row) => row.id === id)

        return verification !== -1 ? verification : null    
    }

    select(table, search){
        let data = this.#database[table] ?? []

        if(search){
            data = data.filter(row =>{
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
        return data
    }
    insert(table, data){
        if(!Array.isArray(this.#database[table])){
        this.#database[table] = []
        }
        this.#database[table].push(data)
        this.#persist();
        return data;
    }
    update(table, id, data){
        if(Array.isArray(this.#database[table])){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
        if(rowIndex > -1){
            const existingData = this.#database[table][rowIndex]

            this.#database[table][rowIndex] = {
                ...existingData,
                ...data,
                update_at: new Date().toDateString()
            }
            this.#persist()
        }
    }}
    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id === id)
    
        if(rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }   

}

