
import {NavLink} from "react-router-dom"
export default function Nav() {
    const styles = {
        fontWeight: "bold"
    }

    return (
        <nav className="nav">
            <NavLink to="/"  style={({isActive}) => isActive ? styles : undefined}>Home</NavLink>
            <NavLink to="/addexpense"  style={({isActive}) => isActive ? styles : undefined}>Add Expense</NavLink>
            <NavLink to="/history"  style={({isActive}) => isActive ? styles : undefined}>View Spend History</NavLink>
            <NavLink to="/admin"  style={({isActive}) => isActive ? styles : undefined}>Admin</NavLink>
        </nav>
    )
}