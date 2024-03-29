// @ts-nocheck
import './style.css';
import { Component } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import client from '../../axios-client.js';
import { route } from 'preact-router';
import { NotFound } from '../_404';
import { Spinner } from "@material-tailwind/react";
import { ProfileCard } from './profileCard';
import { Card } from './card';
import { hist } from '../../axios-client.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../actions/dataActions';
const space = ({ number }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.data);

    useEffect(() => {
        dispatch(fetchData(number));
    }, [dispatch, number]);


    const goBack = () => {
        route('/', false);
    }
    const edit = () => {
        route('/edit', false);
    }

    if (loading && !data?.user) return (<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>);

    if (error || !data) {
        return NotFound();
    }
    console.log(data);

    return (
        <div class="flex flex-col items-center sm:w-screen sm:max-w-2xl pt-4">
            <div class="text-gray-600 hover:cursor-pointer pl-2 mb-5 text-lg">
                <span class="underline" onClick={goBack}>‹ lil-Feed</span>
                {data.self &&
                    <span class="underline ml-4" onClick={edit}>edit</span>}
            </div>

            <ProfileCard user={data}></ProfileCard>
            {data && data.user.Posts.toReversed().map(function (item, i) {
                return <Card number={number} post={item}></Card>
            })}
            <div class="h-4"></div>
        </div>
    );
}

export default space;