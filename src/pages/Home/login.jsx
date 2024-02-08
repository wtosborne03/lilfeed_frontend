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




export default class Login extends Component {

    render(props, state) {
        const { data } = state;
        const [number, setNumber] = useState('');
        const [code, setCode] = useState('');
        const [text, setText] = useState('Get your own feed, tied to your phone number.');
        const [verifying, setVerifying] = useState(false);
        const [loading, setLoading] = useState(false);
        const [open, setOpen] = useState(false);


        useEffect(() => {

            //startup function
        }, []);

        //send authentication code
        const verify = async (e) => {
            e.preventDefault();
            setVerifying(true);
            setText('Enter the 4 digit code sent to your phone.');
            try {
                const response = await client.post('/verify', { number: number.replace(/\D/g, '') });
            } catch (error) {
                console.log(error);
            }

        }

        //verify the authentication code
        const confirm = async (e) => {
            e.preventDefault();
            try {
                const response = await client.post('/confirm', { username: number.replace(/\D/g, ''), password: code });
                //reroute to their page
                window.location.reload();
            } catch (error) {
                console.log(error);
                setOpen(true);
            }

        }

        //go back to main screen
        const goBack = () => {
            setVerifying(false);
            setText('Get your own feed, tied to your phone number.');
        }
        const onCodeChanged = (el) => {
            setCode(el.target.value);
        }

        const closeDialog = () => setOpen(false);

        return (
            <div class="flex flex-col items-center w-full  h-screen px-10 pt-10">
                <h1 class="text-white text-7xl font-bold mb-8">lilFeed</h1>
                <div className="text-container h-32">
                    <TransitionGroup component={null}>
                        <CSSTransition key={text} timeout={2000} classNames="fade">
                            <div className="text-box text-white text-2xl font-bold  h-0">
                                {text}
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </div>



                <TransitionGroup>


                    {!verifying ?
                        <CSSTransition
                            key="first"
                            timeout={1000}
                            classNames="fade-left"
                        >
                            <div class="anim-invisible">
                                <form onSubmit={verify} class="number-input relative">
                                    <PhoneInput
                                        defaultCountry="US"
                                        value={number}
                                        onChange={setNumber} />
                                    <button disabled={!isValidPhoneNumber(number)} type="submit" class="text-xl mt-9 disabled:opacity-60 bg-gray-800 text-center p-4 font-semibold rounded-xl">login / register 🤙</button>
                                </form>
                            </div></CSSTransition>
                        :
                        <CSSTransition
                            key="second"
                            timeout={1000}
                            classNames="fade-right"
                        >
                            <div class="anim-invisible">
                                <form onSubmit={confirm} class="number-input relative">
                                    <div onClick={goBack} class=" text-gray-400 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ back</div>

                                    <input maxlength={4} onChange={onCodeChanged} value={code} type='text' class="PhoneInputInput"></input><br />
                                    <button disabled={!(code.length == 4)} type="submit" class="text-xl mt-9 disabled:opacity-60 bg-gray-800 text-center p-4 font-semibold rounded-xl">Verify 🔑</button>
                                </form>
                            </div></CSSTransition>
                    }

                </TransitionGroup>
                <Dialog open={open} size="xs" className=''>
                    <DialogHeader className='justify-center'>Invalid Code</DialogHeader>
                    <DialogFooter className='justify-center'>

                        <button onClick={closeDialog} class="text-xl text-white bg-red-500 text-center p-4 font-semibold rounded-xl">Ok</button>

                    </DialogFooter>
                </Dialog>
            </div >
        );
    }
}


