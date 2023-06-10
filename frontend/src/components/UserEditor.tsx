import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "../models/fetcher";
import { ProfileData } from "../models/types"
import { userId } from "../store/user"
import { useForm } from "react-hook-form";
import axios from "axios";
import { endpoints } from "../store/endpoints";

export const UserEditor = () => {
    const [editable, setEditable] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const updateProfile = async (username: string, email: string) => {
        const requestData = ({
            id: userId,
            name: username,
            email: email
        });

        await axios.put(endpoints.userEndpoint, requestData);
        await mutate(endpoints.userEndpointParametrized(userId));
    };

    const { data, error } = useSWR(endpoints.userEndpointParametrized(userId), fetcher);
    if (error) return <div>Error occurred whilst fetching data</div>;
    if (!data) return <div>loading...</div>;
    const { name, picture, email }: ProfileData = data.data;

    setValue("username", name);
    setValue("email", email);

    return (
        <div className="profile-editor">
            <div className="profile-editor__banner" />
            <div className="profile-editor__controls">
                <div className="profile-editor__profile profile-info">
                    <div className="profile-editor__profile-picture profile-picture">
                        <img src={picture} alt={`${name}'s profile picture`} className="profile-editor__pfp-image profile-picture__image img" />
                    </div>

                    <div className="profile-info__account-info">
                        <h2 className="profile-info__name heading heading--2">
                            {name}
                        </h2>
                        <span className="profile-info__slug">#666</span>
                    </div>

                    <button className="profile-info__allow-edit button" onClick={() => setEditable(!editable)}>
                        Edit profile
                    </button>
                </div>

                <form className="profile-editor__form" onSubmit={handleSubmit((data) => {
                    updateProfile(data.username, data.email);
                    setEditable(!editable);
                })}>
                    <label className="profile-editor__label label" htmlFor="username-disabled">
                        Username
                    </label>

                    <input
                        type="text"
                        className="profile-editor__input"
                        id={`username${editable ? "" : "-disabled"}`}
                        placeholder={`Current username: ${name}`}
                        disabled={!editable}
                        {...register("username")}
                    />

                    <label className="profile-editor__label label" htmlFor="email-disabled">
                        Email
                    </label>

                    <input
                        type="email"
                        className="profile-editor__input"
                        id={`email${editable ? "" : "-disabled"}`}
                        placeholder={`Current email: ${email}`}
                        disabled={!editable}
                        {...register("email")}
                    />

                    <input
                        type="submit"
                        className={`profile-editor__submit ${editable ? "" : "profile-editor__submit--disabled"} button`}
                        value="Change profile info"
                        disabled={!editable}
                    />
                </form>
            </div>
        </div>
    );
};