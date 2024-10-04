import Item from './Item';

export default function List({ tasks, deleteTask }) {
  return (
    <ul>
      {tasks.map(task => (
        <Item task={task} key={task.id} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}
