import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'mongoose';



function App() {
  
  const [newTodo,setNewTodo]= useState("");
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState("");


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try{
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodos(response.data);
    }
    catch(error){
      console.log('Error fetching todos:', error);
    }
  }

  const addTodo = async (e) =>{
    e.preventDefault();
    if (newTodo.trim() === "") return;
    try {
      const response = await axios.post('http://localhost:3000/api/todos', {text: newTodo});
      setTodos([...todos, response.data]);
      setNewTodo("");

    } 
    catch (error){
      console.log('Error adding todo:', error);
    }
  }

  const startEdit = (todo) => {
    setEditingTodo(todo._id);
    setEditedText(todo.text);
  }

  const saveEdit = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/todos/${id}`,{text: editedText});
      setTodos(todos.map((todo) => todo._id === id ? response.data : todo));
      setEditingTodo(null);
      setEditedText("");
    }
    catch (error){
      console.log('Error saving todo:', error);
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    }
    catch(error){
      console.log('Error deleting todo:', error);
    }
  }

  return (
  <div className="flex justify-center items-center h-screen">
    <div className='bg-gray-100 p-6 rounded-lg shadow-md w-96'>
      <div className='flex justify-center items-center mb-5'><h1 className='text-xl font-bold'>To-Do List</h1></div>
      <form className='flex justify-between' onSubmit={addTodo}>
        <input  className='border border-gray-300 p-2 rounded-lg shadow-sm outline-none' placeholder='What needs to be done?' type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer' type="submit">Add Task</button>
      </form>
      <div className="mt-6">
        {todos.length !== 0 ? (
          todos.map(
            (todo) => (
              <div key={todo._id}>
                {editingTodo === todo._id ? (
                  <div className='flex justify-between items-center border border-gray-300 py-2 px-3 rounded-lg shadow-sm mb-2'>
                    <input className='border border-gray-300 p-2 rounded-lg shadow-sm outline-none' type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)} />
                    <button className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer' onClick={() => saveEdit(todo._id)} >Save</button>
                  </div>
                ) : (
                  <div className='flex justify-between items-center border border-gray-300 py-2 px-3 rounded-lg shadow-sm mb-2'>
                    <span >{todo.text}</span>
                   <div className='flex space-x-2'>
                     <button className='bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer' onClick={() => startEdit(todo)}>Edit</button>
                    <button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 cursor-pointer' onClick={() => deleteTodo(todo._id)}>Delete</button>
                   </div>
                  </div>
                )}
              </div>
            )
          )
        ) : (
          <div className='text-center text-gray-500'>No tasks available</div>
        )}
      </div>
    </div>
  </div>


  )
}

export default App
