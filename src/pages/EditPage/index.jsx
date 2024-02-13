// @ts-nocheck
import { useState, useEffect } from 'preact/hooks';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { route } from 'preact-router';
import { Spinner } from "@material-tailwind/react";
import { NotFound } from '../_404';
import client from '../../axios-client';
import { hist } from '../../axios-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserProfile } from '../../actions/dataActions';
import {
    Dialog,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";

const ProfileEditPage = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [updating, setUpdating] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setName(user.user.name);
            setBio(user.user.bio);
        }
    }, [user]);

    const goBack = () => {
        route('/', true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const startTime = Date.now();

        await dispatch(updateUserProfile(name, bio));
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 600) {
            await new Promise(resolve => setTimeout(resolve, 600 - elapsedTime));
        }
        console.log(user);
        setUpdating(false);
    };

    const closeDialog = () => setOpen(false);

    const deleteAccount = () => {
        setOpen(true);
    }

    const confDelete = async () => {
        const res = await client.delete('/user');
        route('/');
    }

    if (loading && user == null) return (<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>);
    if (user == null) return (<NotFound></NotFound>);
    return (
        <div class="pt-4 sm:w-screen sm:max-w-2xl">
            <div onClick={goBack} class=" text-gray-600 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ back</div>
            <div className=" bg-gray-200 sm:w-screen sm:max-w-2xl rounded-xl p-4 text-black">

                <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        value={name}
                        style="font-size:16px;"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <div >
                        <Textarea label="Bio" value={bio}
                            style="font-size:16px;"

                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    <Button type="submit" size="lg" className='h-14 w-40 items-center'>{updating ? <Spinner className='mx-auto'></Spinner> : 'Save Profile'}</Button>
                </form>

            </div>
            <button onClick={deleteAccount} class="text-red-600 mt-10 bg-red-700 bg-opacity-0 hover:bg-opacity-10 text-2xl font-bold mb-8 w-64 border-2 border-red-600 p-2">Delete Account</button>
            <Dialog open={open} size='xs' className='bg-gray-200 w-64 rounded-3xl' >
                <DialogHeader className='justify-center mb-2'>Delete Account?</DialogHeader>
                <DialogFooter className='justify-center flex flex-row'>
                    <button onClick={closeDialog} class="text-xl mx-2 text-white bg-gray-800 text-center p-4 font-semibold rounded-xl flex-grow">No</button>
                    <button onClick={confDelete} class="text-xl mx-2 text-white bg-red-500 text-center p-4 font-semibold rounded-xl flex-grow">Yes ☢️</button>
                </DialogFooter>
            </Dialog>
        </div>



    );
};

export default ProfileEditPage;