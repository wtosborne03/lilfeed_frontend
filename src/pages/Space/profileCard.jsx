import { route } from "preact-router";


export const ProfileCard = (props) => {
    const edit = () => {
        route('/edit');
    }

    return (
        <div class="bg-gray-200 rounded-2xl mb-5 w-96 text-black ">
            <div class="px-6 py-4">
                <div class="flex flex-row justify-between">
                    <div class="w-10"></div>
                    <div class="font-bold text-3xl mb-2">{props.user.user['name']}</div>
                    <button onClick={edit} class="w-10 text-2xl">{props.user.self ? '✏️' : ''}</button>
                </div>
                <div class="font-bold text-gray-700 text-md mb-2">{props.user.user['number']}</div>
                <p class="text-black text-base">
                    {props.user.user['bio']}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">

            </div>
        </div>
    );
}