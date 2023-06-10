import React from "react";
import hashtag from "/assets/hashtag.svg"
import "../styles/index.css"

export type ChannelHeaderProps = {
    name: string
}

export function ChannelHeader({ name }: ChannelHeaderProps) {
    return (
        <div className="main-channel__header header">
            <img src={hashtag} alt="Server channel icon" className="main-channel__logo" />
            <h1 className="main-channel__heading heading heading--1">{name}</h1>
        </div>
    );
};