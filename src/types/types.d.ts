export type ExpenseEntry = {
    expenseType?: string,
    store?: string,
    amount: number,
    displayAmount?: string,
    tax: number,
    displayTax?: string,
    purchaseDate: string
}