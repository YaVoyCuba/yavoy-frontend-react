import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/frontend/ProductDetailPage";
import Restaurants from "./Components/Landing/Restaurants";
import Houses from "./Components/Landing/Houses";
import { LoginPage } from "./Components/Landing/LoginPage";
import TemplateLanding from "./Components/Templates/TemplateLanding";
import RestaurantPage from "./Pages/frontend/RestaurantPage";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/frontend/Cart";
import CheckOut from "./Pages/frontend/CheckOut";
import PaymentCompleted from "./Pages/frontend/PaymentCompleted";
import PaymentFailed from "./Pages/frontend/PaymentFailed";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route element={<TemplateLanding />}>
              <Route key={"/"} path="/" element={<Restaurants />} />
              <Route
                key={"/restaurante"}
                path="/restaurante/:restaurantSlug"
                element={<RestaurantPage />}
              />
              <Route
                key={"/pagocompletado"}
                path="/pagocompletado"
                element={<PaymentCompleted />}
              />
              <Route
                key={"/errorenpago"}
                path="/errorenpago"
                element={<PaymentFailed />}
              />
                 <Route
                key={"/producto"}
                path="/producto/:productSlug"
                element={<ProductDetailPage />}
              />
              <Route
                key={"/alojamiento"}
                path="/alojamiento"
                element={<Houses />}
              />
              <Route key={"/login"} path="/login" element={<LoginPage />} />
              <Route key={"/caja"} path="caja" element={<CheckOut />} />
              <Route key={"/carrito"} path="/carrito" element={<Cart />} />
            </Route>
          </Routes>
        </div>
          <ToastContainer />  
      </BrowserRouter>

    </Provider>
  );
}

export default App;
