// @ts-nocheck
import './style.css';
import { Component } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import client from '../../axios-client.js';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isValidPhoneNumber } from 'react-phone-number-input'
import {
    Dialog,
    Spinner,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { route } from 'preact-router';
import { Footer } from '../../components/Footer';



const MiniCard = (props) => {
    return (
        <div class="border-l-4 border-white mb-8 bg-white transition-all  cursor-pointer duration-100 hover:bg-opacity-5 bg-opacity-0 w-full text-white">
            <div class="px-4 py-2 pointer-events-none">
                <span class="flex flex-row items-center justify-between">
                    <div class="text-start text-lg font-semibold">{props.text}</div>
                    <div class="text-3xl">{props.icon}</div>
                </span>
            </div>
        </div >
    );
}

export default class Login extends Component {

    render(props, state) {
        const { data } = state;
        const [number, setNumber] = useState('');
        const [code, setCode] = useState('');
        const [text, setText] = useState('personal feeds that live on your number.');
        const [verifying, setVerifying] = useState(false);
        const [loading, setLoading] = useState(false);
        const [open, setOpen] = useState(false);
        const pinLength = 4;
        const [pin, setPin] = useState(Array(pinLength).fill(''));
        const inputRefs = useRef([]);
        const [loadingScreen, setLoadingScreen] = useState(false);
        const { countries } = useCountries();
        const [country, setCountry] = useState(195);
        const { name, flags, countryCallingCode } = countries[country];

        useEffect(() => {
            //startup function
        }, []);



        //send authentication code
        const verify = async (e) => {
            console.log(country);
            e.preventDefault();
            setVerifying(true);
            setText('Enter the 4 digit code sent to your phone.');
            inputRefs.current[0]?.focus();

            try {
                const response = await client.post('/verify', { number: (countryCallingCode + number).replace(/\D/g, '') });
            } catch (error) {
                console.log(error);
            }
        }




        const handleChange = (index, value) => {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            if (value && index < pinLength - 1) {
                if (inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1].focus();
                    inputRefs.current[index + 1].value = '';
                }
            }

            validatePin(newPin.join(''));
        };

        const handleKeyDown = (index, event) => {
            index = index - 1;

            if (event.key === 'Backspace' && pin[index + 1] === '') {
                if (inputRefs.current[index]) {
                    const newPin = [...pin];
                    newPin[index] = '';
                    setPin(newPin);
                    validatePin(newPin.join(''));

                    inputRefs.current[index].focus();
                    inputRefs.current[index].value = '';

                }
            }
        };


        const validatePin = (code) => {
            // Check pin on server
            console.log(code);
            setCode(code);

        };

        //verify the authentication code
        const confirm = async (e) => {
            setLoadingScreen(true);
            e.preventDefault();
            try {
                const response = await client.post('/confirm', { username: (countryCallingCode + number).replace(/\D/g, ''), password: code });
                //reroute to their page
                window.location.reload();

            } catch (error) {
                await setLoadingScreen(false);
                console.log(error);
                setOpen(true);
            }
        }

        //go back to main screen
        const goBack = () => {
            setVerifying(false);
            setText('personal feeds that live on your number.');
        }
        const onCodeChanged = (el) => {
            setCode(el.target.value);
        }

        const closeDialog = () => setOpen(false);
        if (loadingScreen) {
            return (<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>
            );
        }
        return (
            <div class="flex scroll flex-col items-center sm:w-screen sm:max-w-2xl h-full flex-grow pt-10">
                <div class="px-10">
                    <h1 class="text-white text-7xl font-bold mb-8">lil-Feed</h1>
                    <TransitionGroup class="h-48" >
                        {!verifying ?
                            <CSSTransition
                                key="first"
                                timeout={1000}
                                classNames="fade-left"
                            >
                                <div class="anim-invisible">
                                    <form onSubmit={verify} class="number-input relative">
                                        <div class=" p-2 rounded-xl">
                                            <div className="relative flex h-16 w-full text-white max-w-[24rem]">
                                                <Menu placement="bottom-start" >
                                                    <MenuHandler>
                                                        <Button
                                                            ripple={false}
                                                            variant="text"
                                                            size='lg'
                                                            color="blue-gray"
                                                            className="flex  h-16 w-24 items-center gap-3 py-3 rounded-r-none  border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                                                        >
                                                            <img
                                                                src={flags.svg}
                                                                alt={name}
                                                                className="h-full aspect-square  my-auto rounded-full object-cover"
                                                            />
                                                            <span class="text-white">{countryCallingCode}</span>

                                                        </Button>
                                                    </MenuHandler>
                                                    <MenuList className="max-h-[20rem] max-w-[16rem] bg-gray-300 text-black font-normal text-md">
                                                        {countries.map(({ name, flags, countryCallingCode }, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={name}
                                                                    value={name}
                                                                    className="flex items-center py-3 gap-3 "
                                                                    onClick={() => setCountry(index)}
                                                                >
                                                                    <img
                                                                        src={flags.svg}
                                                                        alt={name}
                                                                        className="h-5 w-5  my-auto rounded-full object-cover"
                                                                    />
                                                                    {name} <span className="ml-auto">{countryCallingCode}</span>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </MenuList>
                                                </Menu>
                                                <input
                                                    type="tel"
                                                    size='lg'
                                                    placeholder="Mobile Number"
                                                    value={number}
                                                    onChange={num => setNumber(num.target.value)}
                                                    class="rounded-l-none p-3 w-60 font-semibold text-white h-16 focus:outline-none text-2xl rounded-xl"
                                                />
                                            </div></div>
                                        <button disabled={!isValidPhoneNumber(countryCallingCode + number)} type="submit" class="text-xl active:scale-95  mt-9 disabled:opacity-60 bg-gray-800 text-center p-4 font-semibold rounded-xl">login / register 🤙</button>
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
                                        <span className=" flex flex-row relative w-96 justify-center">
                                            {pin.map((_, index) => (
                                                <input
                                                    key={`codefield_${index}`}
                                                    ref={(el) => (inputRefs.current[index] = el)}
                                                    type="tel"
                                                    class="h-16 w-12 border-2 mx-2 focus:outline-none focus:scale-105 rounded-lg flex items-center text-center font-semibold text-3xl"
                                                    maxLength={1}
                                                    value={pin[index]}
                                                    onChange={(e) => handleChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                />
                                            ))}
                                        </span>
                                        <button disabled={!(code.length == 4)} type="submit" class="text-xl mt-9 active:scale-95  disabled:opacity-60 bg-gray-800 text-center p-4 font-semibold rounded-xl">Verify 🔑</button>
                                    </form>
                                </div></CSSTransition>
                        }

                    </TransitionGroup>
                    <Dialog open={open} size="xs" className='bg-gray-200 w-64 rounded-3xl'>
                        <DialogHeader className='justify-center'>Invalid Code</DialogHeader>
                        <DialogFooter className='justify-center flex flex-row'>
                            <button onClick={closeDialog} class="text-xl flex-grow text-white bg-red-500 text-center p-4 font-semibold rounded-xl">Ok</button>
                        </DialogFooter>
                    </Dialog>
                </div>
                <div class="h-32"></div>
                <div class="text-start w-full px-4">
                    <MiniCard text="your own feed, attached to your number." icon="📱" />
                    <MiniCard text="find other feeds by phone number." icon="🔍" />
                    <MiniCard text="anonymously share your feed with a five-letter code." icon="📫" />
                    <MiniCard text="write about your day, or your job." icon="💬" />
                    <MiniCard text="maybe write about your hike? or some flowers." icon="🌲" />
                    <MiniCard text="customize your page." icon="📐" />
                </div>

            </div >
        );
    }
}

