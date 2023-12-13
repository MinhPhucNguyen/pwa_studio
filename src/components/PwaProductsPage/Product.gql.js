/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
    query getProducts($filter: ProductAttributeFilterInput) {
        products(filter: $filter) {
            items {
                id
                uid
                name
                sku
                show_on_pwa
                url_key
                small_image {
                    url
                }
                price_range {
                    minimum_price {
                        final_price {
                            value
                            currency
                        }
                    }
                }
            }
        }
    }
`;

export const GET_STORE_CONFIG_DATA = gql`
    query GetStoreConfigData {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        storeConfig {
            store_code
            product_url_suffix
            magento_wishlist_general_is_enabled
        }
    }
`;

export default {
    getProductsQuery: GET_PRODUCTS,
    getStoreConfigQuery: GET_STORE_CONFIG_DATA
};
