import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: '',
    description: '',
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const onDescChange = (event) => {
    setFormFields({
      ...formFields,
      description: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    props.onCreateTasksData(formFields.title, formFields.description);

    setFormFields({
      title: '',
      description: '',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input name="title" value={formFields.title} onChange={onTitleChange} />
      </div>
      <div>
        <label htmlFor="Description">Description:</label>
        <input
          name="Description"
          value={formFields.description}
          onChange={onDescChange}
        />
      </div>
      <input type="submit" value="Create Task" />
    </form>
  );
};

NewTaskForm.propTypes = {
  onCreateTasksData: PropTypes.func.isRequired,
};

export default NewTaskForm;
