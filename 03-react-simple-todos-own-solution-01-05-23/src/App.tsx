import { useState } from 'react';
import './App.css';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTodoTitle) return;
    setTodos([...todos, { id: Date.now(), title: newTodoTitle, completed: false }]);
    setNewTodoTitle('');
  };

  const handleTodoClick = (clickedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === clickedTodo.id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoDelete = (clickedTodo: Todo) => {
    const updatedTodos = todos.filter((todo) => todo.id !== clickedTodo.id);
    setTodos(updatedTodos);
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="container-fluid py-3">
      <h1 className="text-center">React Simple Todos Workshop</h1>
      <hr />

      <div className="row">
        <div className="col-md-6 mb-3">
          <h2>Todos</h2>
          <form onSubmit={handleNewTodoSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new todo..."
                value={newTodoTitle}
                onChange={handleNewTodoChange}
              />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
          {uncompletedTodos.length === 0 && <p>No todos left</p>}
          <ul className="list-group mt-2">
            {uncompletedTodos.map((todo) => (
              <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span onClick={() => handleTodoClick(todo)}>{todo.title}</span>
                <button onClick={() => handleTodoDelete(todo)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-6 mb-3">
          <h2>Completed Todos</h2>
          {completedTodos.length === 0 && <p>No completed todos yet</p>}
          <ul className="list-group">
            {completedTodos.map((todo) => (
              <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{todo.title}</span>
                <button onClick={() => handleTodoDelete(todo)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col text-center">
          <p>{completedTodos.length} out of {todos.length} todos completed.</p>
        </div>
      </div>

    </div>
  );
};

export default App;
