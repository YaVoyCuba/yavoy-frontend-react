
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import PaymentBookings from "./Pages/backend/bookings/PaymentBookings";


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
                  key={"/servicios"}
                  path="/servicios"
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
                  key={"/booking/:bookingCode"}
                  path="/booking/:bookingCode"
                  element={<PaymentBookings />}
                />
                {/*disabled temporarily*/}
                {/*<Route key={"/login"} path="/login" element={<Login />} />*/}
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

                <Route key={"/caja"} path="caja" element={<CheckOut />} />
                {/*disabled temporarily*/}
                {/*<Route key={"/carrito"} path="/carrito" element={<Cart />} />*/}
              </Route>
              {/*disabled temporarily*/}
              {/*<Route element={<TemplateUser />}>*/}
              {/*  <Route key={"/perfil"} path="/perfil" element={<ProfilePage />} />*/}
              {/*</Route>*/}
            </Routes>
          </div>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
