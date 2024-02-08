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
import { route } from 'preact-router';




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

        const myPage = () => {
            route('/' + data.user.user['number']);
        }

        const writePost = () => {
            route('/write');
        }


        useEffect(() => {
        }, []);
        return (
            <div class="flex flex-col items-center w-full  h-screen px-10 pt-10">
                <h1 class="text-white text-7xl font-bold mb-8">lilFeed</h1>
                <button onClick={myPage} class="text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-white p-2">Your Page</button>
                <button onClick={writePost} class="text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-white p-2">Write Post</button>
                <button onClick={logOut} class="text-red-600 bg-red-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-red-600 p-2">Logout</button>
                <div class="">{data.user['number']}</div>

                <Dialog open={open} size="xs" className=''>
                    <DialogHeader className='justify-center'>Logout</DialogHeader>
                    <div class="text-black text-center text-xl">Are you sure you want to sign out of your account?</div>
                    <DialogFooter className='justify-center'>
                        <button onClick={closeDialog} class="text-xl mx-2 text-white bg-gray-800 text-center p-4 font-semibold rounded-xl">No</button>
                        <button onClick={closeDialog} class="text-xl mx-2 text-white bg-red-500 text-center p-4 font-semibold rounded-xl">Yes</button>

                    </DialogFooter>
                </Dialog>
            </div >
        );
    }
}


