import {ChangeEvent} from "react"
import { ExpenseEntry } from "../types/types"

export default function CurrencyInput(props:any) {
    
    const {name, className, placeholder, display, setForm, readOnly} = props

    function handleChange(event: ChangeEvent) {
        const {name, value} = event.target as HTMLInputElement

        // Check if last character input (last key pressed) is a number
        const lastChar = value.charAt(value.length-1)
        
        const isNotANumber = isNaN(parseFloat(lastChar))
        const isTheOnlyDollar = lastChar === '$' && value.length === 1
        const isTheOnlyDecimal = lastChar === '.' && value.split(".").length === 2
        const wouldCauseMoreThanTwoDecimalPlaces = value.split(".").length === 2 && value.split(".")[1].length > 2
        const isNegative = lastChar === '-' && (value.length === 1 || (value.length === 2 && value[0] === '$'))

        // Conditions to accept input
        // Is a positive or negative number
        // Is not a number, but is either the only $ or .
        // Would not cause more than 2 values after the decimal

        const acceptableInput = (!isNotANumber || (isNotANumber && (isTheOnlyDollar || isTheOnlyDecimal || isNegative))) && !wouldCauseMoreThanTwoDecimalPlaces

        // If formatting input to a float results in NaN or undefined, return 0
        const valueToFloat = isNaN(unFormatToCurrency(value)) || typeof value === 'undefined' ? 0 : unFormatToCurrency(value)
        if (acceptableInput) {
            setForm((prevForm: ExpenseEntry) => {
                if (name === "amount"){
                    return {
                        ...prevForm,
                        amount: valueToFloat,
                        displayAmount: formatToCurrency(value)
                    }
                }
                if (name === "tax"){
                    return {
                        ...prevForm,
                        tax: valueToFloat,
                        displayTax: formatToCurrency(value)
                    }
                }
            })
        }
        
    }

    function formatToCurrency(input:string | undefined): string {
        if (typeof input != 'undefined' && input[0] != "$") {
            return `$${input}`
        } else if (typeof input != 'undefined' && input[0] === "$") {
            return input
        }
        else {
            throw new Error("Provided input is undefined")
        }
    }

    function unFormatToCurrency(input:string | undefined): number {
        if (typeof input != 'undefined' && input[0] === "$") {
            return parseFloat(input.substring(1))
        } else if (typeof input != 'undefined' && input[0] != "$") {
          return parseFloat(input)
        } else {
            throw new Error("Provided input is undefined")
        }
    }

    return (
        <input 
            type="text" 
            name={name}
            value={display}
            onChange={handleChange}
            className={className}
            placeholder={placeholder}
            readOnly={readOnly}
        />
    )
}