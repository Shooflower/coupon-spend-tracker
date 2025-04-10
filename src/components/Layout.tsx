import {Outlet} from "react-router-dom"
import Nav from "./Nav.tsx"

export default function Layout() {

    return (
        <div className="layout">
            <h1 className="heading">Coupon Spend Tracker</h1>
            <Nav />
            <Outlet />
        </div>
    )
}