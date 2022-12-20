import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import axios from 'axios';

const taskApiToJson = (task) => {
  const { description, id, is_complete: isComplete, title } = task;
  return { description, id, isComplete, title };
};

const getTasksAsync = () => {
  // return the end of the promise chain to allow further then/catch calls
  return axios
    .get('https://task-list-api-c17.herokuapp.com/tasks')
    .then((response) => {
      // convert the received tasks from having python-like keys to JS-like keys
      // using a helper function (taskApiToJson) that will be run on each task
      // in the result.

      // the value we return from a then will become the input to the next then
      return response.data.map(taskApiToJson);
    })
    .catch((err) => {
      console.log(err);

      // anything we throw will skip over any intervening then clauses to become
      // the input to the next catch clause
      throw new Error('error fetching tasks');
    });
};

const updateTaskAsync = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  // return the end of the promise chain to allow further then/catch calls
  return axios
    .patch(`https://task-list-api-c17.herokuapp.com/tasks/${id}/${endpoint}`)
    .then((response) => {
      // convert the received task from having python-like keys to JS-like keys
      // using a helper function (taskApiToJson)

      // the value we return from a then will become the input to the next then
      return taskApiToJson(response.data.task);
    })
    .catch((err) => {
      console.log(err);

      // anything we throw will skip over any intervening then clauses to become
      // the input to the next catch clause
      throw new Error(`error updating task ${id}`);
    });
};

const deleteTaskAsync = (id) => {
  // return the end of the promise chain to allow further then/catch calls
  // note no .then here since there's nothing useful for us to process from the
  // response. it returns a status message structure:
  // { "details": "Task 3 \"do the other thing\" successfully deleted" }
  return axios
    .delete(`$https://task-list-api-c17.herokuapp.com/tasks/${id}`)
    .catch((err) => {
      console.log(err);

      // anything we throw will skip over any intervening then clauses to become
      // the input to the next catch clause
      throw new Error(`error deleting task ${id}`);
    });
};

const App = () => {
  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = () => {
    return getTasksAsync()
      .then((tasks) => {
        setTasksData(tasks);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const toggleTaskComplete = (id) => {
    // find the task we want to update
    const task = tasksData.find((task) => task.id === id);

    // If we didn't find the task for some reason, just return an empty promise
    // to maintain type compatibility with the main code flow.
    if (!task) {
      return Promise.resolve();
    }

    // start the async task to toggle the completion
    return updateTaskAsync(id, !task.isComplete)
      .then((newTask) => {
        // use the callback style of updating the tasks list
        // oldTasks will receive the current contents of the tasks state
        setTasksData((oldTasks) => {
          // return the new value for the tasks state
          return oldTasks.map((task) => {
            if (task.id === newTask.id) {
              // if this task is the one we just updated, return the new data we
              // got from the api result to use in the tasks list
              return newTask;
            } else {
              // otherwise, it's an existing task, so just use it
              return task;
            }
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteTask = (id) => {
    return deleteTaskAsync(id)
      .then(() => {
        // use the callback style of updating the tasks list
        // oldTasks will receive the current contents of the tasks state
        setTasksData((oldTasks) => {
          // return the new value for the tasks state
          return oldTasks.filter((task) => task.id !== id);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasksData}
              onUpdateTasksData={toggleTaskComplete}
              onDeleteTasksData={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
