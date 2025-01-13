import { Head } from "@inertiajs/react";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Dashboard({ children }) {
    const [activeMenu, setActiveMenu] = useState(true);

    const handleIsActive = () => {
        setActiveMenu(!activeMenu);
    };

    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <link
                    rel="shortcut icon"
                    href="./images/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Sidebar active={activeMenu} />
            <Navbar active={activeMenu} isActive={handleIsActive} />
            <div className="max-w-screen-2xl mx-auto p-4 relative z-0">
                {children}
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={10000}
                closeOnClick={true}
            />
        </div>
    );
}
