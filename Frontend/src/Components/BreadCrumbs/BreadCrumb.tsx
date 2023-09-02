import React, { ReactNode } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
    page: ReactNode;
}

export const BreadCrumb: React.FC<BreadcrumbProps> = ({ page }) => {
    return (
        <Breadcrumb>
            <Breadcrumb.Item ><Link to={'/'}>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item active>{page}</Breadcrumb.Item>
        </Breadcrumb>
    );
};