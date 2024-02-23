// @ts-nocheck
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




export default class Explore extends Component {
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

        const goBack = () => {
            route('/');
        }

        useEffect(() => {
        }, []);
        return (
            <div class="flex flex-col items-center sm:w-screen sm:max-w-2xl px-10 pt-10">
                <div onClick={goBack} class=" text-gray-600 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ back</div>

                <h1 class="text-white text-2xl font-bold mb-8">explore new feeds</h1>
                coming soon 🏗️

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


