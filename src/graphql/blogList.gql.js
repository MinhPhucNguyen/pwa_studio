/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2023 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 *
 */

import { gql } from '@apollo/client';

export const BLOG_LISTING = gql`
    query {
        getBlogs {
            blog_id
            title
            category_id
            author
            full_content
            short_content
            status
            post_image
            image_list
            published_at
        }
    }
`;

export const GET_BLOG_BY_ID = gql`
    query getBlogById($id: Int!) {
        getBlogById(id: $id) {
            blog_id
            title
            category_id
            author
            full_content
            short_content
            status
            post_image
            image_list
            published_at
        }
    }
`;

export const CREATE_BLOG = gql`
    mutation createBlog($input: createBlogInput!) {
        createBlog(input: $input) {
            blog_id
            category_id
            title
            author
            full_content
            short_content
            status
            post_image
            image_list
            published_at
        }
    }
`;

export const UPDATE_BLOG = gql`
    mutation updateBlog($id: ID!, $input: createBlogInput!) {
        updateBlog(blog_id: $id, input: $input) {
            category_id
            title
            author
            full_content
            short_content
            status
            post_image
            image_list
            published_at
        }
    }
`;

export const DELETE_BLOG = gql`
    mutation deleteBlog($id: ID!) {
        deleteBlog(blog_id: $id) {
            message
        }
    }
`;

export default {
    getBlogListQuery: BLOG_LISTING,
    getBlogByIdQuery: GET_BLOG_BY_ID,
    createBlogMutation: CREATE_BLOG,
    updateBlogMutation: UPDATE_BLOG,
    deleteBlogMutation: DELETE_BLOG
};
