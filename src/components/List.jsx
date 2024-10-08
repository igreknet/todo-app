import Item from './Item';

export default function List({ tasks, deleteTask, onSetTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <Item {...task} key={task.id} deleteTask={deleteTask} tasks={tasks} onSetTask={onSetTask} />
      ))}
    </ul>
  );
}
