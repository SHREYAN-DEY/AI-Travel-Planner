import Navbar from "./Navbar"
import Footer from "./Footer"

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#050505] text-white">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default Layout