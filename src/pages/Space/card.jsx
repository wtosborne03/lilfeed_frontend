import { route } from "preact-router";
import { useMemo } from "preact/hooks";
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import moment from "moment";

export const Card = (props) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    console.log(props);

    const Deserialize = (serializedContent) => {
        return JSON.parse(serializedContent);
    };

    const value = Deserialize(props.post.content);


    return (
        <div class="bg-gray-200 rounded-2xl mb-5 w-96 text-black ">
            <div class="px-6 py-4">

                <div class="font-bold text-gray-700 text-md mb-2">{moment(props.post.createdAt).format('MMMM Do, YYYY, h:mm a')}</div>
                <p class="text-black text-base">
                    <Slate editor={editor} initialValue={value}>
                        <Editable readOnly />
                    </Slate>
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">

            </div>
        </div>
    );
}