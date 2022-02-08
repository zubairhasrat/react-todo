import React, { useState, useCallback } from 'react';
import moment from 'moment';
import TodoList from './components/todo/list';
import AddNewTodoForm from './components/todo/form';
import { getTodoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './helper';
import './todo.scss';

const Todo = () => {
  const [todoItems, setTodoItems] = useState(getTodoItemsFromLocalStorage('todo') || [])
  
  const [customError, setCustomError] = useState(null)

  const addTodoHandler = useCallback(todo => {
    let latestTodoItem = null
    const createdAt = moment();
    if (todoItems.length === 1) {
      latestTodoItem = todoItems[0]
    }
    else if (todoItems.length > 1) {
      const todoItemsDescendingSortedById = todoItems.sort((a, b) => a.createdAt > b.createdAt)
      latestTodoItem = todoItemsDescendingSortedById[0]
    }
    
    const newTodoItems = [
      {
        id: latestTodoItem ? latestTodoItem.id + 1 : 0,
        todo,
        createdAt,
      },
      ...todoItems,
    ]

    setTodoItems(newTodoItems)

    saveTodoItemsToLocalStorage('todo', newTodoItems)
  }, [todoItems])

  const removeTodoHandler = useCallback(id => {
    const newTodoItems = todoItems.filter(todoItem => todoItem.id !== id)

    setTodoItems(newTodoItems)

    saveTodoItemsToLocalStorage('todo', newTodoItems)
  }, [todoItems])

  const editTodoHandler = useCallback((id, todo) => {
    const createdAt = moment()
    const editingTodo = todoItems.find(todoItem => todoItem.id === id)
    editingTodo.todo = todo
    editingTodo.createdAt = createdAt;
    setTodoItems([...todoItems])

    saveTodoItemsToLocalStorage('todo', todoItems)
    
  }, [todoItems])

  return (
    <div className="todo">
      <AddNewTodoForm
        customError={customError} 
        onAddTodo={addTodoHandler}
      />

      <TodoList
        todoItems={todoItems} 
        onRemoveTodo={removeTodoHandler} 
        onEditTodo={editTodoHandler} 
        setCustomError={setCustomError} 
      />
    </div>
  );
}

export default React.memo(Todo);
