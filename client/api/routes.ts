export enum Routes {
    getTodos = "http://localhost:5000/server/getAllTodos",   //GET
    createTodo = "http://localhost:5000/server/createTodo",   //POST - title, description
    updateTodo = "http://localhost:5000/server/updateTodo",   //PUT - _id, title and description
    deleteTodo = "http://localhost:5000/server/deleteTodo",   //DELETE - _id
    getSingleTodo = "http://localhost:5000/server/getSingleTodo"   //GET -  _id
}