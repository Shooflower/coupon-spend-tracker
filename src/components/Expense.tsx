import {useState} from "react"
import trashIcon from "../assets/trash.png"
import pencilIcon from "../assets/pencil.png"

export default function Expense(props: any) {
    const [mouseOver, setMouseOver] = useState(false)
    const {expenseType, store, amount, tax, total, purchaseDate, id, header, totals, handleDelete} = props

    function handleMouseOver() {
        setMouseOver(true)
    }

    function handleMouseLeave() {
        setMouseOver(false)
    }

    function handleEdit() {
        // Show dialog with expense details and submit button to update by ID on backend
    }

    return (
        <div className={`expense ${header ? "expense-header" : ""} ${totals ? "expense-totals" : ""}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseLeave}>
            <p>{expenseType}</p>
            <p>{store}</p>
            <p>{amount}</p>
            <p>{tax}</p>
            <p>{total}</p>
            <p>{purchaseDate}</p>
            {!(header || totals) && mouseOver && <img className="expense--icon" src={pencilIcon} onClick={handleEdit} />}
            {!(header || totals) && mouseOver && <img className="expense--icon" src={trashIcon} onClick={() => handleDelete(id)} />}
        </div>
    )

    // <a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by bqlqn - Flaticon</a>
    //<a href="https://www.flaticon.com/free-icons/pencil" title="pencil icons">Pencil icons created by Icongeek26 - Flaticon</a>
}