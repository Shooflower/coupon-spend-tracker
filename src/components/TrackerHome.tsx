import {useEffect, useState} from "react"

export default function TrackerHome() {
    // Test
    // const apiServer = "http://localhost:5678"

    // Prod
    const apiServer = "https://coupon-spend-tracker-api.onrender.com"

    const [expenses, setExpenses] = useState([])

    useEffect(() => {
        fetch(`${apiServer}/expense`)
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
                <div className="tracker--totalspend">Subtotal: ${totalAmounts}</div>
                <div className="tracker--totalspend">Tax: ${totalTax}</div>
            </div>
            <div className="tracker--totalspend tracker--final">Total: ${totalsCombined}</div>
        </div>
    )
}