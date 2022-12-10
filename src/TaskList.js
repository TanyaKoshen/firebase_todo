import {useEffect, useState} from "react";
import {collection, onSnapshot, orderBy, query, deleteDoc, doc, updateDoc} from "firebase/firestore";
import db from "./connectDB";

function TaskList(props) {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const taskColRef = query(collection(db, "tasks"), orderBy('created', 'asc'));
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });
  }, []);

  const onDeleteTask = (id) => {
    deleteDoc(doc(db, 'tasks', id))
      .then(r => console.log(r))
      .catch(err => console.log(err));

  }

  const onToggleDone = (id, newStatus) => {
    updateDoc(doc(db, 'tasks', id), {completed: newStatus})
      .then(r => console.log(r))
      .catch(err => console.log(err));
  }

  return (

    <ul className='list-group'>
      {tasks.map(el => (
        <li key={el.id}
            className='list-group-item'
        >
          <div className='row'>
            <div className='col-8'>
              {el.completed ? <s>{el.title}</s> : el.title}
            </div>
            <div className='col-4'>
              <button onClick={() => onDeleteTask(el.id)}>Delete</button>
              <button onClick={() => onToggleDone(el.id, !el.completed)}>Done</button>
              <button onClick={() => props.onEdit(el.id)}>Edit</button>
            </div>
          </div>
        </li>
      ))}
    </ul>

  );
}

export default TaskList;