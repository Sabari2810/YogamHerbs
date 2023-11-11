import { selectDrawerState, setIsDrawerOpen } from "@/redux/features/drawerSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { IMenuItem } from "./Header";

interface IProps {
    menuItems: IMenuItem[]
}

const HeaderDrawer: React.FC<IProps> = ({ menuItems }) => {
    const isOpen = useSelector(selectDrawerState);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const anchor = "left";

    const navigate = (route: string) => {
        dispatch(setIsDrawerOpen(false));
        router.push(`/${route}`)
    }

    return (
        <React.Fragment key={anchor}>
            <Drawer
                className="relative md:scale-0"
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
                <div className="h-full relative py-10">
                    <div className="flex flex-col items-start">
                        {menuItems.map((menuItem) => (
                            <div key={menuItem.title} className="flex px-3 space-x-2 first:border-t-[1.8px] border-b-[1.8px]  py-3 items-center w-full">
                                <menuItem.icon />
                                <Link className="w-full font-semibold" onClick={() => {
                                    dispatch(setIsDrawerOpen(false));
                                }} scroll={true} href={menuItem.path} key={menuItem.title}>{menuItem.title}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export default HeaderDrawer;