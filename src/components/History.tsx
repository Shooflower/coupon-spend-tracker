import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import Expense from "./Expense"
import {apiServer} from "../server.ts"
import Filter from "./Filter.tsx"
import { ExpenseResult } from "../types/types"

export default function History() {

    const [searchParams, setSearchParams] = useSearchParams()

    const filter = searchParams.get("store")?.toLowerCase()

    const [expenseHistory, setExpenseHistory] = useState([])

    useEffect(() => {
        refreshHistory()
    }, [])

    const filteredExpenseHistory = filter ? expenseHistory.filter((expense:ExpenseResult) => expense.store?.toLowerCase() === filter) : expenseHistory

    const expenseElements = filteredExpenseHistory.map((expense:ExpenseResult) => (
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

    filteredExpenseHistory.forEach((exp:any) => {
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
    
    function handleFilter(filterType:string, filterValue:string) {
        if(filterValue === null) {
            setSearchParams({})
        } else {
            setSearchParams({[filterType]: filterValue.toLowerCase()})
        }
    }

    return (
        <div className="history">
            <h2 className="subsection--heading">History</h2>
            <Filter handleFilter={handleFilter} />
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