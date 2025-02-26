import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Footer from "./Components/Footer"
import Shop from "./Pages/Shop"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import Admin from "./Pages/Admin"
import AdminDashboard from "./Pages/Admin.dash"

function App() {

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/shop", element: <Shop /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/register", element: <Signup /> },
        { path: "/login", element: <Login /> },
      ]
    },
    {
      path: "*",
      element: <h1>Page not found</h1>
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: "/admin/dashboard",
      element: <AdminDashboard />
    }

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
