import Section from '../UI/Section';
import useHttp from '../../hooks/use-http';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();
  // rename 'sendRequest' to 'sendTaskRequest'

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };
 
  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url:'https://react-http-9aa41-default-rtdb.firebaseio.com/tasks.json', 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: { text: taskText }
      }, 
      createTask.bind(null, taskText)
      // bind() preconfigured the parameter of createText (on line 9), 
      // and passed taxtText (from the enterTaskHandler) as parameter
      // taskData will still be received as a parameter after taskText (as per line 11)
      
      // doing this bcoz taskText parameter (line 9) wouldnt be defind before the enterTaskHandler is running
      // hence instead of deep-nesting the createTask()iunder enterTaskHandler,
      // we preconfigured the parameter of createTask with bind()

      // bind(this, {arguments}), but since 'this' doesnt apply here, we'll passed a 'null' instead
     
      
    );
    };


  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
