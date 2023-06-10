import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { User } from "./User";
import { Channel } from "./Channel";
import { Sidebar } from "./Sidebar";
import "../styles/index.css"

export const App = () => {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Sidebar />} />
                <Route path="/channel/:id" element={<><Sidebar /><Channel /></>} />
                <Route path="/profile/edit" element={<User />} />
            </Routes>
        </div>
    );
}

export default App;