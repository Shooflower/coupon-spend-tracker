import { MouseEvent, ChangeEvent, useState } from "react"
import CurrencyInput from "./CurrencyInput"
import { ExpenseEntry, ExpenseResult } from "../types/types"

export default function EditExpense(props:{expense: ExpenseResult | Partial<ExpenseResult>, setEditing:any}) {
    const {expense, setEditing} = props

    const [form, setForm] = useState<ExpenseEntry>({
        expenseType: expense.expenseType,
        store: expense.store,
        amount: typeof expense.amount != 'undefined' ? expense.amount : 0,
        displayAmount: typeof expense.amount != 'undefined' ? `$${(expense.amount).toFixed(2)}` : `$0.00`,
        tax: typeof expense.tax != 'undefined' ? expense.tax : 0,
        displayTax: typeof expense.tax != 'undefined' ? `$${(expense?.tax).toFixed(2)}` : `0`,
        purchaseDate: typeof expense.purchaseDate != 'undefined' ? formatDate(expense.purchaseDate) : formatDate((new Date()).toISOString())
    })

    // Force total to 2 decimal places and then parse as a float to submit as a number
    const total = parseFloat((form.amount + form.tax).toFixed(2))

    function handleSubmitEdit(event:MouseEvent) {
        event.preventDefault()

        
        // const formObj = {
        //     ...form,
        //     total: total
        // }
        // Call API to push record to mongo
        // fetch(`${apiServer}/expenses`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(formObj)
        // })
        // .then(response => {
        //     if(response.status === 200) {
        //         navigate("/submitexpense")
        //     } else {
        //         navigate("/error")
        //     }
        //     return response.json()
        // })
        // .then(data => console.log(data))
        // .catch(error => {
        //     console.error(error)
        //     navigate("/error")
        // })

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
            <div className="expenseform--container">
            <form className="addexpense--form">
                <label className="addexpense--label">
                    <input 
                        type="date"
                        className="addexpense--textbox"
                        name="purchaseDate"
                        value={form.purchaseDate}
                        onChange={handleChange}
                    />
                </label>
                <label className="addexpense--label">
                    <select className="addexpense--dropdown" name="expenseType" value={form.expenseType} onChange={handleChange}>
                        <option value="">-- Expense Type --</option>
                        <option value="Coupon Haul">Coupon Haul</option>
                        <option value="Inserts">Inserts</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                </label>
                <label className="addexpense--label">
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
                <label className="addexpense--label">
                    <CurrencyInput
                        placeholder="Pre-Tax Total"
                        className="addexpense--textbox" 
                        type="text" 
                        name="amount" 
                        value={form.amount}
                        display={form.displayAmount}
                        handleChange={handleChange}
                        setForm={setForm}
                    />
                </label>
                <label className="addexpense--label">
                    <CurrencyInput
                        placeholder="Tax Total" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="tax" 
                        value={form.tax}
                        display={form.displayTax}
                        handleChange={handleChange}
                        setForm={setForm}
                    />
                </label>
                <label className="addexpense--label">
                    <CurrencyInput
                        placeholder="Total" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="total" 
                        value={total}
                        display={`$${total.toFixed(2)}`}
                        setForm={setForm}
                        readOnly={true}
                    />
                </label>
                <div className="expense--btn-container">
                    <button onClick={handleSubmitEdit} className="expense--btn">Update</button>
                    <button onClick={() => setEditing(false)} className="expense--btn">Cancel</button>
                </div>
            </form>
            </div>
        </div>
    )
}