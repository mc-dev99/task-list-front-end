# Wave 00: Setup and Baseline

**Learn Topics: React Components and Props required for this wave**

## Setup

Use the following steps to get started:

1. One team member should fork and clone the repository.
1. Add other team member(s) as collaborators in GitHub
1. Run `yarn install` to install dependencies.
1. Run `yarn start` to run the local development server.

## Baseline

In Wave 00, we will explore the starter code for Task List Front End.

Read through the code in `App.js`, `TaskList.js` and `Task.js` and their style sheets to understand how data and events are being handled. You may use the following questions and suggestions to guide your exploration:

1. What `props` does `Task` have? Where do they come from?
   **Answer:** (id),(isComplete), title. They come from the TASKS in App.js.

2. The `Task` component uses destructuring to read in the props `const Task = ({ id, title, isComplete }) => {...`
    - How would the code change if `{id, title, isComplete}` were replaced with `props`?
    **Answer:** Task.js line 9: <button className="tasks__item__toggle">{props: title}</button>

    - Consider making this change and the subsequent necessary changes through the rest of the component to deepen your understanding of the code.
    **Answer:** TaskList.js line7 const getTaskListJSX = props.tasks.map((task) => {

3. What `props` does `TaskList` have? Where do they come from?
   **Answer:** key, id, title, isComplete, from TASKS in App.js

4. Where is the function `getTaskListJSX` called in `TaskList`?
    - How would the code change without this helper function?
    **Answer:** using for loop to iterate the TASKS and get every element

5. What component is `TASKS` passed to in `App`?
    - How does the component pass `TASKS`?
    - What element is the component wrapped in?
   ** Answer:** TaskList component 
                - We are taking in TASKS into the TaskList, since the props.type was an array, so we are using the array of task's title to create a task component
                - two tasks, which are title of 'Mow the lawn' and title of 'Cook Pasta' 

The suggestions above should give you a strong foundation for working with Task List Front End. As time allows, follow your curiosity to explore more of the code and features.








