
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import { route } from "preact-router";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
export const Card = (props) => {

    const gotop = () => { route(`/${props.number}/${props.post.slug}`) }
    return (

        <div class="border-l-4 border-white mb-8 bg-white transition-all  cursor-pointer duration-100 hover:bg-opacity-5 bg-opacity-0 w-full text-white" onClick={gotop}>

            <div class="px-4 py-2 pointer-events-none">
                <span class="flex flex-row items-center justify-between">
                    <div class="text-start text-lg font-semibold">{props.post.title}</div>
                    <div class=" text-gray-700 text-start text-sm ">{moment(props.post.createdAt).format('MMMM Do, YYYY, h:mm a')}</div>
                </span>
                <span class="flex flex-row items-center justify-between">

                    <div class="max-h-32 overflow-hidden masked-overflow">
                        <ReactQuill
                            value={props.post.content}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </div>
                </span>

            </div>


        </div >
    );
}