/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Image from '@magento/venia-ui/lib/components/Image';
import { Link } from 'react-router-dom';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

const IMAGE_WIDTHS = new Map()
    .set(320, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const GET_PRODUCTS = gql`
    query getProducts($filter: ProductAttributeFilterInput) {
        products(filter: $filter) {
            items {
                id
                uid
                name
                sku
                show_on_pwa
                created_at
                updated_at
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

const ProductListing = () => {
    const { data: PwaProductsListing } = useQuery(GET_PRODUCTS, {
        variables: {
            filter: {
                show_on_pwa: {
                    eq: 1
                }
            }
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-and-network'
    });

    const styles = {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '50px',

        li: {
            padding: '20px'
        }
    };

    return (
        <div>
            <h1>Product Listing</h1>
            <ul style={styles}>
                {PwaProductsListing &&
                    PwaProductsListing.products.items.map((item) => {
                        if (item.show_on_pwa === 1) {
                            return (
                                <li key={item.id} style={styles.li}>
                                    <Link aria-label={item.name}>
                                        <Image
                                            style={{ width: '100%' }}
                                            alt={item.name}
                                            height={IMAGE_HEIGHT}
                                            resource={item.small_image.url}
                                            widths={IMAGE_WIDTHS}
                                        />
                                    </Link>
                                    <div>
                                        <p>SKU: {item.sku}</p>
                                        <p>{item.name}</p>
                                        <p>
                                            Show On Pwa:{' '}
                                            {item.show_on_pwa === 1
                                                ? 'True'
                                                : 'False'}
                                        </p>
                                        <div>
                                            <p>
                                                <strong>
                                                    {
                                                        item.price_range
                                                            .minimum_price
                                                            .final_price.value
                                                    }
                                                </strong>
                                            </p>
                                            <p>
                                                {
                                                    item.price_range
                                                        .minimum_price
                                                        .final_price.currency
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        }
                    })}
            </ul>
        </div>
    );
};

export default ProductListing;
