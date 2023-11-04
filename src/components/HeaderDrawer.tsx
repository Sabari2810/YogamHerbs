import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
// import { UserCircleIcon, XIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { selectDrawerState, setIsDrawerOpen } from "@/redux/features/drawerSlice";
import { useAppDispatch } from "@/redux/hooks";
// import { selectDrawerState, setIsDrawerOpen } from "../slices/DrawerSlice";

const HeaderDrawer = () => {
    const isOpen = useSelector(selectDrawerState);
    const dispatch = useAppDispatch();
    // const { data: session } = useSession();

    const anchor = "left";
    return (
        <div>
            <React.Fragment key={anchor}>
                <Drawer
                    className="relative"
                    anchor={anchor}
                    sx={{
                        width: 300,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 300,
                            boxSizing: "border-box",
                        },
                    }}
                    open={isOpen}
                    onClose={() => {
                        dispatch(setIsDrawerOpen(false));
                    }}
                >
                    <div className="h-full relative">
                        <div className="pl-10 sticky flex items-center justify-between pr-2 top-0 z-50 bg-amazon_blue-light">
                            <p
                                // onClick={() => {
                                //     if (!session) {
                                //         signIn();
                                //     }
                                //     return;
                                // }}
                                className="cursor-pointer overflow-ellipsis truncate flex items-center justify-start font-bold text-xl text-white py-3"
                            >
                                <span className="mr-2">
                                    <AiOutlineUser className="h-8" />
                                </span>
                                Hello,
                                <span className="w-32 truncate">
                                    {/* {session ? session.user.name : "Sign In"} */}
                                </span>
                            </p>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </div >
    );
};

export default HeaderDrawer;