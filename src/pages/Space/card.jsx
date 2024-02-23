
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css'
import { route } from "preact-router";
export const Card = (props) => {

    const gotop = () => { route(`/${props.number}/${props.post.slug}`) }
    return (

        <div class="bg-gray-200 rounded-2xl mb-5 w-full text-black" onClick={gotop}>

            <div class="px-6 py-4">

                <div class="text-start text-lg font-semibold">{props.post.title}</div>
                <div class="max-h-32 overflow-hidden masked-overflow">
                    <ReactQuill
                        value={props.post.content}
                        readOnly={true}
                        theme={"bubble"}
                    />
                </div>
                <div class=" text-gray-700 text-start text-sm mt-4 ">{moment(props.post.createdAt).format('MMMM Do, YYYY, h:mm a')}</div>

            </div>

        </div>
    );
}