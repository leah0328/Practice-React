import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http.js';

function App() {
  const [tasks, setTasks] = useState([]);

  const {isLoading, error, sendRequest: fetchTasks} = useHttp(); 
    // rename 'sendRequest' to 'fetchTasks' 

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
  
      for (const taskKey in taskObj) {
          loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      } // transform  the objects we get from firebase, 
        // into objects with structure and format that the frontend needs
        // push() returns a NEW arrays with new items (after new items are added to the END of the array)
  
        setTasks(loadedTasks); 
    };

    fetchTasks(
      {url: 'https://react-http-9aa41-default-rtdb.firebaseio.com/tasks.json'}, 
      transformTasks
      );
  }, [fetchTasks]);
  // fetchTasks: just sending request (line 23) 
  // transformTasks (line 28) = loadedTasks (an NEW arrays of objects with structure and format that the frontend needs) 

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
