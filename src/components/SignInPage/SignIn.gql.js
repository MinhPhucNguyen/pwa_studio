/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export const GET_CUSTOMER = gql`
    query GetCustomerAfterSignIn {
        customer {
            email
            firstname
            lastname
            is_subscribed
        }
    }
`;

export default {
    getCustomerQuery: GET_CUSTOMER,
    signInMutation: SIGN_IN
};
