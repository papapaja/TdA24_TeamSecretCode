import React from "react";
import { UserSidebar } from "./UserSidebar";
import { UserEditor } from "./UserEditor";

export const User = () => {
    return (
        <>
            <UserSidebar />
            <main className="main-window main-settings">
                <h1 className="main-settings__heading heading heading--1">My account</h1>
                <div className="main-settings__content">
                    <UserEditor />
                </div>
            </main>
        </>
    );
};