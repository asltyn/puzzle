const moveTile = (arr, num) => {
  if (num === 0) return arr
  const ind1 = arr.indexOf(0)
  const ind2 = arr.indexOf(num)
  const getX = (i) => i % 4
  const getY = (i) => Math.floor(i / 4)
  if (Math.abs(getX(ind1) - getX(ind2)) + Math.abs(getY(ind1) - getY(ind2)) === 1) {
    ;[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]]
  }
  return arr
}

export default moveTile
