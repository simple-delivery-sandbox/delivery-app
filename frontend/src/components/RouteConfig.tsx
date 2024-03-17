import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import { Layout } from "./Layout";
import Register from "../pages/Register";
import RequireAuth from "./RequireAuth";
import Dashboard from "../pages/Dashboard";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Navigate replace to="/home" />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route
                            path="/home"
                            element={
                                <RequireAuth requiredRoles={["user"]}>
                                    <Home />
                                </RequireAuth>
                            }></Route>
                        <Route 
                            path="/dashboard"
                            element={
                                <RequireAuth requiredRoles={["admin", "seller"]}>
                                    <Dashboard />
                                </RequireAuth>
                            }></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}