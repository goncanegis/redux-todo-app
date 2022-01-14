import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit"
import axios from "axios"

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_URL}/todos`)
    return res.data
  }
)

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (data) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/todos`,
      data
    )
    return res.data
  }
)

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/todos/${id}`,
      data
    )
    return res.data
  }
)

export const removeTodoAsync = createAsyncThunk(
  "todos/removeTodoAsync",
  async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`)
    return id
  }
)

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: "all",
    addNewTodoLoading: false,
    addNewTodoError: null,
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
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
  extraReducers: {
    // get todos
    [getTodosAsync.pending]: (state) => {
      state.isLoading = true
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload
      state.isLoading = false
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error.message
      state.isLoading = false
    },
    // add todos
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload)
      state.addNewTodo.isLoading = false
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.error = action.error.message
      state.addNewTodo.isLoading = false
    },
    // toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      state.items[index].completed = completed
    },
    // remove todo
    [removeTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload
      const index = state.items.findIndex((item) => item.id === id)
      state.items.splice(index, 1)
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

export const { changeActiveFilter, clearCompleted } = todosSlice.actions

export default todosSlice.reducer
