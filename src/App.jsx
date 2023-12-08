
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailPage from "./Pages/frontend/ProductDetailPage";
import Restaurants from "./Components/Landing/Restaurants";
import TemplateLanding from "./Components/Templates/TemplateLanding";
import RestaurantPage from "./Pages/frontend/RestaurantPage";
import { ToastContainer } from "react-toastify";
import CheckOut from "./Pages/frontend/CheckOut";
import PaymentCompleted from "./Pages/frontend/PaymentCompleted";
import PaymentFailed from "./Pages/frontend/PaymentFailed";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


function App() {
  // initialize a browser router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TemplateLanding />,
      // loader: rootLoader,
      children: [
        {
          path: "/",
          element: <Restaurants />,
        },
        {
          path: "/mercados",
          element: <Restaurants />,
        },
        {
          path: "/servicios",
          element: <Restaurants />,
        },
        {
          path: "/restaurantes",
          element: <Restaurants />,
        },
        {
          path: "/regalitos",
          element: <Restaurants />,
        },
        {
          path: "/dulcerias",
          element: <Restaurants />,
        },
        {
          path: "/restaurante/:restaurantSlug",
          element: <RestaurantPage />,
        },
        {
          path: "/pagocompletado",
          element: <PaymentCompleted />,
        },
        {
          path: "/errorenpago",
          element: <PaymentFailed />,
        },
        {
          path: "/producto/:productSlug",
          element: <ProductDetailPage />,
        },
        {
          path: "/caja",
          element: <CheckOut />,
        },
      ],
    },
  ])


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <div className="relative">
            <RouterProvider router={router} />
          </div>
          <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
