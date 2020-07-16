const formatValue = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export default formatValue
