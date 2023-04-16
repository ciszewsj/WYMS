export function longToPrice(long) {
    let price = long / 100
    return price.toFixed(2)
}

export function getCurrentPrice(priceList) {
    if (priceList.length > 0) {
        let price = priceList.at(-1)
        return longToPrice(price.value)

    } else {
        return (0.00).toFixed(2)
    }
}
