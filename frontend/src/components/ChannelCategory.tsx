import React, { useState } from "react";
import "../styles/index.css"
import { ChannelItem, ChannelItemProps } from "./ChannelItem";

export type ChannelCategoryProps = {
    name: string, 
    channels: ChannelItemProps[],    
}

export const ChannelCategory = ({ channels, name }: ChannelCategoryProps) => {
    const [hidden, setHidden] = useState(false);

    return (
        <div className="navigation__channel-category category">
            <h2 className="category__heading heading heading--2" onClick={() => setHidden(!hidden)}>{name}</h2>
            {!hidden &&
                <ul className="list channels category__items items">
                    {channels.map((channelItem) => <ChannelItem {...channelItem} key={channelItem.id} />)}
                </ul>
            }
        </div>
    );
};