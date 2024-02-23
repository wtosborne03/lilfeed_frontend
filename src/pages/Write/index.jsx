// @ts-nocheck
import { useMemo, useState, useEffect } from 'preact/hooks';
import { Button, Spinner } from '@material-tailwind/react';
import { route } from 'preact-router';
import client from '../../axios-client';
import { NotFound } from '../_404';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../actions/dataActions';
import './style.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

const BlogPostEditor = () => {
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const { user, loading, error } = useSelector(state => state.user);
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    const cancel = () => {
        route('/');
    }

    const closeDialog = () => setOpen(false);


    const post = async () => {


        setUploading(true);
        const content = value;
        const startTime = Date.now();
        try {
            const post_res = await client.post('/post', {
                'title': title,
                'content': content
            });
        } catch (error) {
            console.log(error);
        }
        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 600) {
            await new Promise(resolve => setTimeout(resolve, 600 - elapsedTime));
        }
        setUploading(false);
        //go back to home
        route('/');
    }

    if (loading && !user) return (<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>);
    if (user == null) return (<NotFound></NotFound>);
    return (
        <div className="flex flex-col justify-start sm:pt-10 sm:w-screen sm:max-w-2xl text-white">
            <div onClick={cancel} class=" text-gray-600 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ back</div>
            <div class="mb-5 mt-10 flex flex-row items-center justify-between">
                <div class="text-2xl font-semibold">new feed post</div>
                <Button disabled={title.trim().length === 0} onClick={post} className='h-12 w-28 lowercase items-center p-1 text-cap text-lg text-center bg-gray-800'>{uploading ? <Spinner className='mx-auto'></Spinner> : 'post 📥'}</Button>
            </div>
            <input type="text" placeholder="Post Title" class="mb-5 p-2" value={title} onChange={el => setTitle(el.target.value)}></input>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Dialog open={open} size='xs' className='bg-gray-200 w-64 rounded-3xl' >
                <DialogHeader className='justify-center mb-2'>Logout?</DialogHeader>
                <DialogFooter className='justify-center flex flex-row'>
                    <button onClick={closeDialog} class="text-xl mx-2 text-white bg-gray-800 text-center p-4 font-semibold rounded-xl flex-grow">No</button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default BlogPostEditor;