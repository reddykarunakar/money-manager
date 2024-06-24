// Write your code here
import './index.css'

const TransactionItems = props => {
  const {details, deleteTransaction} = props
  const {title, amount, type, id} = details

  const OnClickDelete = () => {
    deleteTransaction(id)
  }
  return (
    <li className="Transactionlist">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button
        type="button"
        onClick={OnClickDelete}
        className="button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItems
