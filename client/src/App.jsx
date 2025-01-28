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
import OrderPage from "./pages/order/OrderPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import UserListPage from "./pages/user/UserListPage";
import ProductListPage from "./pages/Product/ProductListPage";
import OrderListPage from "./pages/order/OrderListPage";
import UserEditPage from "./pages/user/UserEditPage";
import ProductEditPage from "./pages/Product/ProductEditPage";
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
        path: "/cart/:id?",
        element: <CartPage />,
      },

      {
        path: "/userprofile",
        element: <UserProfilePage />,
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
        path: "/order/:id?",
        element: <OrderPage />,
      },
      {
        path: "/admin/userlist",
        element: <UserListPage />,
      },

      {
        path: "/admin/user/:id/edit",
        element: <UserEditPage />,
      },

      {
        path: "/admin/productlist",
        element: <ProductListPage />,
      },

      {
        path: "/admin/product/:id/edit",
        element: <ProductEditPage />,
      },

      {
        path: "/admin/orderlist",
        element: <OrderListPage />,
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
