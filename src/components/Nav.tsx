
import {Link} from "react-router-dom"
export default function Nav() {
    return (
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/addexpense">Add Expense</Link>
            <Link to="/history">View Spend History</Link>
            <Link to="/admin">Admin</Link>
        </nav>
    )
}