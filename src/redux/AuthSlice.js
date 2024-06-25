import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetUrl, PostUrl } from '../BaseUrl';
import toast from 'react-hot-toast';

export const handleRegister = createAsyncThunk(
    'auth/handleRegister',
    async ({ data, fcmToken, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append('fcmToken', fcmToken);

        try {
            const { data } = await PostUrl('register', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleSocial = createAsyncThunk(
    'auth/handleSocial',
    async ({ data, token, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append('token', token);

        try {
            const { data } = await PostUrl('social-login', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleSocialProfile = createAsyncThunk(
    'auth/handleSocialProfile',
    async ({ data, token, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append('token', token);

        try {
            const { data } = await PostUrl('create-social-profile', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleSignin = createAsyncThunk(
    'auth/handleSignin',
    async ({ phone, password, fcmToken, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();

        const formData = new FormData();

        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('fcmToken', fcmToken);

        try {
            const { data } = await PostUrl('login', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleGetSigninOTP = createAsyncThunk(
    'auth/handleGetSigninOTP',
    async ({ phone, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();

        const formData = new FormData();

        formData.append('phone', phone);

        try {
            const { data } = await PostUrl('send-otp', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleVerifySigninOTP = createAsyncThunk(
    'auth/handleVerifySigninOTP',
    async ({ phone, otp, fcmToken, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();

        const formData = new FormData();

        formData.append('phone', phone);
        formData.append('otp', otp);
        formData.append('fcmToken', fcmToken);

        try {
            const { data } = await PostUrl('verify-otp', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleForgotPassword = createAsyncThunk(
    'auth/handleForgotPassword',
    async ({ phone, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();

        const formData = new FormData();
        formData.append('phone', phone);
        try {
            const { data } = await PostUrl('forgot-password', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleVerifyOtp = createAsyncThunk(
    'auth/handleVerifyOtp',
    async ({ otp, phone, signal }, { rejectWithValue }) => {
        signal.current = new AbortController();
        const formdata = new FormData();
        formdata.append('otp', otp);
        formdata.append('phone', phone);
        try {
            const { data } = await PostUrl('verify-forgot-otp', {
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message);
                }
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleResetPassword = createAsyncThunk(
    'auth/handleResetPassword',
    async (
        { token, password, confirmPassword, signal },
        { rejectWithValue }
    ) => {
        signal.current = new AbortController();

        const formdata = new FormData();
        formdata.append('token', token);
        formdata.append('password', password);
        formdata.append('confirmPassword', confirmPassword);

        try {
            const { data } = await PostUrl('reset-password', {
                data: formdata,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message);
                }
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleEditProfile = createAsyncThunk(
    'auth/handleEditProfile',
    async (
        { token, dob, anniversary, state, city, name, image, signal },
        { rejectWithValue }
    ) => {
        signal.current = new AbortController();
        const formData = new FormData();

        formData.append('dob', dob);
        formData.append('anniversary', anniversary);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('name', name);
        formData.append('photo', image);

        try {
            const { data } = await PostUrl('edit-profile', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleChangePassword = createAsyncThunk(
    'auth/handleChangePassword',
    async (
        { token, password, newPassword, confirmPassword, signal },
        { rejectWithValue }
    ) => {
        signal.current = new AbortController();

        const formData = new FormData();

        formData.append('newPassword', newPassword);
        formData.append('confirmPassword', confirmPassword);
        formData.append('password', password);

        try {
            const { data } = await PostUrl('change-password', {
                data: formData,
                signal: signal.current.signal,
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleGetPreference = createAsyncThunk(
    'auth/handleGetPreference',
    async ({ token }, { rejectWithValue }) => {
        try {
            const { data } = await GetUrl('preference', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            // if (error?.response?.data?.message) {
            //   toast.error(error?.response?.data?.message);
            // }
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const handleAddAndEditPreference = createAsyncThunk(
    'auth/handleAddAndEditPreference',
    async (
        {
            token,
            selectedRating,
            latitude,
            longitude,
            distance,
            selectedCategories,
            signal,
        },
        { rejectWithValue }
    ) => {
        signal.current = new AbortController();
        try {
            const formData = new FormData();
            if (selectedRating) {
                formData.append('rating', selectedRating);
            }
            if (distance) {
                formData.append('distance', distance);
            }
            if (longitude !== '' && latitude !== '') {
                formData.append('longitude', longitude);
                formData.append('latitude', latitude);
            }
            if (selectedCategories.length > 0) {
                selectedCategories.forEach(cat =>
                    formData.append('categoryIds', cat?._id)
                );
            }

            const { data } = await PostUrl('preference', {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                },
                signal: signal.current.signal,
            });
            return data;
        } catch (error) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            }
            rejectWithValue(error?.response?.data);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    user: null,
    token: null,
    preferences: null,
    preferencesLoading: false,
    preferenceGetLoading: false,
    fcmToken: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: (state, { payload }) => {
            state.loading = true;
            state.user = null;
            state.token = null;
            state.error = null;
            state.fcmToken = null;
            state.loading = false;
        },
        handleChangeFcmToken: (state, { payload }) => {
            state.fcmToken = payload;
        },
    },
    extraReducers: builder => {
        // register
        builder.addCase(handleRegister.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(handleRegister.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload?.user ?? null;
            state.token = payload?.token ?? null;
            state.error = null;
        });
        builder.addCase(handleRegister.rejected, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = payload ?? null;
        });

        // google login
        builder.addCase(handleSocial.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(handleSocial.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload?.user ?? null;
            state.token = payload?.token ?? null;
            state.error = null;
        });
        builder.addCase(handleSocial.rejected, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = payload ?? null;
        });

        // Social Profile
        builder.addCase(handleSocialProfile.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(handleSocialProfile.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload?.user ?? null;
            state.token = payload?.token ?? null;
            state.error = null;
        });
        builder.addCase(handleSocialProfile.rejected, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = payload ?? null;
        });

        // login
        builder.addCase(handleSignin.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(handleSignin.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload?.user ?? null;
            state.token = payload?.token ?? null;
            state.error = null;
        });
        builder.addCase(handleSignin.rejected, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = payload ?? null;
        });

        // login with otp
        builder.addCase(handleGetSigninOTP.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(handleGetSigninOTP.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
        });
        builder.addCase(handleGetSigninOTP.rejected, (state, { payload }) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = payload ?? null;
        });

        // verify login otp
        builder.addCase(handleVerifySigninOTP.pending, (state, { payload }) => {
            state.loading = true;
        });
        builder.addCase(
            handleVerifySigninOTP.fulfilled,
            (state, { payload }) => {
                state.loading = false;
                state.user = payload?.user ?? null;
                state.token = payload?.token ?? null;
                state.error = null;
            }
        );
        builder.addCase(
            handleVerifySigninOTP.rejected,
            (state, { payload }) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = payload ?? null;
            }
        );

        // forgot-password
        builder
            .addCase(handleForgotPassword.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(handleForgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(handleForgotPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
                state.user = null;
                state.token = null;
            });

        // otp verify
        builder
            .addCase(handleVerifyOtp.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(handleVerifyOtp.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = null;
                state.token = payload?.token;
                state.error = null;
            })
            .addCase(handleVerifyOtp.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
                state.user = null;
                state.token = null;
            });

        //reset password
        builder
            .addCase(handleResetPassword.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(handleResetPassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
            .addCase(handleResetPassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
                state.user = null;
                state.token = null;
            });

        //edit profile
        builder
            .addCase(handleEditProfile.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(handleEditProfile.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload?.user ?? state.user;
                state.error = null;
            })
            .addCase(handleEditProfile.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
                state.user = state.user;
            });

        // change password
        builder
            .addCase(handleChangePassword.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(handleChangePassword.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(handleChangePassword.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload ?? null;
            });

        // get preferences
        builder
            .addCase(handleGetPreference.pending, (state, { payload }) => {
                state.preferenceGetLoading = true;
            })
            .addCase(handleGetPreference.fulfilled, (state, { payload }) => {
                state.preferenceGetLoading = false;
                state.preferences = payload ?? null;
                state.error = null;
            })
            .addCase(handleGetPreference.rejected, (state, { payload }) => {
                state.preferenceGetLoading = false;
                state.preferences = null;
                state.error = payload ?? null;
            });

        // add or edit preference
        builder
            .addCase(
                handleAddAndEditPreference.pending,
                (state, { payload }) => {
                    state.preferencesLoading = true;
                }
            )
            .addCase(
                handleAddAndEditPreference.fulfilled,
                (state, { payload }) => {
                    state.preferencesLoading = false;
                    state.error = null;
                }
            )
            .addCase(
                handleAddAndEditPreference.rejected,
                (state, { payload }) => {
                    state.preferencesLoading = false;
                    state.error = payload ?? null;
                }
            );
    },
});

export const { handleLogout, handleChangeFcmToken } = AuthSlice.actions;

export default AuthSlice.reducer;
