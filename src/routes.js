import { randomUUID } from "node:crypto"
import { buildROutePath } from "../utils/build-route-path.js";
import { Database } from "./database.js";
import { parse } from 'json2csv'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildROutePath('/tasks'),
        handler: (req, res)=>{
            const {search} = req.query

            const tasks = database.select('tasks', search ? {
                tittle: search,
            } : null )
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildROutePath('/tasks'),
        handler: (req, res) => {
            const {tittle, description} = req.body

            const task = {
                id: randomUUID(),
                tittle,
                description,
                completedAt: null,
                created_at: new Date().toISOString(),
                update_at: null,

            }
            database.insert('tasks', task)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'PUT',
        path: buildROutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const {status, tittle, description} = req.body
            const verification = database.verificationId(id);

            if (verification === null){
                return res.writeHead(404).end('Id não encontrado')
            } 

            database.update('tasks', id, {
                tittle,
                description,
                status,
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildROutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;
    
            const task = database.select('tasks').find(task => task.id === id);
    
            if (!task) {
                return res.writeHead(404).end('Task not found');
            }
    
            task.completedAt = new Date().toISOString();
            database.update('tasks', id, task);
    
            return res.writeHead(200).end();
        }
    },
    {
        method: 'DELETE',
        path: buildROutePath('/tasks/:id'),
        handler: (req, res) => {
        const { id } = req.params
        database.delete('tasks', id)
        return res.writeHead(204).end()
    }
    },
    {
        method: 'GET',
        path: buildROutePath('/tasks/csv'),
        handler: (req, res)=>{
            const tasks = database.select('tasks') || [];
            if (tasks.length === 0){
                return res.writeHead(404).end('Nenhuma tarefa encontrada')
            }

            const fields = ['id','tittle', 'description', 'completedAt', 'created_at', 'update_at'];
            const csv = parse(tasks, {fields})

            res.setHeader('Content-Type', 'text/csv')
            res.setHeader('Content-Disposition', 'attachment; filename="tasks.csv"')
            return res.end(csv)
        }
    }
]