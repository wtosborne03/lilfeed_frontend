// @ts-nocheck
import { route } from "preact-router";
import { Button } from "@material-tailwind/react";
import { FaShareFromSquare } from "react-icons/fa6";
import 'share-api-polyfill';


export const ProfileCard = (props) => {
    const edit = () => {
        route('/edit', false);
    }

    const share = () => {
        const shareData = {
            title: "",
            text: "My lil-Feed!",
            url: 'https://lil-feed.com/' + props.user.user['code'],
        };
        navigator.share(shareData);
    }

    return (
        <div class=" mb-5 w-full text-white flex flex-col items-start text-start ">
            <div class="flex flex-row justify-between w-full">
                <div class="px-1 py-4 w-full">
                    <div class="flex flex-row justify-between w-full">
                        <div class="font-bold text-3xl mb-2">{props.user.user['name']}</div>
                        <div class="flex-grow"></div>

                    </div>
                    <div class="flex flex-row gap-3">
                        <div onClick={share} class="font-bold text-gray-600 hover:cursor-pointer text-lg mb-2">lil-feed.com/{props.user.user['code']}</div>
                    </div>
                    <p class=" text-base">
                        {props.user.user['bio']}
                    </p>
                </div>

            </div>

        </div>
    );
}