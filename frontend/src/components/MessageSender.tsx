import React from "react";
import "../styles/index.css";
import { useForm } from "react-hook-form";

export type MessageSenderProps = {
    sendMsg: (message: string) => void
};

export const MessageSender = ({ sendMsg }: MessageSenderProps) => {
    const { register, handleSubmit, reset } = useForm();

    return (
        <div className="chat-input">
            <form className="chat-input__form" onSubmit={
                handleSubmit((data) => { sendMsg(data.message); reset() })
            }>
                <input type="text" id="message" className="chat-input__text-input" placeholder="Write your message here" {...register("message", { required: true })} />

                <input type="submit" value="Send message" className="chat-input__send button" />
            </form>
        </div>
    );
};