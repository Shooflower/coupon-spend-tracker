export default function Expense(props: any) {
    const {expenseType, store, amount, tax, total, purchaseDate, header, totals} = props

    return (
        <div className={`expense ${header ? "expense-header" : ""} ${totals ? "expense-totals" : ""}`}>
            <p>{expenseType}</p>
            <p>{store}</p>
            <p>{amount}</p>
            <p>{tax}</p>
            <p>{total}</p>
            <p>{purchaseDate}</p>
        </div>
    )
}