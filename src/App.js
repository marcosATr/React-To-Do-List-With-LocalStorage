import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  let currentStorage = JSON.parse(localStorage.getItem('Tasks'));
  //console.log(currentStorage);
  const tasks = () => {
    if (currentStorage) {
      return currentStorage;
    } else {
      return [];
    }
  };
  const [taskList, setTaskList] = useState(tasks);
  const [currentItem, setCurrentItem] = useState('');

  const logNewItem = e => {
    setCurrentItem(e.target.value);
    //console.log(currentItem);
  };
  const save = e => {
    e.preventDefault();
    if (currentItem) {
      setTaskList([...taskList, currentItem]);
      setCurrentItem('');
    }
  };
  const deleteItem = e => {
    //find index
    const searchParam = e.target.name;
    const deleteFilter = p => p == searchParam;
    const thisIndex = taskList.findIndex(deleteFilter);
    console.log(thisIndex);
    const newArr = [...taskList];
    newArr.splice(thisIndex, 1);
    setTaskList(newArr);
  };
  //save on localstorage
  const saveOnLocalStorage = () => {
    localStorage.setItem('Tasks', JSON.stringify(taskList));
  };
  useEffect(() => {
    saveOnLocalStorage();
  }, [taskList]);

  return (
    <div className="main">
      <div className="tasklist">
        <h1>React To-do list</h1>
        <ul>
          {taskList.map((task, i) => (
            <li key={i}>
              {task}{' '}
              <button
                className="button"
                name={task}
                onClick={e => {
                  deleteItem(e);
                }}
              >
                Concluir
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <form action="" className="">
          <input
            type="text"
            value={currentItem}
            onChange={e => {
              logNewItem(e);
            }}
          />
          <input
            type="submit"
            className="button"
            value="Salvar"
            onClick={e => {
              save(e);
            }}
          />
        </form>
      </div>
    </div>
  );
}
