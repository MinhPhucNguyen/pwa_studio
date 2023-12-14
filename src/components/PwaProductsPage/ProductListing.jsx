/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */
import React from 'react';

import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { GET_PRODUCTS, GET_STORE_CONFIG_DATA } from './Product.gql';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Price from '@magento/venia-ui/lib/components/Price';
import Image from '@magento/venia-ui/lib/components/Image';
import AddToCartButton from '@magento/venia-ui/lib/components/Gallery/addToCartButton';

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 375;

const IMAGE_WIDTHS = new Map()
    .set(320, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 840);

const styles = {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '50px',
    title: {
        textAlign: 'center',
        fontSize: '30px',
        marginTop: '40px'
    },
    li: {
        width: '25%',
        padding: '20px'
    }
};

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

    const { data: storeConfigData } = useQuery(GET_STORE_CONFIG_DATA, {
        fetchPolicy: 'cache-and-network'
    });

    const storeConfig = storeConfigData ? storeConfigData.storeConfig : null;
    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;

    return (
        <div>
            <h1 style={styles.title}>Product Listing</h1>
            <ul style={styles}>
                {PwaProductsListing &&
                    PwaProductsListing.products.items.map((item) => {
                        const productUrl = resourceUrl(
                            `/${item.url_key}${productUrlSuffix || ''}`
                        );

                        const productPrice =
                            item.price_range.maximum_price.final_price ||
                            item.price_range.maximum_price.regular_price;

                        return (
                            <li key={item.id} style={styles.li}>
                                <Link to={productUrl} aria-label={item.name}>
                                    <Image
                                        style={{ width: '100%' }}
                                        alt={item.name}
                                        height={IMAGE_HEIGHT}
                                        resource={item.small_image.url}
                                        widths={IMAGE_WIDTHS}
                                    />
                                </Link>
                                <Link to={productUrl}>
                                    <span>
                                        <strong>{item.name}</strong>
                                    </span>
                                </Link>
                                <div>
                                    <Price
                                        value={productPrice.value}
                                        currencyCode={productPrice.currency}
                                    />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <AddToCartButton
                                        item={item}
                                        urlSuffix={productUrlSuffix}
                                    />
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default ProductListing;
