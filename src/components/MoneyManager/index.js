import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TransactionItems from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
    balance: 0,
    income: 0,
    expenses: 0,
  }

  onChangeAmount = e => {
    this.setState({amount: e.target.value})
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeType = e => {
    this.setState({type: e.target.value})
  }

  deleteTransaction = id => {
    this.setState(prevState => {
      const filteredList = prevState.transactionList.filter(
        each => each.id !== id,
      )
      const deletedTransaction = prevState.transactionList.find(
        each => each.id === id,
      )

      let updatedBalance = prevState.balance
      let updatedIncome = prevState.income
      let updatedExpenses = prevState.expenses

      if (deletedTransaction.type === 'INCOME') {
        updatedBalance -= deletedTransaction.amount
        updatedIncome -= deletedTransaction.amount
      } else if (deletedTransaction.type === 'EXPENSES') {
        updatedBalance += deletedTransaction.amount
        updatedExpenses -= deletedTransaction.amount
      }

      return {
        transactionList: filteredList,
        balance: updatedBalance,
        income: updatedIncome,
        expenses: updatedExpenses,
      }
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const parsedAmount = parseFloat(amount)

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parsedAmount,
      type,
    }

    this.setState(prevState => {
      const updatedList = [...prevState.transactionList, newTransaction]
      let updatedBalance = prevState.balance
      let updatedIncome = prevState.income
      let updatedExpenses = prevState.expenses

      if (type === 'INCOME') {
        updatedBalance += parsedAmount
        updatedIncome += parsedAmount
      } else if (type === 'EXPENSES') {
        updatedBalance -= parsedAmount
        updatedExpenses += parsedAmount
      }

      return {
        transactionList: updatedList,
        title: '',
        amount: '',
        type: transactionTypeOptions[0].optionId,
        balance: updatedBalance,
        income: updatedIncome,
        expenses: updatedExpenses,
      }
    })
  }

  render() {
    const {
      title,
      amount,
      transactionList,
      type,
      income,
      expenses,
      balance,
    } = this.state

    return (
      <div className="bg-container">
        <div className="container">
          <h1 className="heading">Hi, Richard</h1>
          <p className="text">
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="container2">
          <div className="cont">
            <form onSubmit={this.onAddTransaction}>
              <h1 className="heading2">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                id="title"
                type="text"
                value={title}
                onChange={this.onChangeTitle}
                placeholder="TITLE"
              />
              <br />
              <label htmlFor="amount">AMOUNT</label>
              <br />
              <input
                id="amount"
                type="text"
                value={amount}
                onChange={this.onChangeAmount}
                placeholder="AMOUNT"
                required
              />
              <br />
              <label htmlFor="type">TYPE</label>
              <br />
              <select id="type" value={type} onChange={this.onChangeType}>
                {transactionTypeOptions.map(option => (
                  <option key={option.optionId} value={option.optionId}>
                    {option.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button type="submit" className="addbtn">
                Add
              </button>
            </form>
          </div>
          <div className="history">
            <h1 className="heading3">History</h1>
            <div className="headings">
              <p className="heads">Title</p>
              <p className="heads">Amount</p>
              <p className="heads">Type</p>
            </div>
            <ul>
              {transactionList.map(transaction => (
                <TransactionItems
                  key={transaction.id}
                  details={transaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
