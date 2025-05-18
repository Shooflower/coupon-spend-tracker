import {useNavigate} from "react-router-dom"

export default function SubmitEditedExpense() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/history")
    }

    return (
        <div className="submitexpense">
            <h1 className="subsection--heading">Expense updated</h1>
            <button className="expense--btn" onClick={handleClick} >View Expense History</button>
        </div>
    )
}
