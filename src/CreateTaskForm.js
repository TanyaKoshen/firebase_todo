import React, {useState} from 'react';
import {collection, addDoc, Timestamp} from "firebase/firestore";
import db from "./connectDB";

const CreateTaskForm = () => {

  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addDoc(collection(db, 'tasks'), {
      title,
      created: Timestamp.now()
    }).then(r => console.log(r))
      .catch(err => console.log(err))
  }

  return (
    <form className='input-group mb-3'>
      <input className='form-control'
        type="text" placeholder='Enter task title'
             value={title}
             onChange={event => setTitle(event.target.value)}
      />
      <button type="button"
              className='btn-outline-secondary '
              onClick={handleSubmit}>Add Task</button>
    </form>
  );
};

export default CreateTaskForm;