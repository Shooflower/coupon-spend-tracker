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
        purchaseDate: formatDate((new Date()).toLocaleDateString())
    })

    const navigate = useNavigate()

    // Force total to 2 decimal places and then parse as a float to submit as a number
    const total = parseFloat((form.amount + form.tax).toFixed(2))

    function handleSubmit(event:MouseEvent) {
        event.preventDefault()

        
        const formObj = {
            ...form,
            total: total
        }
        // Call API to push record to mongo
        fetch(`${apiServer}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObj)
        })
        .then(response => {
            if(response.status === 200) {
                navigate("/submitexpense")
            } else {
                navigate("/error")
            }
            return response.json()
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error(error)
            navigate("/error")
        })

    }

    // Takes ISO date and makes into yyyy-MM-dd
    function formatDate(date: string): string {
        const splitVals = date.split("/")

        // Added pad start to the month so that single digit months would conform to date yyyy-MM-dd
        return `${splitVals[2]}-${splitVals[0].padStart(2, "0")}-${splitVals[1]}`
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
            <h2 className="subsection--heading">Add A New Expense</h2>
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
                            <option value="Dollar Tree">Dollar Tree</option>
                            <option value="Publix">Publix</option>
                            <option value="Target">Target</option>
                            <option value="The Fresh Market">The Fresh Market</option>
                            <option value="Walgreens">Walgreens</option>
                            <option value="Walmart">Walmart</option>
                            <option value="Whole Foods">Whole Foods</option>
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
                    <button onClick={handleSubmit} className="expense--btn">Add</button>
                </form>
            </div>
        </div>
    )
}