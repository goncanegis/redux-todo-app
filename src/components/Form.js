import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../redux/todos/todosSlice"

export const Form = () => {
  const [title, setTitle] = useState("")

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      return
    }

    dispatch(addTodo({ title }))
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  )
}
