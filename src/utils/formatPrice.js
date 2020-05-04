export const formatPrice = priceWithDecimals => {
  const res = priceWithDecimals / 100

  return res.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  })
}
