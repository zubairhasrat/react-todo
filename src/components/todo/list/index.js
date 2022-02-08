import React from 'react';
import TodoItem from '../item';

const TodoList = ({ todoItems, onRemoveTodo, onEditTodo, setCustomError }) =>  (
  <ul>
    {
      todoItems &&
      Array.isArray(todoItems) &&
      todoItems.length > 0 &&
      todoItems.map(({ id, todo, createdAt, isDone }) => (
        <TodoItem
          key={id}
          id={id}
          todo={todo}
          createdAt={createdAt}
          onRemoveTodo={onRemoveTodo}
          onEditTodo={onEditTodo}
          isDone={isDone}
          setCustomError={setCustomError}
        />
      ))
    }
  </ul>
)

export default React.memo(TodoList);