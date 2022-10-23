export const pipe = (...fns) => initialArg =>
  fns.reduce((acc, fn) => fn(acc), initialArg);

export const createCsvDownloadLink = (csv) => {
  const link = document.createElement('a');

  const href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv);
  link.setAttribute('href', href);

  const timestamp = new Date().toISOString().replace(/\W/g, '_');
  const filename = `words_backup_${timestamp}.csv`;
  link.setAttribute('download', filename);

  link.style.display = 'none';

  return link;
};
