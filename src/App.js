import "./App.css"
import { Content } from "./components/Content"
import { Header } from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Content />
      </section>
      <Footer />
    </>
  )
}

export default App
