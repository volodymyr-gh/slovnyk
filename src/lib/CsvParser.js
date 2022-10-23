import Papa from 'papaparse';

export class CsvParser {
  parseFile(file) {
    return new Promise((resolve) => {
      Papa.parse(file, {
        complete: res => resolve(res.data)
      });
    });
  }

  toCsv(data) {
    return Papa.unparse(data);
  }
}
