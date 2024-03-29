// @ts-nocheck
import './style.css';
import { Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import client from '../../axios-client.js';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isValidPhoneNumber } from 'react-phone-number-input'
import {
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { Button, Spinner } from '@material-tailwind/react';

import { route } from 'preact-router';
import { SiWritedotas } from 'react-icons/si';
import { MdPostAdd } from 'react-icons/md';




export default class Home extends Component {
    render(props, state) {
        const data = props;
        const [verifying, setVerifying] = useState(false);
        const [loading, setLoading] = useState(false);
        const [open, setOpen] = useState(false);

        const closeDialog = () => setOpen(false);

        const logOut = () => {
            setOpen(true);
        }

        const signOut = async () => {
            //request to logout
            await client.post('/logout');
            window.location.reload();
        }

        const myPage = () => {
            console.log(data);
            route('/' + data.user['code']);
        }

        const writePost = () => {
            route('/write');
        }

        const editPage = () => {
            route('/edit');
        }

        const explorePage = () => {
            route('/explore');
        }

        useEffect(() => {
        }, []);
        return (
            <div class="flex flex-col items-center sm:w-screen sm:max-w-2xl px-10 pt-10">
                <h1 class="text-white text-7xl font-bold mb-8">lil-Feed</h1>
                <button onClick={myPage} class="text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-white p-2">my feed</button>
                <button onClick={explorePage} class="text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-white p-2">explore</button>
                <div class="flex flex-row w-64 gap-5">
                    <button onClick={editPage} class="text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-32 border-2 border-white p-2">⚙️</button>
                    <button onClick={logOut} class="text-red-600 bg-red-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-32 border-2 border-red-600 p-2">logout</button>
                </div>
                <div class="fixed bottom-4 right-4">
                    <Button color='blue-gray' onClick={writePost}><MdPostAdd size="30"></MdPostAdd></Button>
                </div>
                <Dialog open={open} size='xs' className='bg-gray-200 w-64 rounded-3xl' >
                    <DialogHeader className='justify-center mb-2'>Logout?</DialogHeader>
                    <DialogFooter className='justify-center flex flex-row'>
                        <button onClick={closeDialog} class="text-xl mx-2 text-white bg-gray-800 text-center p-4 font-semibold rounded-xl flex-grow">No</button>
                        <button onClick={signOut} class="text-xl mx-2 text-white bg-red-500 text-center p-4 font-semibold rounded-xl flex-grow">Yes</button>
                    </DialogFooter>
                </Dialog>
            </div >
        );
    }
}


