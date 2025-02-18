import {useNavigate} from "react-router-dom"

export default function SubmitExpense() {
    const navigate = useNavigate()

    function handleClick() {
        navigate("/addexpense")
    }

    return (
        <div className="submitexpense">
            <h1 className="subsection--heading">Expense successfully submitted</h1>
            <button className="expense--btn" onClick={handleClick} >Add Expense</button>
        </div>
    )
}
