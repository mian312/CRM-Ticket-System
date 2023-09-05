import React, { ReactNode } from "react";
import { Header } from "./Partials/Header";
import { Footer } from "./Partials/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="default-layout app">
            <header className="header sticky-top">
                <Header />
            </header>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                newestOnTop={true}
                closeOnClick
                draggable
                pauseOnHover
                theme="colored"
            />

            <main className="main">{children}</main>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
};