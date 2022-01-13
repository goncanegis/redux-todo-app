import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "@reduxjs/toolkit"

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn React",
        completed: true,
      },
      {
        id: "2",
        title: "Read a book",
        completed: false,
      },
    ],
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        }
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload

      const item = state.items.find((item) => item.id === id)

      item.completed = !item.completed
    },
    deleteTodo: (state, action) => {
      const id = action.payload
      const filteredTodos = state.items.filter((item) => item.id !== id)
      state.items = filteredTodos
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload
    },
    clearCompleted: (state, action) => {
      const filtered = state.items.filter((item) => item.completed === false)
      state.items = filtered
    },
  },
})

export const selectTodos = (state) => state.todos.items

export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items
  }
  return state.todos.items.filter((item) =>
    state.todos.activeFilter === "active"
      ? item.completed === false
      : item.completed === true
  )
}

export const selectActiveFilter = (state) => state.todos.activeFilter

export const {
  addTodo,
  toggle,
  deleteTodo,
  changeActiveFilter,
  clearCompleted,
} = todosSlice.actions

export default todosSlice.reducer
