import { useSelector } from 'react-redux';
import { useAppSelector, useTasks } from '../lib/hooks';
import { ApplicationState } from '../lib/store';
import Task from './task';
import Loading from './loading';

const TaskList = () => {
  const [tasks, loading] = useTasks();

  return (
    <section className="task-list">
      <Loading loading={loading} />
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
