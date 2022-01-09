const init = Array.from({ length: 16 }, (_, i) => i)

const func = (input = init, res = []) => {
  if (input.length === 0) return res
  const i = Math.floor(Math.random() * input.length)
  return func(
    input.filter((_, j) => j !== i),
    [...res, input[i]]
  )
}

export default func
