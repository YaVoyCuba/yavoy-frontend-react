
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useLingui } from "@lingui/react";
import { t } from "@lingui/macro";
import ProductDetailPage from "./Pages/frontend/ProductDetailPage";
import Restaurants from "./Components/Landing/Restaurants";
import TemplateLanding from "./Components/Templates/TemplateLanding";
import RestaurantPage from "./Pages/frontend/RestaurantPage";
import { ToastContainer } from "react-toastify";
import CheckOut from "./Pages/frontend/CheckOut";
import PaymentCompleted from "./Pages/frontend/PaymentCompleted";
import PaymentFailed from "./Pages/frontend/PaymentFailed";
import OrderTrackingPage from "./Pages/frontend/OrderTrackingPage";
import AboutCompanyPage from "./Pages/frontend/AboutCompanyPage";
import ContactPage from "./Pages/frontend/ContactPage";
import TermsPage from "./Pages/frontend/TermsPage";
import PrivacyPolicyPage from "./Pages/frontend/PrivacyPolicyPage";
import RefundPolicyPage from "./Pages/frontend/RefundPolicyPage";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PaymentBookings from "./Pages/backend/bookings/PaymentBookings";


function App() {
  const { i18n } = useLingui();

  useEffect(() => {
    try {
      document.title = i18n._(t`YaYoy MarketPlace | Buy Products and Bundles`);
    } catch (e) {
      document.title = "YaYoy MarketPlace | Buy Products and Bundles";
    }
  }, [i18n.locale]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="relative">
            <Routes>
              <Route element={<TemplateLanding />}>
                <Route path="/restaurantes" element={<Navigate to="/restaurants" replace />} />
                <Route path="/restaurante/:restaurantSlug" element={<Navigate to="/restaurant/:restaurantSlug" replace />} />
                <Route path="/mercados" element={<Navigate to="/markets" replace />} />
                <Route path="/servicios" element={<Navigate to="/services" replace />} />
                <Route path="/dulcerias" element={<Navigate to="/sweets" replace />} />
                <Route path="/regalitos" element={<Navigate to="/gifts" replace />} />
                <Route path="/sobre-nosotros" element={<Navigate to="/about-us" replace />} />
                <Route path="/contacto" element={<Navigate to="/contact" replace />} />
                <Route path="/terminos-y-condiciones" element={<Navigate to="/terms-and-conditions" replace />} />
                <Route path="/politica-de-privacidad" element={<Navigate to="/privacy-policy" replace />} />
                <Route path="/politica-de-reembolso" element={<Navigate to="/refund-policy" replace />} />
                <Route path="/pagocompletado" element={<Navigate to="/payment-completed" replace />} />
                <Route path="/errorenpago" element={<Navigate to="/payment-failed" replace />} />
                <Route path="/producto/:productSlug" element={<Navigate to="/product/:productSlug" replace />} />
                <Route path="/caja" element={<Navigate to="/checkout" replace />} />

                <Route key={"/"} path="/" element={<Restaurants />} />
                <Route
                  key={"/markets"}
                  path="/markets"
                  element={<Restaurants />}
                />
                <Route
                  key={"/services"}
                  path="/services"
                  element={<Restaurants />}
                />
                <Route
                  key={"/restaurants"}
                  path="/restaurants"
                  element={<Restaurants />}
                />
                <Route
                  key={"/gifts"}
                  path="/gifts"
                  element={<Restaurants />}
                />
                <Route
                  key={"/sweets"}
                  path="/sweets"
                  element={<Restaurants />}
                />
                <Route
                  key={"/booking/:bookingCode"}
                  path="/booking/:bookingCode"
                  element={<PaymentBookings />}
                />
                <Route
                  key={"/restaurant"}
                  path="/restaurant/:restaurantSlug"
                  element={<RestaurantPage />}
                />
                <Route
                  key={"/payment-completed"}
                  path="/payment-completed"
                  element={<PaymentCompleted />}
                />
                <Route
                  key={"/payment-failed"}
                  path="/payment-failed"
                  element={<PaymentFailed />}
                />
                <Route
                  key={"/product"}
                  path="/product/:productSlug"
                  element={<ProductDetailPage />}
                />
                <Route key={"/contact"} path="/contact" element={<ContactPage />} />
                <Route key={"/about-us"} path="/about-us" element={<AboutCompanyPage />} />
                <Route key={"/terms-and-conditions"} path="/terms-and-conditions" element={<TermsPage />} />
                <Route key={"/privacy-policy"} path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route key={"/refund-policy"} path="/refund-policy" element={<RefundPolicyPage />} />

                <Route key={"/checkout"} path="/checkout" element={<CheckOut />} />
                <Route key={"/track"} path="/track/:token" element={<OrderTrackingPage />} />
                {/*disabled temporarily*/}
                {/*<Route key={"/carrito"} path="/carrito" element={<Cart />} />*/}
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
