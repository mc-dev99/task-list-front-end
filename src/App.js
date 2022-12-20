import React, { useState } from 'react';
import TaskList from './components/TaskList.js';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasksData, setTasksData] = useState(TASKS);

  const updateTaskData = (taskID) => {
    const tasks = tasksData.map((task) => {
      if (task.id === taskID) {
        return {
          id: task.id,
          title: task.title,
          isComplete: !task.isComplete,
        };
      } else {
        return task;
      }
    });
    setTasksData(tasks);
  };

  const deleteTask = (taskID) => {
    setTasksData((tasksData) =>
      tasksData.filter((task) => {
        return task.id !== taskID;
      })
    );
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
              onUpdateTasksData={updateTaskData}
              onDeleteTasksData={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
