import Navbar from "@/Pages/Components/Navbar";
import Sidebar from "@/Pages/Components/Sidebar";
import { Head } from "@inertiajs/react";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function AuthenticatedLayout({ children }) {
    const [activeMenu, setActiveMenu] = useState(false);
    const domain = window.location.origin;

    const handleShow = () => {
        setActiveMenu(!activeMenu);
    };
    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <link
                    rel="shortcut icon"
                    href={`${domain}/images/favicon.ico`}
                    type="image/x-icon"
                />
            </Head>
            <Sidebar isActive={activeMenu} setIsActive={handleShow} />
            <Navbar onShow={handleShow} />
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
