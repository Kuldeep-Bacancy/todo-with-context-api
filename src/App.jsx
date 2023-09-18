import { useState, useEffect } from 'react'
import './App.css'
import { TododContextProvider } from './context/todo'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos(
      (prev) => prev.filter((todo) => todo.id !== id)
    )
  }

  const toggleComplete = (id) => {
    setTodos(
      (prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    ) 
  }

  // Load existing todos in local storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, []);

  // // add todos in local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  return (
    <TododContextProvider value={{ todos, setTodos, updateTodo, deleteTodo, toggleComplete }}>
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <div className="bg-[#172842] min-h-screen py-8">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {
                todos.map((todo) => {
                  return(
                    <div key={todo.id}>
                      <TodoItem todo={todo} />
                    </div>
                  )
                })
              }
            </div>
        </div>
      </div>
    </TododContextProvider>
  )
}

export default App
