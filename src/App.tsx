import React from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./views/Login.tsx";
import Dashboard from "./views/Dashboard.tsx";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path={"/"}/>
                <Route element={<ProtectedRoute/>}>
                    <Route element={<Dashboard/>} path={"/dashboard"} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
