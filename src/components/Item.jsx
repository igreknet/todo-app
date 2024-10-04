import { useState } from 'react';

export default function Item({ task, deleteTask }) {
  const [checked, setChecked] = useState(task.status);

  function updateStatus() {
    setChecked(!checked);
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    storedTodos.map(el => {
      if (el.id === task.id) {
        el.status = !checked;
      }
      return true;
    });
    localStorage.setItem('tasks', JSON.stringify(storedTodos));
  }

  return (
    <li className="todo">
      <label>
        <input type="checkbox" onChange={updateStatus} checked={checked} />
        <span className={checked ? ' checked' : ''}>{task.title}</span>
        <button type="button" onClick={() => deleteTask(task.id)}>
          ❌
        </button>
      </label>
    </li>
  );
}
