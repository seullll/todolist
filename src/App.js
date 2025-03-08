import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // 투두 리스트가 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo(); // 엔터 키가 눌리면 할 일을 추가
    }
  };

  const completedTodosCount = todos.filter(todo => todo.completed).length;


  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h1>오늘의 Todo List</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress} 
        placeholder="할 일"
      />
      
      <button onClick={addTodo} style={{margin:3}}>추가</button>  <span>{completedTodosCount}</span> / <span>{todos.length}</span>
      <div style={{ marginBottom: "20px" }}>
      </div>
      <ul style={{ listStyle: "none", padding: 5 }}>
        
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              className={todo.completed ? "completed" : ""}
              onClick={() => toggleComplete(todo.id)}
              style={{ cursor: "pointer" }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 