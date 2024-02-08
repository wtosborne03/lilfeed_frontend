// @ts-nocheck
import { useMemo, useState, useEffect } from 'preact/hooks';
import { createEditor, Editor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { Button, Spinner } from '@material-tailwind/react';
import { route } from 'preact-router';
import client from '../../axios-client';
import { NotFound } from '../_404';

// Define a serialize function to convert the content state to a string
const serialize = (value) => {
    console.log(value);
    return (
        JSON.stringify(value[0]['children'])
    );
};

// Define a deserialize function to convert a string to the content state
const deserialize = (stringContent) => {
    return stringContent.split('\n').map(line => ({
        children: [{ text: line }],
    }));
};

// Define a toggleMark function to apply and remove marks
const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

// Define a isMarkActive function to check if a mark is active
const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const BlogPostEditor = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(deserialize(''));
    const [user, setUser] = useState(null);
    const [uploading, setUploading] = useState(false);


    useEffect(async () => {
        try {
            var response = await client.get('/user');
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                setLoading(false);
            }
        }
    }, []);


    const renderLeaf = ({ attributes, children, leaf }) => {
        let el = <>{children}</>;

        if (leaf.bold) {
            el = <strong>{el}</strong>;
        }

        if (leaf.italic) {
            el = <em>{el}</em>;
        }

        if (leaf.underline) {
            el = <u>{el}</u>;
        }

        return <span {...attributes}>{el}</span>;
    };

    const cancel = () => {
        route('/');
    }

    const post = async () => {


        setUploading(true);
        const content = serialize(value);
        const startTime = Date.now();
        try {
            const post_res = await client.post('/post', {
                'title': '',
                'content': content
            });
        } catch (error) {
            console.log(error);
        }

        const elapsedTime = Date.now() - startTime;

        if (elapsedTime < 600) {
            await new Promise(resolve => setTimeout(resolve, 600 - elapsedTime));
        }
        setUploading(false);
        //go back to home
        route('/');



    }

    if (loading) return (<Spinner></Spinner>);
    if (user == null) return (<NotFound></NotFound>);
    return (
        <div className="flex h-screen flex-col justify-start mt-10">

            <div class="flex flex-row justify-between items-center mb-20 bg-gray-200 rounded-xl p-2">
                <Button onClick={cancel} size='lg' className='h-12 w-28'>Cancel</Button>
                <span class="text-2xl text-black font-semibold">new post</span>
                <Button onClick={post} size="lg" className='h-12 w-28 items-center p-1 text-center'>{uploading ? <Spinner className='mx-auto'></Spinner> : 'Post 📥'}</Button>
            </div>
            <Slate editor={editor} initialValue={value} onChange={newValue => setValue(newValue)}>
                <div className="p-4">
                    <div className="mb-4">
                        <button
                            className={`mr-2 px-2 ${isMarkActive(editor, 'bold') ? 'bg-gray-400' : ''}`}
                            onMouseDown={event => {
                                event.preventDefault();
                                toggleMark(editor, 'bold');
                            }}
                        ><b>
                                Bold</b>
                        </button>
                        <button
                            className={`mr-2 px-2 ${isMarkActive(editor, 'italic') ? 'bg-gray-400' : ''}`}
                            onMouseDown={event => {
                                event.preventDefault();
                                toggleMark(editor, 'italic');
                            }}
                        ><i>
                                Italic</i>
                        </button>
                        <button
                            className={`px-2 underline ${isMarkActive(editor, 'underline') ? 'bg-gray-200' : ''}`}
                            onMouseDown={event => {
                                event.preventDefault();
                                toggleMark(editor, 'underline');
                            }}
                        >
                            Underline
                        </button>
                    </div>
                    <Editable
                        className="p-4 border border-gray-300 rounded w-96 text-start text-white"
                        placeholder="Enter some text..."
                        renderLeaf={renderLeaf}
                    />
                </div>
            </Slate>
        </div>
    );
};

export default BlogPostEditor;