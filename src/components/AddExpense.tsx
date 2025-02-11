import { MouseEvent, ChangeEvent, useState } from "react"
import CurrencyInput from "./CurrencyInput"
import { FormAttributes } from "../types/types"
export default function AddExpense() {

    const [form, setForm] = useState<FormAttributes>({
        expenseType: "",
        store: "",
        amount: 0,
        displayAmount: "",
        tax: 0,
        displayTax: ""
    })
    
    console.log(form)

    function handleSubmit(event:MouseEvent) {
        event.preventDefault()
    }

    function handleChange(event:ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) {
        console.log(event.target.name, event.target.value)
        const {name, value} = event.target

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function formatToCurrency(value:number | undefined): string {
        if (typeof value != 'undefined') {
            return `$${value.toFixed(2)}`
        } else {
            throw new Error("Provided input is undefined")
        }
    }

    return (
        <div className="addexpense--container">
            <h1 className="subsection--heading">Add A New Expense</h1>
            <form className="addexpense--form">
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
                        placeholder="0.00" 
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
                        placeholder="0.00" 
                        className="addexpense--textbox" 
                        type="text" 
                        name="tax" 
                        value={form.tax}
                        display={form.displayTax}
                        handleChange={handleChange}
                        setForm={setForm}
                    />
                </label>
                <button onClick={handleSubmit} className="addexpense--btn">Add</button>
            </form>
        </div>
    )
}