const booleanConverter = (inProgress: string): boolean => {
  if (inProgress === 'true') return true;
  return false;
};

export default { booleanConverter };
