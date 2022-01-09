const winCheck = (arr) => arr.slice(0, -1).every((x, i) => x === i + 1)

export default winCheck
