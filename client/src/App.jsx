import "./App.css";

import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductPage from "./pages/Product/ProductPage";

import Layout from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CartPage from "./pages/CartPage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/cart",
        element: <CartPage />,
      },

      {
        path: "/shipping",
        element: <ShippingPage />,
      },

      {
        path: "/payment",
        element: <PaymentPage />,
      },

      {
        path: "/placeorder",
        element: <PlaceOrderPage />,
      },

      {
        path: "products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
