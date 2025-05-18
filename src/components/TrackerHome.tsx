import {useEffect, useState} from "react"
import { apiServer } from "../server"

export default function TrackerHome() {

    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetch(`${apiServer}/expenses`)
        .then(res => res.json())
        .then(data => setExpenses(data.result))
    }, [])

    // Get Totals
    let totalAmounts = 0
    let totalTax = 0
    let totalsCombined = 0

    expenses.forEach((exp:any) => {
        totalAmounts+= exp.amount
        totalTax+= exp.tax
        totalsCombined+= exp.total
    })

    return (
        <div className="home">
            <h2 className="subsection--heading">Total Spend</h2>
            <div className="home--spendamounts">
                <div className="tracker--totalspend">Subtotal: ${totalAmounts.toFixed(2)}</div>
                <div className="tracker--totalspend">Tax: ${totalTax.toFixed(2)}</div>
            </div>
            <div className="tracker--totalspend tracker--final">Total: ${totalsCombined.toFixed(2)}</div>
        </div>
    )
}