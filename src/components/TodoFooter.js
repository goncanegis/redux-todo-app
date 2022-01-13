import React from "react"
import { useSelector } from "react-redux"
import {
  changeActiveFilter,
  clearCompleted,
  selectTodos,
  selectActiveFilter,
} from "../redux/todos/todosSlice"
import { useDispatch } from "react-redux"

export const TodoFooter = () => {
  const items = useSelector(selectTodos)
  const activeFilter = useSelector(selectActiveFilter)
  const itemsLeft = items.filter((item) => !item.completed).length
  const dispatch = useDispatch()

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{itemsLeft}</strong> {itemsLeft > 1 ? "items" : "item"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompleted())}
      >
        Clear completed
      </button>
    </footer>
  )
}
