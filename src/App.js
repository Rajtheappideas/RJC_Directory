import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const SearchResult = lazy(() => import("./pages/SearchResult"));
const BestOffers = lazy(() => import("./pages/BestOffers"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const PrivateRoute = lazy(() => import("./pages/PrivateRoute"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="font-semibold text-4xl text-center flex items-center justify-center w-screen h-screen">
          Loading...
        </div>
      }
    >
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
    </Suspense>
  );
}

export default App;
