type SomeObjectType = {
  [key in string]: any
}

export default (values: SomeObjectType) => {
  const keys: string[] = Object.keys(values);

  if (!keys.length) return true;

  return keys.some((key) => {
    const isValidValue = (typeof values[key] === 'string' && !!values[key].trim().length)
      || typeof values[key] === 'boolean' || (typeof values[key] === 'object' && !!values[key]) || typeof values[key] === 'number'
      || typeof values[key] === 'function';

    return !isValidValue;
  });
}