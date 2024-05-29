import { useState, useEffect } from 'react';
import List from './components/List';
import { v4 as uuidv4 } from 'uuid';

function Main() {
  //state for storing tasks
  const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem('tasks');
    if (!storedTodos) {
      return [];
    } else {
      return JSON.parse(storedTodos);
    }
  });
  const [tasksTitle, setTasksTitle] = useState('');

  //create logic for render count of uncomplited tasks
  // const [uncompletedTasks, setUncomplitedTasks] = useState(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem('tasks'));
  //   console.log(storedTodos);
  //   storedTodos.map(el => {
  //     if (el.status === false) {
  //       setUncomplitedTasks(uncompletedTasks + 1);
  //     }
  //     return true;
  //   });
  // });

  //add tasks to local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //create logic for adding takItem
  const addTask = e => {
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    if (e.key === 'Enter' && e.target.value !== '') {
      setTasks([
        ...storedTodos,
        {
          id: uuidv4(),
          title: tasksTitle,
          status: false,
        },
      ]);
      setTasksTitle('');
    }
  };

  //create date for tasklist
  const date = new Date();
  const monthNames = [
    'January',
    'Februay',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="container">
      <h1>Note your tasks</h1>
      <span>
        {month} {day}, {year}
      </span>
      <div className="input-field">
        <input
          type="text"
          value={tasksTitle}
          onChange={e => setTasksTitle(e.target.value)}
          onKeyDown={addTask}
        />
        <label>Task name</label>
      </div>

      <List tasks={tasks} />
    </div>
  );
}

export default Main;
