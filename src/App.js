import { BrowserRouter, Route, Routes } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleChangeCity,
  handleChangeState,
  handleGetCategories,
  handleGetCountryAndCityList,
  handleGetSubCategories,
} from "./redux/GlobalStates";
import {
  handleGetLatestMerchantList,
  handleGetListOfMerchants,
  handleGetNearByBusinessMerchantList,
} from "./redux/MerchantSlice";
import { handleGetOfferBanner, handleGetTestimonial } from "./redux/CmsSlice";
import { GetToken } from "./Firebase/firebase-messaging-sw";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallBack";
import Lottie from "lottie-react";
import loader from "./assets/animations/rjc_loader.json";
import { handleChangeFcmToken } from "./redux/AuthSlice";
import { getMessaging, onMessage } from "firebase/messaging";

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

  const dispatch = useDispatch();

  const { token, user, fcmToken: FCM } = useSelector((s) => s.root.auth);

  const handleSetFcmToken = () => {
    if (FCM !== null) {
      return;
    } else if (fcmToken !== null && FCM === null) {
      return dispatch(handleChangeFcmToken(fcmToken));
      // return setFcmToken(fcmToken);
    }
    if (window.Notification.permission !== "granted") {
      toast.remove();
      window.Notification.requestPermission();
    }
    if (fcmToken === null) {
      return GetToken(setFcmToken, setLoading);
    }
  };

  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload.notification.title);
    toast(payload.notification.title);
    // ...
  });

  useEffect(() => {
    handleSetFcmToken();
  }, [loading]);

  useEffect(() => {
    dispatch(handleGetCategories());
    dispatch(handleGetSubCategories());
    dispatch(handleGetCountryAndCityList());
    dispatch(handleGetTestimonial());
    dispatch(handleGetOfferBanner());
    dispatch(handleGetLatestMerchantList({ token }));
    dispatch(handleGetNearByBusinessMerchantList({ token }));
    return () => {
      dispatch(handleChangeState(""));
    };
  }, []);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="relative top-0 left-0 w-screen h-screen">
            <Lottie
              style={{
                pointerEvents: "none",
                height: "300px",
                width: "300px",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-full"
              animationData={loader}
              loop
            />
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
