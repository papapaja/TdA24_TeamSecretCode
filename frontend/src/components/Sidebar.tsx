import React, { useState } from "react";
import "../styles/index.css"
import { ChannelCategory, ChannelCategoryProps } from "./ChannelCategory";
import { UserSummary } from "./UserSummary";
import useSWR from 'swr';
import fetcher from "../models/fetcher";
import { userId } from "../store/user"
import { endpoints } from "../store/endpoints";

export const Sidebar = () => {
    const { data, error } = useSWR(endpoints.channelEndpoint, fetcher);
    if (error) return <div>Error occurred whilst fetching data</div>;
    if (!data) return <div>loading...</div>;

    const channelCategories: ChannelCategoryProps[] = data.data;

    return (
        <nav className="navigation">

            <div className="navigation__server-header header">
                <h1 className="navigation__server-heading heading heading--1">
                    PB138 - Modern forms of suffering
                </h1>
            </div>

            <div className="navigation__channels-categories categories">
                {channelCategories.map((channelCategory, i) => <ChannelCategory {...channelCategory} key={i} />)}
            </div>

            <UserSummary userId={userId} />
        </nav>
    );
};