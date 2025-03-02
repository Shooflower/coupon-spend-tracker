import {NavLink} from "react-router-dom"

export default function Error() {
    return (
        <div className="error">
            <h1>There was an issue while submitting your request - please try again.</h1>
            <NavLink to=".."><button className="expense--btn">BACK</button></NavLink>
        </div>
    )
}