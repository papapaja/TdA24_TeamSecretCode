import React, { Dispatch, SetStateAction } from "react";
import "../styles/index.css";
import { MessageData } from "../models/types";
import { userId } from "../store/user";
import axios from "axios";
import { mutate } from "swr";
import editIcon from "/assets/edit.svg"
import deleteIcon from "/assets/delete.svg"
import { endpoints } from "../store/endpoints";

export type MessageProps = {
    msgData: MessageData,
    channelId: string,
    setEditedMsgId: Dispatch<SetStateAction<string | null>>
};

export const Message = ({ msgData, channelId, setEditedMsgId }: MessageProps) => {
    const { id, createdAt, content, edited, sender } = msgData;

    const deleteMsg = async () => {
        const headers = {
            "X-User": userId,
        }

        await axios.delete(endpoints.messageEndpointParametrized(id), { headers: headers });
        await mutate(endpoints.channelEndpointParametrized(channelId));
    }

    return (
        <div className="chat__message message">
            <div className="message__profile-picture profile-picture">
                <img src={sender.picture} className="profile-picture__image image" alt="Sender's profile picture" />
            </div>

            <div className="message__sent-by">
                <h2 className="message__sender-name heading heading--2">
                    {sender.name}
                </h2>

                <span className="message__sent-at">
                    {new Date(createdAt).toLocaleString()}
                </span>
            </div>

            <div className="message__content">
                {content}
                {" "}
                {edited && <span className="message__edited">(edited)</span>}
            </div>

            {userId === sender.id &&
                <div className="message__controls controls">
                    <button className="controls__control"
                        onClick={() => setEditedMsgId(id)}>
                        <img
                            src={editIcon}
                            className="controls__icon"
                            alt="Edit message"
                        />
                    </button>

                    <button className="controls__control"
                        onClick={() => deleteMsg()}>
                        <img
                            src={deleteIcon}
                            className="controls__icon"
                            alt="Delete message"
                        />
                    </button>
                </div>
            }
        </div>
    );
};