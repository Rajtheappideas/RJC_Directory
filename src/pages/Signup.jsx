import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SetYourPreference from '../components/Signup/SetYourPreference';
import SuccessModal from '../components/Signup/SuccessModal';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import useAbortApiCall from '../hooks/useAbortApiCall';
import ValidationSchema from '../ValidationSchema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import toast from 'react-hot-toast';
import {
    handleChangeFcmToken,
    handleRegister,
    handleSocial,
    handleSocialProfile,
} from '../redux/AuthSlice';
import PhoneInput from 'react-phone-input-2';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { Country, State, City } from 'country-state-city';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment';
import { fromAddress, setDefaults, setKey } from 'react-geocode';
import { GetToken } from '../Firebase/firebase-messaging-sw';
import { auth, googleAuthProvider } from '../Firebase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Signup = () => {
    const [showPreferenceBox, setShowPreferenceBox] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [states, setStates] = useState([]);
    const [fcmToken, setFcmToken] = useState(null);
    const [fcmLoading, setFcmLoading] = useState(false);

    const {
        loading,
        user,
        fcmToken: FCM,
    } = useSelector(state => state.root.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { AbortControllerRef, abortApiCall } = useAbortApiCall();
    const { signupSchema } = ValidationSchema();

    const signal = useRef(null);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        control,
        watch,
        resetField,
        formState: { errors },
    } = useForm({
        shouldFocusError: true,
        resolver: yupResolver(signupSchema),
        defaultValues: { cityLatitude: '', cityLongitude: '' },
    });

    const onSubmit = data => {
        // const { phone } = data;
        // if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
        //   toast.remove();
        //   toast.error("phone is invalid");
        //   return true;
        // } else if (
        //   (getValues("phone") !== "" && !isPossiblePhoneNumber(phone)) ||
        //   !isValidPhoneNumber(phone)
        // ) {
        //   toast.remove();
        //   toast.error("phone is invalid");
        //   return true;
        // }
        // const phoneWithoutCountryCode = phone.slice(-10);
        // data.phone = phoneWithoutCountryCode;
        const response = dispatch(
            handleRegister({
                data,
                fcmToken: FCM,
                signal: AbortControllerRef,
            })
        );
        if (response) {
            response.then(res => {
                if (res?.payload?.success) {
                    setShowPreferenceBox(true);
                }
            });
        }
    };

    // google login
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const token = await result.user.getIdToken();
            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                phone: result.user.phoneNumber,
                photo: result.user.photoURL,
                googleId: result.user.uid,
            };

            // Handle Social Login
            const socialResponse = await dispatch(
                handleSocial({
                    data: userData,
                    token: token,
                    signal: signal,
                })
            ).unwrap();
            console.log(socialResponse, '✈🥳👍👍☕⛔');

            // Handle Social Profile
            const profileResponse = await dispatch(
                handleSocialProfile({
                    data: socialResponse.user,
                    token: socialResponse.token,
                    signal: signal,
                })
            ).unwrap();

            navigate('/');

            // Navigate to home page or any other page
            // e.g., history.push('/home');
        } catch (error) {
            toast.error('Error during Google sign-in');
            console.error('Error during Google sign-in:', error);
        }
    };

    const selectedCountryStates = useCallback(() => {
        const selectedCountry = Country.getAllCountries().find(
            c => c.name === getValues('country')
        );
        const states = State.getAllStates().filter(
            state => state?.countryCode === selectedCountry?.isoCode
        );

        setStates(states.sort((a, b) => a.name.localeCompare(b.name)));
    }, []);

    const selectedCountryCities = useCallback(() => {
        const selectedState = State.getAllStates().find(
            c => c.name === getValues('state')
        );
        const cities = City.getAllCities().filter(
            city => city?.stateCode === selectedState?.isoCode
        );
        setCities(cities.sort((a, b) => a.name.localeCompare(b.name)));
    }, []);

    const handleSetFcmToken = () => {
        if (FCM !== null) {
            return;
        } else if (fcmToken !== null && FCM === null) {
            return dispatch(handleChangeFcmToken(fcmToken));
        }
        if (window.Notification.permission !== 'granted') {
            toast.remove();
            window.Notification.requestPermission();
        }
        if (fcmToken === null) {
            return GetToken(setFcmToken, setFcmLoading);
        }
    };

    useEffect(() => {
        handleSetFcmToken();
    }, [fcmLoading]);

    // const getCityLangAndLat = useCallback(() => {
    //   if (watch("city") === "") return;
    //   fromAddress(getValues("city")).then((res) => {
    //     const city = { ...res?.results[0] };
    //     if (city) {
    //       setValue("cityLatitude", city?.geometry?.location?.lat);
    //       setValue("cityLongitude", city?.geometry?.location?.lng);
    //     }
    //   });
    // }, []);

    useEffect(() => {
        setCountries(
            Country.getAllCountries().sort((a, b) =>
                a.name.localeCompare(b.name)
            )
        );

        // setDefaults({ key: process.env.REACT_APP_GOOGLE_API_KEY, language: "en" });
        // setKey(process.env.REACT_APP_GOOGLE_API_KEY);

        return () => {
            abortApiCall();
        };
    }, []);

    useEffect(() => {
        selectedCountryStates();
        setCities([]);
        setValue('city', '');
    }, [watch('country')]);

    useEffect(() => {
        selectedCountryCities();
    }, [watch('state')]);

    // useEffect(() => {
    //   getCityLangAndLat();
    // }, [watch("city"), cities]);

    let date = moment().format('L').split('/');
    let maxDate = date.splice(date.length - 1, 1);
    maxDate = maxDate.concat(date).join('-');

    useEffect(() => {
        if (user !== null) navigate('/');
        return () => {
            abortApiCall();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Sign up - RJC Directory</title>
            </Helmet>
            {showSuccess && <SuccessModal />}
            {showPreferenceBox ? (
                <SetYourPreference setShowSuccess={setShowSuccess} />
            ) : (
                <div className="grid items-center w-screen h-screen gap-5 overflow-y-auto xl:grid-cols-2 xl:gap-0 place-items-center">
                    {/* images */}
                    <div className="relative hidden w-full h-full xl:block">
                        <img
                            src={require('../assets/images/bgImage.png')}
                            alt=""
                            className="object-cover w-full h-full"
                            loading="lazy"
                        />
                        <Link
                            to="/"
                            className="absolute z-10 space-y-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        >
                            <img
                                src={require('../assets/images/logoMain.png')}
                                alt=""
                                className="object-cover w-40 h-fit"
                                loading="lazy"
                            />
                            <img
                                src={require('../assets/images/logoTitle.png')}
                                alt=""
                                className="object-cover w-40 h-fit "
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    {/* form */}
                    <div className="relative z-0 flex items-center justify-center w-screen h-full p-3 lg:w-full bg-bgGray">
                        <img
                            src={require('../assets/images/bgImage.png')}
                            alt=""
                            className="fixed object-cover w-full h-screen lg:hidden -z-10"
                            loading="lazy"
                        />
                        <div className="relative w-full p-4 space-y-4 bg-white rounded-lg shadow-lg xl:mt-0 mt-14 md:p-10 md:w-2/3">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 text-[#000D23]"
                            >
                                <Link to="/">
                                    <img
                                        src={require('../assets/images/Logo.png')}
                                        alt=""
                                        className="absolute z-10 object-cover -translate-x-1/2 w-fit h-fit lg:hidden -top-16 left-1/2"
                                    />
                                </Link>
                                <p className="text-2xl font-semibold text-left">
                                    Sign Up
                                </p>
                                <div className="space-y-1">
                                    <label htmlFor="Name" className="Label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className="input_field"
                                        placeholder="Enter your Phone name"
                                    />
                                    <span className="error">
                                        {errors?.name?.message}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="Email" className="Label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className="input_field"
                                        placeholder="Enter your Phone email"
                                    />
                                    <span className="error">
                                        {errors?.email?.message}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="PhoneNumber"
                                        className="Label"
                                    >
                                        Phone Number
                                    </label>
                                    {/* <Controller
                  name="phone"
                  control={control}
                  rules={{
                    validate: (value) => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      country={"in"}
                      onChange={(value) => {
                        onChange((e) => {
                          setValue("phone", "+".concat(value));
                        });
                      }}
                      value={getValues().phone}
                      autocompleteSearch={true}
                      countryCodeEditable={false}
                      enableSearch={true}
                      inputStyle={{
                        width: "100%",
                        padding: "24px 0 24px 50px",
                        borderRadius: "5px",
                        fontSize: "1rem",
                      }}
                      dropdownStyle={{
                        background: "white",
                        color: "#13216e",
                        fontWeight: "600",
                        padding: "0px 0px 0px 10px",
                      }}
                    />
                  )}
                /> */}
                                    <input
                                        type="tel"
                                        placeholder="Enter your Phone number"
                                        maxLength={10}
                                        {...register('phone')}
                                        className="input_field"
                                    />
                                    <span className="error">
                                        {errors?.phone?.message}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <label htmlFor="dob" className="Label">
                                        Date of birth
                                    </label>
                                    <input
                                        type="date"
                                        {...register('dob')}
                                        className="relative input_field"
                                        max={maxDate}
                                    />
                                    <span className="error">
                                        {errors?.dob?.message}
                                    </span>
                                </div>
                                <div className="space-y-1">
                                    <label
                                        htmlFor="anniversary"
                                        className="Label"
                                    >
                                        Anniversary (Optional)
                                    </label>
                                    <input
                                        type="date"
                                        {...register('anniversary')}
                                        className="relative input_field"
                                        max={maxDate}
                                    />
                                    <span className="error">
                                        {errors?.anniversary?.message}
                                    </span>
                                </div>
                                <div className="w-full space-y-1">
                                    <label htmlFor="country" className="Label">
                                        Country
                                    </label>
                                    <select
                                        {...register('country')}
                                        name="country"
                                        id=""
                                        className="input_field"
                                    >
                                        <option label="select country"></option>
                                        {countries.map(country => (
                                            <option
                                                key={country?.name}
                                                value={country?.name}
                                            >
                                                {country?.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="error">
                                        {errors?.country?.message}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1/2 space-y-1">
                                        <label
                                            htmlFor="state"
                                            className="Label"
                                        >
                                            State
                                        </label>
                                        <select
                                            {...register('state')}
                                            name="state"
                                            id=""
                                            className="input_field"
                                        >
                                            <option label="select state"></option>
                                            {states.map(state => (
                                                <option
                                                    key={state?.name}
                                                    value={state?.name}
                                                >
                                                    {state?.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="error">
                                            {errors?.state?.message}
                                        </span>
                                    </div>
                                    <div className="w-1/2 space-y-1">
                                        <label htmlFor="city" className="Label">
                                            City
                                        </label>
                                        <select
                                            {...register('city')}
                                            name="city"
                                            id=""
                                            className="input_field"
                                        >
                                            <option label="select city"></option>
                                            {cities.map((city, i) => (
                                                <option
                                                    key={i}
                                                    value={city?.name}
                                                >
                                                    {city?.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="error">
                                            {errors?.city?.message}
                                        </span>
                                    </div>
                                </div>

                                <div className="relative space-y-1">
                                    <div className="flex items-center justify-between w-full">
                                        <label
                                            htmlFor="password"
                                            className="Label"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Enter your password"
                                        className="input_field"
                                        {...register('password')}
                                    />
                                    {showPassword ? (
                                        <IoMdEye
                                            onClick={() =>
                                                setShowPassword(false)
                                            }
                                            className="absolute w-6 h-6 cursor-pointer top-9 right-3"
                                        />
                                    ) : (
                                        <IoMdEyeOff
                                            onClick={() =>
                                                setShowPassword(true)
                                            }
                                            className="absolute w-6 h-6 cursor-pointer top-9 right-3"
                                        />
                                    )}
                                    <span className="error">
                                        {errors?.password?.message}
                                    </span>
                                </div>
                                <p className="opacity-50">
                                    8 characters with a mix of letters, numbers
                                    & symbols
                                </p>
                                <div className="space-y-1 ">
                                    <div className="flex items-center justify-between w-full">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="Label"
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Enter your confirm password"
                                        className="input_field"
                                        {...register('confirmPassword')}
                                    />
                                    <span className="error">
                                        {errors?.confirmPassword?.message}
                                    </span>
                                </div>
                                <p className="flex items-center gap-2 opacity-50">
                                    <input
                                        {...register('checkbox')}
                                        id="checkbox"
                                        type="checkbox"
                                        className="w-5 h-5 rounded-lg"
                                    />{' '}
                                    <label
                                        htmlFor="checkbox"
                                        className="cursor-default"
                                    >
                                        I agree and accept the{' '}
                                    </label>
                                    <Link
                                        to="/terms"
                                        className="font-semibold text-green-500 underline opacity-100"
                                    >
                                        Terms & Conditions.
                                    </Link>
                                </p>
                                <span className="error">
                                    {errors?.checkbox?.message}
                                </span>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full green_button"
                                >
                                    {loading ? 'Signing up...' : 'Sign up'}
                                </button>
                                {/* {error && (
                <p className="font-semibold text-red-500">{error?.message}</p>
              )} */}
                            </form>
                            {/* social login */}
                            <div className="flex items-center justify-center w-full gap-2">
                                <button
                                    disabled={loading}
                                    className="w-12 h-12 text-center border rounded-full"
                                    onClick={handleGoogleSignIn}
                                >
                                    <FcGoogle className="mx-auto text-xl" />
                                </button>
                                {/* <button className="w-12 h-12 text-center border rounded-full">
                  <FaFacebookF className="mx-auto text-xl text-blue-500" />
                </button> */}
                            </div>
                            {/* sign up  url */}
                            <p className="text-base text-center text-opacity-50 text-textColor">
                                Don’t have an account?{' '}
                                <Link
                                    to="/sign-in"
                                    className="text-base font-semibold text-blue-500 underline opacity-100 underline-offset-4"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;
