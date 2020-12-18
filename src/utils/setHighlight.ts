const setHighlight = (searchTerm: string, target: string) => {
  let result = '';

  if (target.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== '') {
    const regex = new RegExp(searchTerm, 'gi');
    result = target.replace(regex, `<i>${searchTerm}</i>`);
  } else {
    result = target;
  }

  return result;
};

export default setHighlight;
