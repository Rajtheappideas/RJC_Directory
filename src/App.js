import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Signin from "./pages/Signin";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import SearchResult from "./pages/SearchResult";
import ItemDetails from "./pages/ItemDetails";
import BestOffers from "./pages/BestOffers";
import MyAccount from "./pages/MyAccount";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/details" element={<ItemDetails />} />
        <Route path="/best-offers" element={<BestOffers />} />
        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
