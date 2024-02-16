import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetCategories,
  handleGetCountryAndCityList,
  handleGetSubCategories,
} from "./redux/GlobalStates";
import { handleGetListOfMerchants } from "./redux/MerchantSlice";
import { handleGetOfferBanner, handleGetTestimonial } from "./redux/CmsSlice";
import { GetToken } from "./Firebase/firebase_messaging_sw";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallBack";

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
  const [fcmToken, setFcmToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // console.log(fcmToken);
  const dispatch = useDispatch();

  const { token, user } = useSelector((s) => s.root.auth);

  const handleSetFcmToken = () => {
    // if (globalState.fcmToken !== null) {
    //   return;
    // } else if (fcmToken !== null && globalState.fcmToken === null) {
    //   // return dispatch(handleChangeFcmToken(fcmToken));
    //   return setFcmToken(fcmToken);
    // }
    // if (window.Notification.permission !== "granted") {
    //   toast.remove();
    //   toast.error("Please allowed notificaitons.");
    //   window.Notification.requestPermission();
    // }
    // if (
    //   fcmToken === null ||
    //   (error !== null && error?.message === "fcmToken is required.")
    // ) {
    // window.localStorage.clear();
    return GetToken(setFcmToken, setLoading);
    // }
  };

  useEffect(() => {
    handleSetFcmToken();
    dispatch(handleGetCategories());
    dispatch(handleGetSubCategories());
    dispatch(handleGetCountryAndCityList());
    dispatch(handleGetTestimonial());
    dispatch(handleGetOfferBanner());
    dispatch(handleGetListOfMerchants({ token }));
  }, []);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="font-semibold text-4xl text-center flex items-center justify-center w-screen h-screen">
            Loading...
          </div>
        }
      >
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            window.location.reload();
          }}
        >
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
            <Route path="/details/:id" element={<ItemDetails />} />
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
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
