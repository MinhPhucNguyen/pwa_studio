/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import { gql } from '@apollo/client';

export const CATEGORY_LISTING = gql`
    query {
        getCategories {
            category_id
            name
            description
            status
            created_at
            updated_at
        }
    }
`;

export default {
    getCategoryListQuery: CATEGORY_LISTING
};
