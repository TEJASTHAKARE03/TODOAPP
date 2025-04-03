import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/todos"; // Backend URL

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos when component loads
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error("Error fetching todos:", error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;

    axios.post(API_URL, { title: newTodo, completed: false })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error("Error adding todo:", error));

    setNewTodo(""); // Clear input
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error("Error deleting todo:", error));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
