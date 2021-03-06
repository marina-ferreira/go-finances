import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import api from 'services/api'
import formatValue from 'utils/formatValue'
import formatDate from 'utils/formatDate'

import Header from 'components/Header'
import Loader from 'components/Loader'

import income from 'assets/income.svg'
import outcome from 'assets/outcome.svg'
import total from 'assets/total.svg'
import { Container, CardContainer, Card, TableContainer } from './styles'

interface Transaction {
  id: string
  title: string
  value: number
  formattedValue: string
  formattedDate: string
  type: 'income' | 'outcome'
  category: { title: string }
  created_at: Date
}

interface Balance {
  income: number
  outcome: number
  total: number
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({} as Balance)

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get('/transactions')

      setBalance(response.data.balance)
      setTransactions(response.data.transactions)
    }

    loadTransactions()
  }, [])

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Income</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {balance.income ? formatValue(balance.income) : <Loader />}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Outcome</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {balance.outcome ? formatValue(balance.outcome) : <Loader />}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {balance.total ? (
                formatValue(balance.total)
              ) : (
                <Loader color="#fafafa" />
              )}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          {transactions.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(
                  ({ id, title, type, value, category, created_at }) => (
                    <tr key={id}>
                      <td className="title">{title}</td>
                      <td className={type}>
                        {type === 'outcome' ? '- ' : ''}
                        {formatValue(value)}
                      </td>
                      <td>{category.title}</td>
                      <td>{formatDate(created_at)}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <TableLoader color="#5636d3">
              <Loader color="#5636d3" />
            </TableLoader>
          )}
        </TableContainer>
      </Container>
    </>
  )
}

export default Dashboard

const TableLoader = styled.div`
  top: 70%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`
