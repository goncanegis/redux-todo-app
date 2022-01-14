import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodoAsync } from "../redux/todos/services"
import { Error } from "./Error"
import { Loading } from "./Loading"

export const Form = () => {
  const [title, setTitle] = useState("")

  const dispatch = useDispatch()

  const loading = useSelector((state) => state.todos.addNewTodo.isLoading)
  const error = useSelector((state) => state.todos.addNewTodo.error)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      return
    }

    await dispatch(addTodoAsync({ title }))
    setTitle("")
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center" }}
    >
      <input
        disabled={loading}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {loading && <Loading />}
    </form>
  )
}
