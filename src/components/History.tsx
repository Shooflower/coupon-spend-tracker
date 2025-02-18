import {useEffect, useState} from "react"
import Expense from "./Expense"

export default function History() {
    // Test
    // const apiServer = "http://localhost:5678"

    // Prod
    const apiServer = "https://coupon-spend-tracker-api.onrender.com"

    const [expenseHistory, setExpenseHistory] = useState([])

    useEffect(() => {
        fetch(`${apiServer}/expense`)
        .then(res => res.json())
        .then(data => setExpenseHistory(data.result))
    }, [])

    const expenseElements = expenseHistory.map((expense:any) => (
        <Expense
            expenseType={expense.expenseType}
            store={expense.store}
            amount={`$${expense.amount}`}
            tax={`$${expense.tax}`}
            total={`$${expense.total}`}
            purchaseDate={expense.purchaseDate}
            key={expense._id}
        />
    
    ))

    // Get Totals
    let totalAmounts = 0
    let totalTax = 0
    let totalsCombined = 0

    expenseHistory.forEach((exp:any) => {
        totalAmounts+= exp.amount
        totalTax+= exp.tax
        totalsCombined+= exp.total
    })

    return (
        <div className="history">
            <h2 className="subsection--heading">History</h2>
            <div className="expenses-container">
                <Expense
                    header={true}
                    expenseType={"Expense Type"}
                    store={"Store"}
                    amount={"Amount"}
                    tax={"Tax"}
                    total={"Total"}
                    purchaseDate={"Purchase Date"}
                />
                {expenseElements}
                <Expense
                    totals={true}
                    expenseType={"Totals"}
                    store={""}
                    amount={`$${totalAmounts}`}
                    tax={`$${totalTax}`}
                    total={`$${totalsCombined}`}
                    purchaseDate={""}
                />
            </div>
        </div>
    )
}

// TODO: fix any types