import { useState } from 'react';

export default function Item({ id, status, title, date, deleteTask, tasks, onSetTask }) {
  const [checked, setChecked] = useState(status);
  const [editable, setEditable] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const formattedDate = new Date(date).toLocaleString();

  function updateStatus() {
    setChecked(prevChecked => {
      const updatedTodos = tasks.map(el => {
        if (el.id === id) {
          return {
            ...el,
            status: !prevChecked,
          };
        }
        return el;
      });
      localStorage.setItem('tasks', JSON.stringify(updatedTodos));
      return !prevChecked;
    });
  }

  function handleEditTodo() {
    setEditable(!editable);
  }

  function handleSaveEditedTodo() {
    const updatedTodo = tasks.map(task => {
      if (task.id === id) {
        return { ...task, title: editTitle, status: task.status };
      }
      return task;
    });
    onSetTask(updatedTodo);
    localStorage.setItem('tasks', JSON.stringify(updatedTodo));
    setEditable(false);
  }

  return (
    <li className="todo">
      <label>
        {editable ? (
          <>
            <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <button className="edit-btn" type="button" onClick={handleSaveEditedTodo}>
              💾 Save
            </button>
          </>
        ) : (
          <>
            <input type="checkbox" onChange={updateStatus} checked={checked} />
            <span className={checked ? 'checked' : ''}>{title}</span>
            <p className="timing">Created at: {formattedDate}</p>
            <button className="edit-btn" type="button" onClick={handleEditTodo}>
              ✍️ Edit
            </button>
          </>
        )}
        <button type="button" onClick={() => deleteTask(id)}>
          ❌ Delete
        </button>
      </label>
    </li>
  );
}
