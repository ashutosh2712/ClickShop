import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductPage from "./pages/Product/ProductPage";
import Footer from "./components/Footer";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "products/:id",
      element: <ProductPage />,
    },
  ]);
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
