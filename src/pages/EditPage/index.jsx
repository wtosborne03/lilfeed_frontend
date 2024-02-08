// @ts-nocheck
import { useState, useEffect } from 'preact/hooks';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { route } from 'preact-router';
import { Spinner } from "@material-tailwind/react";
import { NotFound } from '../_404';
import client from '../../axios-client';


const ProfileEditPage = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(async () => {
        try {
            var response = await client.get('/user');
            setUser(response.data.user);

            setName(response.data.user['name'])
            setBio(response.data.user['bio'])

            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                setLoading(false);
            }
        }
    }, []);

    const goBack = () => {
        route('/' + user['number'])
    }

    const handleSubmit = async (e) => {
        setUpdating(true);
        e.preventDefault();
        // Here you would typically make a request to your server to update the user's profile
        // For example, using fetch API
        const startTime = Date.now();

        var update_res = await client.put('/user', {
            'name': name,
            'bio': bio
        });
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 600) {
            await new Promise(resolve => setTimeout(resolve, 600 - elapsedTime));
        }

        setUpdating(false);

    };
    if (loading) return (<Spinner></Spinner>);
    if (user == null) return (<NotFound></NotFound>);
    return (
        <div className="container bg-gray-200 max-w-screen-md w-96 rounded-xl mx-auto p-4 text-black">
            <div onClick={goBack} class=" text-gray-600 hover:cursor-pointer pl-2 mb-5 underline text-lg">‹ back</div>

            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div >
                    <Textarea label="Bio" value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>

                <Button type="submit" size="lg" className='h-14 w-40 items-center'>{updating ? <Spinner className='mx-auto'></Spinner> : 'Save Profile'}</Button>
            </form>
        </div>
    );
};

export default ProfileEditPage;