const formatValue = (
  value: number,
  type: 'income' | 'outcome' = 'income'
): string => {
  const formattedValue = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

  return type === 'income' ? formattedValue : `- ${formattedValue}`
}

export default formatValue
