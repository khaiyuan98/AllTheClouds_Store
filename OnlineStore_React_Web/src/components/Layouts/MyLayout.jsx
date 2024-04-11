import styled from "@emotion/styled";
import { MyAppBar } from "./MyAppBar";
import { Outlet } from "react-router-dom";
import { MyFooter } from "./MyFooter";

export const MyLayout = () => {
    const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

    return (
        <div style={{ width: '100%', paddingBottom: '50px' }}>
            <MyAppBar />
            <Offset />
            <div style={{ padding: '10px' }}>
                <Outlet />
            </div>
            <MyFooter />
        </div>
    )
};