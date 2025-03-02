import {useEffect, useState} from "react"
import Expense from "./Expense"
import {apiServer} from "../server.ts"

export default function History() {

    const [expenseHistory, setExpenseHistory] = useState([])

    useEffect(() => {
        refreshHistory()
    }, [])

    const expenseElements = expenseHistory.map((expense:any) => (
        <Expense
            expenseType={expense.expenseType}
            store={expense.store}
            amount={`$${expense.amount.toFixed(2)}`}
            tax={`$${expense.tax.toFixed(2)}`}
            total={`$${expense.total.toFixed(2)}`}
            purchaseDate={expense.purchaseDate}
            key={expense._id}
            id={expense._id}
            handleDelete={handleDelete}
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

    function refreshHistory() {
        fetch(`${apiServer}/expense`)
        .then(res => res.json())
        .then(data => setExpenseHistory(data.result))
    }

    function handleDelete(id:string) {
        // TODO: Are you sure button
        console.log("Deleting expense...", id)
        fetch(`${apiServer}/expense/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 200){
                refreshHistory()
            }
            return response.json()
        })
        .then(result => console.log(result))
        .catch(error => console.log(error))
    }

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
                    amount={`$${totalAmounts.toFixed(2)}`}
                    tax={`$${totalTax.toFixed(2)}`}
                    total={`$${totalsCombined.toFixed(2)}`}
                    purchaseDate={""}
                />
            </div>
        </div>
    )
}

// TODO: fix any types