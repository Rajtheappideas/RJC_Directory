import React, { useEffect, useState } from 'react';
import SuccessModal from '../components/SuccessModal';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ValidationSchema from '../ValidationSchema';
import PhoneInput from 'react-phone-input-2';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleForgotPassword, handleVerifyOtp } from '../redux/AuthSlice';
import useAbortApiCall from '../hooks/useAbortApiCall';
import ResetPassword from '../components/ResetPassword';
import VerifyOtp from '../components/VerifyOtp';
import 'react-phone-input-2/lib/style.css';

const ForgotPassword = () => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [showResetPasswordBox, setShowResetPasswordBox] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { loading, user } = useSelector(s => s.root.auth);

    const { forgotPasswordSchema } = ValidationSchema();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { AbortControllerRef, abortApiCall } = useAbortApiCall();

    const {
        formState: { errors },
        register,
        handleSubmit,
        getValues,
        control,
        setValue,
    } = useForm({
        shouldFocusError: true,
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues: { phone: '+912084422881' },
    });

    const OnSubmitForgotPassword = data => {
        // if (
        //     !isPossiblePhoneNumber(data?.phone) ||
        //     !isValidPhoneNumber(data?.phone)
        // ) {
        //     toast.remove();
        //     toast.error('phone is invalid');
        //     return true;
        // }

        const response = dispatch(
            handleForgotPassword({
                phone: data?.phone,
                signal: AbortControllerRef,
            })
        );
        if (response) {
            response.then(res => {
                if (res?.payload?.success) {
                    toast.success(res?.payload?.message);
                    setShowOtpBox(true);
                }
                // {
                //     toast.remove();
                //     toast.error(res?.payload?.message);
                //     return true;
                // }
            });
        }
    };

    useEffect(() => {
        if (user !== null) navigate('/');

        return () => {
            abortApiCall();
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Forgot password - RJC Directory</title>
            </Helmet>
            {showSuccessModal && (
                <SuccessModal setShowSuccessModal={setShowSuccessModal} />
            )}
            <div className="grid items-center w-screen h-screen gap-5 overflow-y-auto lg:grid-cols-2 xl:gap-0 place-items-center">
                {/* images */}
                <div className="relative hidden w-full h-full lg:block">
                    <img
                        src={require('../assets/images/bgImage.png')}
                        alt=""
                        className="object-cover w-full h-screen"
                    />
                    <Link
                        to="/"
                        className="absolute z-10 space-y-4 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    >
                        <img
                            src={require('../assets/images/logoMain.png')}
                            alt=""
                            className="object-cover w-40 h-fit"
                        />
                        <img
                            src={require('../assets/images/logoTitle.png')}
                            alt=""
                            className="object-cover w-40 h-fit "
                        />
                    </Link>
                </div>
                {!showResetPasswordBox ? (
                    <>
                        {/* otp box */}
                        {showOtpBox ? (
                            <div className="relative z-0 flex items-center justify-center w-screen h-full p-3 lg:w-full bg-bgGray">
                                <img
                                    src={require('../assets/images/bgImage.png')}
                                    alt=""
                                    className="fixed object-cover w-full h-screen lg:hidden -z-10"
                                />
                                <VerifyOtp
                                    phone={getValues().phone}
                                    setShowResetPasswordBox={
                                        setShowResetPasswordBox
                                    }
                                    from="forgot_password"
                                    setShowOtpBox={setShowOtpBox}
                                />
                            </div>
                        ) : (
                            <div className="relative z-0 flex items-center justify-center w-screen h-full p-3 lg:w-full bg-bgGray">
                                <img
                                    src={require('../assets/images/bgImage.png')}
                                    alt=""
                                    className="fixed object-cover w-full h-screen lg:hidden -z-10"
                                />

                                <form
                                    onSubmit={handleSubmit(
                                        OnSubmitForgotPassword
                                    )}
                                    className="bg-white relative text-[#000D23] space-y-4 rounded-lg md:p-10 p-4 shadow-lg"
                                >
                                    <img
                                        src={require('../assets/images/Logo.png')}
                                        alt=""
                                        className="absolute z-10 object-cover -translate-x-1/2 w-fit h-fit lg:hidden -top-16 left-1/2"
                                    />
                                    <p className="text-2xl font-semibold text-left">
                                        Forgot your password?
                                        <span className="block text-base font-semibold text-left text-opacity-50 text-textColor">
                                            We'll help you reset it and get back
                                            on track.
                                        </span>
                                    </p>
                                    <div className="space-y-1">
                                        <label
                                            htmlFor="PhoneNumber"
                                            className="Label"
                                        >
                                            Phone number
                                        </label>
                                        {/* <input type="text" className="input_field" /> */}
                                        {/* <Controller
                                            name="phone"
                                            control={control}
                                            rules={{
                                                validate: value =>
                                                    isValidPhoneNumber(value),
                                            }}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <PhoneInput
                                                    country={'in'}
                                                    onChange={value => {
                                                        onChange(e => {
                                                            setValue(
                                                                'phone',
                                                                '+'.concat(
                                                                    value
                                                                )
                                                            );
                                                        });
                                                    }}
                                                    value={getValues().phone}
                                                    autocompleteSearch={true}
                                                    countryCodeEditable={false}
                                                    enableSearch={true}
                                                    inputStyle={{
                                                        width: '100%',
                                                        padding:
                                                            '24px 0 24px 50px',
                                                        borderRadius: '5px',
                                                        fontSize: '1rem',
                                                    }}
                                                    dropdownStyle={{
                                                        background: 'white',
                                                        color: '#13216e',
                                                        fontWeight: '600',
                                                        padding:
                                                            '0px 0px 0px 10px',
                                                    }}
                                                />
                                            )}
                                        /> */}
                                        <input
                                            type="tel"
                                            placeholder="Enter your Phone number"
                                            {...register('phone')}
                                            className="input_field"
                                            maxLength={10}
                                        />

                                        <span className="error">
                                            {errors?.phone?.message}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full green_button"
                                        >
                                            {loading
                                                ? 'Submitting...'
                                                : 'Submit'}
                                        </button>
                                        <button
                                            disabled={loading}
                                            type="button"
                                            className="w-full blue_button"
                                            onClick={() => navigate('/sign-in')}
                                        >
                                            Go to Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </>
                ) : (
                    <ResetPassword setShowSuccessModal={setShowSuccessModal} />
                )}
            </div>
        </>
    );
};

export default ForgotPassword;
