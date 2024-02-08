// @ts-nocheck
import { useEffect, useState } from "preact/hooks";
import client from "../../axios-client";
import { Spinner } from "@material-tailwind/react";
import Login from "./login";
import Home from "./home";

export function Index() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		try {
			var response = await client.get('/user');
			setUser(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			if (error.response.status == 401) {
				setLoading(false);
			}
		}
	}, []);

	return (
		//loading screen

		loading ? (
			<Spinner ></Spinner >
		)
			:
			user == null ? (
				<Login></Login>
			) :
				(
					<Home user={user}></Home>
				)

	);
}
