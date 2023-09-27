import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    )
}