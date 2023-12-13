/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_CUSTOMER_INFORMATION = gql`
    query {
        customer {
            firstname
            middlename
            lastname
            suffix
            email
            department
            addresses {
                firstname
                middlename
                lastname
                street
                city
                region {
                    region_code
                    region
                }
                postcode
                country_code
                telephone
            }
        }
    }
`;

const CustomerInfor = () => {
    const { data: customerInformation } = useQuery(GET_CUSTOMER_INFORMATION, {
        context: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('signin_token')}`
            }
        }
    });

    return (
        <div>
            <p>
                Name:{' '}
                {customerInformation.customer.firstname +
                    ' ' +
                    customerInformation.customer.lastname}
            </p>
            <p>Email: {customerInformation.customer.email}</p>
            <p>Department: {customerInformation.customer.department}</p>
        </div>
    );
};

export default CustomerInfor;
