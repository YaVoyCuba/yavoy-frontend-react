import { useState } from "react";
import { Provider } from "react-redux";
 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetailPage from "./pages/frontend/ProductDetailPage";
import Restaurants from "./Components/Landing/Restaurants";
import Houses from "./Components/Landing/Houses";
import TemplateLanding from "./Components/Templates/TemplateLanding";
import RestaurantPage from "./Pages/frontend/RestaurantPage";
import { ToastContainer } from "react-toastify";
import Cart from "./Pages/frontend/Cart";
 
import CheckOut from "./Pages/frontend/CheckOut";
import PaymentCompleted from "./Pages/frontend/PaymentCompleted";
import PaymentFailed from "./Pages/frontend/PaymentFailed";
import HousePage from "./Components/Landing/HousePage";
import Login from "./Pages/frontend/LoginPage";
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
 

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="relative">
            <Routes>
              <Route element={<TemplateLanding />}>
                <Route key={"/"} path="/" element={<Restaurants />} />
                <Route
                  key={"/mercados"}
                  path="/mercados"
                  element={<Restaurants />}
                />
                <Route
                  key={"/restaurantes"}
                  path="/restaurantes"
                  element={<Restaurants />}
                />
                <Route
                  key={"/regalitos"}
                  path="/regalitos"
                  element={<Restaurants />}
                />
                <Route
                  key={"/dulcerias"}
                  path="/dulcerias"
                  element={<Restaurants />}
                />
                <Route
                  key={"/alojamientos"}
                  path="/alojamientos"
                  element={<Houses />}
                />
                <Route
                  key={"/alojamiento"}
                  path="/alojamiento/:houseSlug"
                  element={<HousePage />}
                />
                <Route key={"/login"} path="/login" element={<Login />} />

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

                <Route key={"/caja"} path="caja" element={<CheckOut />} />
                <Route key={"/carrito"} path="/carrito" element={<Cart />} />
              </Route>
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
