/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

module.exports = (targets) => {
    targets.of('@magento/venia-ui').routes.tap((routes) => {
        routes.push(
            {
                name: 'BlogListing',
                pattern: '/blog/list',
                path: require.resolve(
                    '../components/BlogPages/BlogListing/BlogListing.jsx'
                )
            },
            {
                name: 'CreateBlog',
                pattern: '/blog/post/create',
                path: require.resolve(
                    '../components/BlogPages/CreateBlog/CreateBlog.jsx'
                )
            },
            {
                name: 'EditBlog',
                pattern: '/blog/edit/:blog_id',
                path: require.resolve(
                    '../components/BlogPages/CreateBlog/CreateBlog.jsx'
                )
            },
            {
                name: 'Product Listing',
                pattern: '/product/pwa',
                path: require.resolve(
                    '../components/PwaProductsPage/ProductListing.jsx'
                )
            },
            {
                name: 'Customer Information',
                pattern: '/customer/pwa',
                path: require.resolve(
                    '../components/CustomerInformation/CustomerInfor.jsx'
                )
            },
            {
                name: 'SignIn',
                pattern: '/signin/pwa',
                path: require.resolve('../components/SignInPage/SignInPage.jsx')
            }
        );
    });
};
