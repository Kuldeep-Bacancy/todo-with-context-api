import { useState } from 'react'
import useTodo from "../context/todo";


const idGenerator = () => {
  return "id" + Math.random().toString(16).slice(2)
}

function TodoForm() {
  const [todo, setTodo] = useState('')
  const { todos, setTodos } = useTodo();

  return (
    <form className="flex"
      onSubmit={(e) => {
        e.preventDefault();
        if(todo.length === 0){
          return alert('Please enter your todo')
        }
        setTodos([...todos, { id: idGenerator(), title: todo, completed: false }])
        setTodo('')
      }}
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={ (e) => setTodo(e.target.value) }
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;

