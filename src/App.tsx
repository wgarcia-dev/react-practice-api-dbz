import { Header } from "@components/layout/Header"
import { Main } from "@components/layout/Main"
import { Footer } from "@components/layout/Footer"

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App
