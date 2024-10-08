import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import List from './components/List';

export default function Main() {
  const [tasksTitle, setTasksTitle] = useState('');
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const incompleteTasksCount = tasks.filter(task => !task.status).length;
    document.title = `Uncomplited tasks: ${incompleteTasksCount}`;
  }, [tasks]);

  const addTask = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTasks(prevTasks => [
        ...prevTasks,
        {
          id: uuidv4(),
          title: tasksTitle,
          status: false,
          date: new Date(),
        },
      ]);
      setTasksTitle('');
    }
  };

  function handleDeleteTask(id) {
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));

    const updatedTodos = storedTodos.filter(el => el.id !== id);

    setTasks(updatedTodos);

    localStorage.setItem('tasks', JSON.stringify(updatedTodos));
  }

  const date = new Date();
  const monthNames = [
    'January',
    'February',
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

  const incompleteTasksCount = tasks.filter(task => !task.status).length;

  return (
    <div className="container">
      <h1>Todo</h1>
      <span>{month + ' ' + day + ', ' + year}</span>
      <p>Uncomplited tasks: {incompleteTasksCount}</p>

      <div className="input-field">
        <input
          type="text"
          value={tasksTitle}
          onChange={e => setTasksTitle(e.target.value)}
          onKeyDown={addTask}
        />
        <label htmlFor="">Task name</label>
      </div>
      <List tasks={tasks} deleteTask={handleDeleteTask} onSetTask={setTasks} />
    </div>
  );
}
