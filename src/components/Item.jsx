import { useState } from 'react';

export default function Item({ title, id, status }) {
  const [checked, setChecked] = useState(status);
  const classes = ['todo'];

  if (checked) {
    classes.push('status');
  }

  //add logic to checkbox
  const updateStatus = () => {
    setChecked(!checked);
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    storedTodos.map(el => {
      if (el.id === id) {
        el.status = !checked;
      }
      return true;
    });
    localStorage.setItem('tasks', JSON.stringify(storedTodos));
  };

  //add logic to remove taskItem
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible(prev => !prev);
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    let removeTodos = storedTodos.filter(el => {
      if (el.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('tasks', JSON.stringify(removeTodos));
  };

  const now = new Date();
  //const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let currentDate = `${hours}:${minutes}.`;

  return (
    <>
      {visible && (
        <li className={classes.join(' ')}>
          <label>
            <input type="checkbox" checked={checked} onChange={updateStatus} />
            <span>{title}</span>
            <span>Add at {currentDate}</span>
            <i className="material-icons red-text" onClick={removeElement}>
              X
            </i>
          </label>
        </li>
      )}
    </>
  );
}
