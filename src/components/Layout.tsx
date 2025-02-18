import {Outlet} from "react-router-dom"
import Nav from "./Nav.tsx"

export default function Layout() {

    return (
        <>
            <h1 className="heading">Coupon Spend Tracker</h1>
            <Nav />
            <Outlet />
        </>
    )
}