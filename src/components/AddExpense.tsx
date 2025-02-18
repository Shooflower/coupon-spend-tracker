import { MouseEvent, ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import CurrencyInput from "./CurrencyInput"
import { ExpenseEntry } from "../types/types"
import { apiServer } from "../server"

export default function AddExpense() {

    const [form, setForm] = useState<ExpenseEntry>({
        expenseType: "",
        store: "",
        amount: 0,
        displayAmount: "",
        tax: 0,
        displayTax: "",
        purchaseDate: formatDate((new Date()).toISOString())
    })

    const navigate = useNavigate()

    // Force total to 2 decimal places and then parse as a float to submit as a number
    const total = parseFloat((form.amount + form.tax).toFixed(2))
    
    console.log(form)

    function handleSubmit(event:MouseEvent) {
        event.preventDefault()

        
        const formObj = {
            ...form,
            total: total
        }
        // Call API to push record to mongo
        fetch(`${apiServer}/addexpense`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        })
        .then(response => response.json())
        .then(data => console.log(data))

        navigate("/submitexpense")
    }

    // Takes ISO date and makes into yyyy-MM-dd
    function formatDate(isoDateToFormat: string): string {
        const splitVals = isoDateToFormat.split("T")
        return splitVals[0]
    }

    function handleChange(event:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        
        const {name, value} = event.target

        setForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
        
    }

    return (
        <div className="addexpense--container">
            <h1>Add A New Expense</h1>
            <form className="addexpense--form">
                <label className="addexpense--label">Date
                    <input 
                        type="date"
                        className="addexpense--textbox"
                        name="purchaseDate"
                        value={form.purchaseDate}
                        onChange={handleChange}
                    />
                </label>
                <label className="addexpense--label">Expense Type
                    <select className="addexpense--dropdown" name="expenseType" value={form.expenseType} onChange={handleChange}>
                        <option value="">-- Expense Type --</option>
                        <option value="Coupon Haul">Coupon Haul</option>
                        <option value="Inserts">Inserts</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </label>
                <label className="addexpense--label">Store
                    <select className="addexpense--dropdown" name="store" value={form.store} onChange={handleChange}>
                        <option value="">-- Store --</option>
                        <option value="CVS">CVS</option>
                        <option value="Walgreens">Walgreens</option>
                        <option value="Publix">Publix</option>
                        <option value="Walmart">Walmart</option>
                        <option value="Target">Target</option>
                        <option value="Winn-Dixie">Winn-Dixie</option>
                    </select>
                </label>
                <label className="addexpense--label">Pre-Tax Total
                    <CurrencyInput
                        placeholder="$0.00" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="amount" 
                        value={form.amount}
                        display={form.displayAmount}
                        handleChange={handleChange}
                        setForm={setForm}
                    />
                </label>
                <label className="addexpense--label">Tax Total
                    <CurrencyInput
                        placeholder="$0.00" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="tax" 
                        value={form.tax}
                        display={form.displayTax}
                        handleChange={handleChange}
                        setForm={setForm}
                    />
                </label>
                <label className="addexpense--label">Total
                    <CurrencyInput
                        placeholder="$0.00" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="total" 
                        value={total}
                        display={`$${total.toFixed(2)}`}
                        setForm={setForm}
                        readOnly={true}
                    />
                </label>
                <button onClick={handleSubmit} className="expense--btn">Add</button>
            </form>
        </div>
    )
}