import React from "react";
import "../styles/index.css";
import { useForm } from "react-hook-form";

export type MessageEditorProps = {
    msgContent: string
    editMsg: (message: string) => void
};

export const MessageEditor = ({ msgContent, editMsg }: MessageEditorProps) => {
    const { register, handleSubmit, setValue } = useForm();
    setValue("message", msgContent);

    return (
        <div className="chat-input">
            <form className="chat-input__form" onSubmit={
                handleSubmit((data) => { editMsg(data.message) })
            }>
                <input type="text" id="message" className="chat-input__text-input" placeholder="Write your message here" {...register("message", { required: true })} />

                <input type="submit" value="Edit message" className="chat-input__send button" />
            </form>
        </div>
    );
};