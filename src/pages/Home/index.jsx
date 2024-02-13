// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import client from "../../axios-client";
import { Spinner } from "@material-tailwind/react";
import Login from "./login";
import Home from "./home";
import { hist } from "../../axios-client";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../actions/dataActions';

export function Index() {
	const dispatch = useDispatch();
	const { user, loading, error } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(fetchUserData());
	}, [dispatch]);
	console.log(user);

	return (
		//loading screen
		(loading && user == null) ?
			<div class="h-full"><Spinner className='m-auto h-full'></Spinner></div>
			:
			user == null ? (
				<Login></Login>
			) :
				(
					<Home user={user.user}></Home>
				)
	);
}
