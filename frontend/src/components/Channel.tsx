import React, { useState } from "react";
import "../styles/index.css";
import { useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../models/fetcher";
import { ChannelData } from "../models/types";
import { userId } from "../store/user";
import axios from "axios";
import { ChannelHeader } from "./ChannelHeader";
import { Message } from "./Message";
import { ChatHeading } from "./ChatHeading";
import { MessageSender } from "./MessageSender";
import { MessageEditor } from "./MessageEditor";
import { endpoints } from "../store/endpoints";


export const Channel = () => {
    const [editedMsgId, setEditedMsgId] = useState<string | null>(null);

    const { mutate } = useSWRConfig();

    const { id } = useParams();
    const { data, error } = useSWR(endpoints.channelEndpointParametrized(id!), fetcher);

    if (error) return <div>Error occurred whilst fetching data</div>;
    if (!data) return <div>loading...</div>;

    const { name, messages }: ChannelData = data.data;

    //////////////////////////

    const sendMsg = async (message: string) => {
        const requestData = ({
            content: message,
            channelId: id
        });
        const headers = {
            "X-User": userId,
        };

        await axios.post(endpoints.messageEndpoint, requestData, { headers: headers });
        await mutate(endpoints.channelEndpointParametrized(id!));
    };

    const editMsg = async (message: string) => {
        setEditedMsgId(null);

        const requestData = ({
            content: message,
        });
        const headers = {
            "X-User": userId,
        };

        await axios.put(endpoints.messageEndpointParametrized(editedMsgId!), requestData, { headers: headers });
        await mutate(endpoints.channelEndpointParametrized(id!));
    };

    const editedMsgContent = () => {
        const message = messages.find(msg => msg.id === editedMsgId);

        if (message === undefined) {
            setEditedMsgId(null);
            return "";
        }

        return message.content;
    };

    //////////////////////////

    return (
        <main className="main-window main-channel">
            <ChannelHeader name={name} />
            <div className="main-channel__chat chat">
                <ChatHeading name={name} />
                {messages.map(message => <Message msgData={message} channelId={id!} setEditedMsgId={setEditedMsgId} key={message.id} />)}
            </div>

            {(editedMsgId === null)
                ? <MessageSender sendMsg={sendMsg} />
                : <MessageEditor msgContent={editedMsgContent()}
                    editMsg={editMsg} />
            }
        </main>
    );
};