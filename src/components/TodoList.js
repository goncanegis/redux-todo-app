import React from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toggle, deleteTodo } from "../redux/todos/todosSlice"
import { selectFilteredTodos } from "../redux/todos/todosSlice"

export const TodoList = () => {
  const dispatch = useDispatch()
  const filteredTodos = useSelector(selectFilteredTodos)

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTodo(id))
    }
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              value={item.completed}
              checked={item.completed}
              onChange={() => dispatch(toggle({ id: item.id }))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDelete(item.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  )
}
