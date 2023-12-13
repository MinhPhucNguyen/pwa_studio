/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import React from 'react';
import { useState } from 'react';
import './LoginPage.css';
import { Form } from 'informed';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Password from '@magento/venia-ui/lib/components/Password';
import Field from '@magento/venia-ui/lib/components/Field';
import Button from '@magento/venia-ui/lib/components/Button';

const GET_TOKEN_CUSTOMER = gql`
    mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

const LoginPage = () => {
    const history = useHistory();
    const [token, setToken] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [getTokenCustomer] = useMutation(GET_TOKEN_CUSTOMER);

    const handleSubmit = async (values) => {
        setLoginMessage('');
        try {
            const { data } = await getTokenCustomer({
                variables: {
                    email: values.email,
                    password: values.password
                }
            });
            if (
                data.generateCustomerToken &&
                data.generateCustomerToken.token
            ) {
                setToken(data.generateCustomerToken.token);
                setLoginMessage('Login successfully');
                localStorage.setItem(
                    'signin_token',
                    data.generateCustomerToken.token
                );
                // history.push('/customer/pwa');
                history.push('/account-information');
            } else {
                setLoginMessage('Login failed');
            }
        } catch (error) {
            setLoginMessage(error.message);
        }
    };

    return (
        <div>
            <div className="login-title">Login</div>
            <div>{loginMessage}</div>
            <div className="login-form">
                <Form onSubmit={handleSubmit}>
                    <Field label="Email" required={true} id="email">
                        <TextInput field="email" aria-label="Email" />
                    </Field>
                    <Password field="password" label="Password" />
                    <div className="login-btn">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default LoginPage;
