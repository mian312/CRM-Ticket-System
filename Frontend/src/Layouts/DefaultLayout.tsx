import React, { ReactNode } from "react";
import { Header } from "./Partials/Header";
import { Footer } from "./Partials/Footer";

interface DefaultLayoutProps {
    children: ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div className="default-layout app">
            <header className="header sticky-top">
                <Header />
            </header>

            <main className="main">{children}</main>

            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
};