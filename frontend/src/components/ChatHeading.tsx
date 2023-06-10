import React from "react";
import "../styles/index.css"
import hashtag from "/assets/hashtag.svg"

export type ChatHeadingProps = {
    name: string
}

export const ChatHeading = ({ name }: ChatHeadingProps) => {
    return (
        <div className="chat__start chat-start">
            <h2 className="chat-start__heading heading heading--2">
                This is the start of the
                <img src={hashtag} className="chat-start__icon image" alt="Server channel icon" />
                {name} channel baby!
            </h2>
        </div>
    );
};