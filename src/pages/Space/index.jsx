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

export default class Space extends Component {
    constructor(props) {
        super(props);
    }
    async componentWillMount() {
        this.setState({ loading: true });
        const number = this.props.number;
        try {
            const user_res = await client.get('/user/' + number);

            this.setState({ user_res });
            this.setState({ loading: false });


        } catch (err) {
            if (err.response.status == 404) {
                this.setState({ "not_found": true });
                this.setState({ loading: false });
            }
            console.log(err);
        }
    }
    render(props, state) {
        console.log(state?.user_res?.data.user);
        if (state['loading']) {
            return <Spinner></Spinner>
        }
        if (state['not_found']) {
            return NotFound();
        }
        return (
            <div class="flex flex-col items-center w-full max-w-screen-md h-screen px-10 pt-10">
                <ProfileCard user={state?.user_res?.data}></ProfileCard>
                {state?.user_res?.data.user.Posts.toReversed().map(function (item, i) {
                    return <Card post={item}></Card>
                })}
            </div>
        );
    }
}