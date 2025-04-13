export type ExpenseEntry = {
    expenseType?: string,
    store?: string,
    amount: number,
    displayAmount?: string,
    tax: number,
    displayTax?: string,
    purchaseDate: string,
    id?: string
}

export type ExpenseResult = {
    expenseType?: string,
    store?: string,
    amount: number,
    displayAmount?: string,
    tax: number,
    displayTax?: string,
    purchaseDate: string,
    total: number,
    _id: string
}