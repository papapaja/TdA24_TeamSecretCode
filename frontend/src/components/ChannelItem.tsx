import React, { useState } from "react";
import "../styles/index.css"
import hashtag from "/assets/hashtag.svg"
import { Link, useLocation } from "react-router-dom";

export type ChannelItemProps = {
    id: string, 
    name: string,
}

export const ChannelItem = ({ id, name }: ChannelItemProps) => {
    const location = useLocation();

    const [selected, setSelected ] = useState(false);

    if (!selected && location.pathname.split('/')[2] === id) {
        setSelected(true);
    }
    
    if (selected && !(location.pathname.split('/')[2] === id)) {
        setSelected(false);
    }

    return (
        <Link to={"/channel/" + id} onClick={() => {setSelected(true)}}>
            <li className="channel category__item item">
                <img src={hashtag} alt="Server channel icon" className="channel__image image" />
                <div className={`channel__name category__item ${selected ? "category__item--selected" : ""} item__name`}>{name}</div>
            </li>
        </Link>
    );
};