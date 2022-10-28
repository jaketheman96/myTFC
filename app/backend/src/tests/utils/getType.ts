function getType(value: Array<object>): string | null {
  if (value === null || value === undefined) return null
  
  const type = typeof(value)
  
  if (type == 'object') {
     if (value instanceof Array) return 'array'
  }

  return type
}

export default { getType };

// function got here: https://stackoverflow.com/questions/27535241/how-to-write-a-test-that-checks-for-multiple-types-in-chai