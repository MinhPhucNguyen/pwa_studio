/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import React from 'react';
import './SignInPage.css';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { useUserContext } from '@magento/peregrine/lib/context/user';

import { Form } from 'informed';
import { SIGN_IN, GET_CUSTOMER } from './SignIn.gql';

import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Password from '@magento/venia-ui/lib/components/Password';
import Field from '@magento/venia-ui/lib/components/Field';
import Button from '@magento/venia-ui/lib/components/Button';

const SignInPage = () => {
    const history = useHistory();
    const [signInMessage, setSignInMessage] = useState('');

    const [
        { isGettingDetails, getDetailsError },
        { getUserDetails, setToken }
    ] = useUserContext();

    const [SignIn] = useMutation(SIGN_IN);
    const fetchUserDetails = useAwaitQuery(GET_CUSTOMER);

    // hadleSubmit when sign in
    const handleSubmit = async (values) => {
        setSignInMessage('');
        try {
            const { data: signInResponse } = await SignIn({
                variables: {
                    email: values.email,
                    password: values.password
                }
            });

            const tokenResponse = signInResponse.generateCustomerToken.token;
            await setToken(tokenResponse);

            getUserDetails({ fetchUserDetails });

            const { data } = await fetchUserDetails({
                fetchPolicy: 'cache-only'
            });

            setSignInMessage('Sign In successfully');
            history.push('/account-information');
        } catch (error) {
            setSignInMessage(error.message);
        }
    };

    return (
        <div>
            <div className="signin-title">Sign In</div>
            <div className="signin-message">{signInMessage}</div>
            <div className="signin-form">
                <Form onSubmit={handleSubmit}>
                    <Field label="Email" required={true} id="email">
                        <TextInput field="email" aria-label="Email" />
                    </Field>
                    <Password field="password" label="Password" />
                    <div className="signin-btn">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default SignInPage;
