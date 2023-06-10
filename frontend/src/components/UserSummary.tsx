import React from "react";
import "../styles/index.css"
import { Link } from "react-router-dom";
import useSWR from "swr";
import fetcher from "../models/fetcher";
import { ProfileData } from "../models/types";
import { endpoints } from "../store/endpoints";

export type UserSummaryProps = {
    userId: string
}

export const UserSummary = ({ userId }: UserSummaryProps) => {
    const { data, error } = useSWR(endpoints.userEndpointParametrized(userId), fetcher);
    if (error) return <div>Error occurred whilst fetching data</div>;
    if (!data) return <div>loading...</div>;

    const { name, picture }: ProfileData = data.data;

    return (
        <Link to="/profile/edit" className="navigation__profile profile link">
            <div className="navigation__profile-picture profile__picture profile-picture">
                <img src={picture} alt="User's profile picture" className="profile-picture__image image" />
            </div>

            <div className="profile__info">
                <div className="profile__name">{name}</div>
                <div className="profile__slug">#666</div>
            </div>
        </Link>
    );
};