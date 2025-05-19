import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import Expense from "./Expense"
import {apiServer} from "../server.ts"
import Filter from "./Filter.tsx"
import { ExpenseResult } from "../types/types"
import EditExpense from "./EditExpense.tsx"

export default function History() {

    const [searchParams, setSearchParams] = useSearchParams()

    const filter = searchParams.get("store")?.toLowerCase()

    const [expenseHistory, setExpenseHistory] = useState([])

    const [editing, setEditing] = useState(false)

    const [editedExpense, setEditedExpense] = useState<ExpenseResult | Partial<ExpenseResult>>({})

    useEffect(() => {
        refreshHistory()
    }, [])

    const filterExpenses = () => {
        if (filter?.toLocaleLowerCase() === "miscellaneous") {
            return expenseHistory.filter((expense:ExpenseResult) => expense.expenseType?.toLowerCase() === filter)
        }
        return expenseHistory.filter((expense:ExpenseResult) => expense.store?.toLowerCase() === filter)
    }

    const filteredExpenseHistory = filter ? filterExpenses() : expenseHistory


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
            handleEdit={handleEdit}
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
        fetch(`${apiServer}/expenses`)
        .then(res => res.json())
        .then(data => setExpenseHistory(data.result))
    }

    function handleEdit(id:string) {
        // Retrieve properties from this expense
        const expense = expenseHistory?.find((e:ExpenseResult) => e._id === id)
        
        // Pass on the props of the expense to Edit Expense
        console.log("expense", expense)
        if(expense != null) {
            setEditedExpense(expense)
            setEditing(true)
        } else {
            throw new Error(`Could not find expense with id: ${id}`)
        }
    }

    function handleDelete(id:string) {
        // TODO: Are you sure button
        console.log("Deleting expense...", id)
        fetch(`${apiServer}/expenses/${id}`, {
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
            {editing && <button onClick={() => setEditing(false)} className="history--back">&larr; Back to History</button>}
            <h2 className="subsection--heading">{editing ? "Edit Expense" : "History"}</h2>
            {!editing && <Filter handleFilter={handleFilter} />}
            {!editing && 
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
            }
            {editing && <EditExpense expense={editedExpense} setEditing={setEditing} />}
        </div>
    )
}

// TODO: fix any types