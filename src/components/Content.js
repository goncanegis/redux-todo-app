import React from "react"
import { TodoFooter } from "./TodoFooter"
import { TodoList } from "./TodoList"

export const Content = () => {
  return (
    <>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList />
      </section>

      <TodoFooter />
    </>
  )
}
