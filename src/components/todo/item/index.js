import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';

const TodoItem = ({ todo, id, onRemoveTodo, onEditTodo, createdAt, isDone, setCustomError }) => {
  const [value, setValue] = useState(todo);
  const [hasChanged, setHasChanged] = useState(false);
  const removeTodoHandler = useCallback(() => onRemoveTodo(id), [id, onRemoveTodo]);

  const editTodoHandler = useCallback(() => {
    if (value.length < 3) {
      setCustomError('Todo text is too short.');
      return;
    }
    if (value.length > 20) {
      setCustomError('Todo text is too long.');
      return;
    }
  
    onEditTodo(id, value);
    setHasChanged(false);
    setCustomError(null)

  }, [id, todo, onEditTodo, setCustomError]);

  const handleChange = (event) => {
    const {value} = event.target;
    setValue(value);
    setHasChanged(true);
  }

  return (
    <li>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{textDecoration: isDone ? 'line-through' : 'none'}}
      />
      <span className="date">{ moment(createdAt).format('YYYY-MM-DD hh:mm:ss') }</span>
      <button onClick={removeTodoHandler}>Delete</button>
      <button onClick={editTodoHandler} disabled={!hasChanged}>Update</button>
    </li>
  )
};

export default React.memo(TodoItem);