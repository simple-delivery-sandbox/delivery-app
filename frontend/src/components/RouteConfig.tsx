import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import { UserLayout } from "./UserLayout";
import Register from "../pages/Register";
import RequireAuth from "./RequireAuth";
import Dashboard from "../pages/managements/Dashboard";
import MgmtProductList from "../pages/managements/MgmtProductList";
import MgmtProductDetail from "../pages/managements/MgmtProductDetail";
import { MgmtLayout } from "./MgmtLayout";
import MgmtTxHistorys from "../pages/managements/MgmtTxHistorys";

export const RouterConfig: React.VFC = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* ユーザーレイアウト */}
                    <Route path="/" element={<UserLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />
                        <Route
                            path="/home"
                            element={
                                <RequireAuth requiredRoles={["user"]}>
                                    <Home />
                                </RequireAuth>
                            } />
                    </Route>

                    {/* 管理者レイアウト */}
                    <Route path="/management/*" element={
                        <RequireAuth requiredRoles={["admin", "seller"]}>
                            <MgmtLayout />
                        </RequireAuth>
                    }>
                        {/* 作成は一覧画面でポップアップで行う */}
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<MgmtProductList />} />
                        <Route path="products/:id" element={<MgmtProductDetail />} />
                        <Route path="txs" element={<MgmtTxHistorys />} />
                    </Route>

                    {/* ルートが一致しない場合 */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}