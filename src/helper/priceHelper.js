export const parsePrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'EUR'
  })
}