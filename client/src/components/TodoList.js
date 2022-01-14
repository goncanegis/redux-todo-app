import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  removeTodoAsync,
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
} from "../redux/todos/todosSlice"
import { Error } from "./Error"
import { Loading } from "./Loading"

export const TodoList = () => {
  const dispatch = useDispatch()
  const filteredTodos = useSelector(selectFilteredTodos)
  const isLoading = useSelector((state) => state.todos.isLoading)
  const error = useSelector((state) => state.todos.error)

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await dispatch(removeTodoAsync(id))
    }
  }

  const handleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({ id, data: { completed } }))
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} />
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
              onChange={() => handleToggle(item.id, !item.completed)}
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
