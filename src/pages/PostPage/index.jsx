// @ts-nocheck
import { useEffect, useState } from 'preact/hooks';
import { NotFound } from '../_404';
import { Spinner } from "@material-tailwind/react";
import { Card } from '../Space/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../actions/dataActions';

import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import { route } from 'preact-router';
import { FETCH_POST_LOAD } from '../../actions/types';
import { createPortal } from 'preact/compat';

const PostPage = ({ number, slug }) => {
    const dispatch = useDispatch();
    const { post, loading, error } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchPost(number, slug));
    }, [dispatch, number, slug]);



    const goBack = () => {
        route('/' + number, true);
    }

    if (loading && !post) return (<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>);

    if (error || !post) {
        return NotFound();
    }

    return (
        <div class="flex flex-col items-center sm:w-screen sm:max-w-2xl h-screen pt-4">
            {createPortal(
                <>
                    <title>{post.title}</title>
                    <meta name="description" content={post.title} />
                </>
                , document.head)}
            <div onClick={goBack} class=" text-gray-600 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ feed</div>


            <div class="rounded-2xl mb-5 w-full text-white">

                <div class="px-6 py-4">

                    <div class="text-start text-lg font-semibold">{post.title}</div>
                    <div class="">
                        <ReactQuill
                            value={post.content}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </div>
                    <div class=" text-gray-700 text-start text-sm mt-4 ">{moment(post.createdAt).format('MMMM Do, YYYY, h:mm a')}</div>

                </div>

            </div>

        </div>
    );
}

export default PostPage;