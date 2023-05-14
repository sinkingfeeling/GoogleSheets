function countTotalRows() {
  var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var totalRows = 0;

  for (var i = 0; i < sheets.length; i++) {
    totalRows += sheets[i].getDataRange().getNumRows();
  }

  return totalRows;
}
