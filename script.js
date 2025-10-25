function doPost(e) {
  try {
    // Get email and password from form parameters
    const email = e.parameter.email;
    const password = e.parameter.password;

    // Open your Google Sheet (replace with your Sheet ID)
    const sheetId = 'YOUR_SHEET_ID';  // e.g., '1ABC123XYZ...'
    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Users');

    // Get all data (skip header row)
    const values = sheet.getDataRange().getValues();

    // Check for matching email and password
    let isValid = false;
    for (let i = 1; i < values.length; i++) {  // Start from row 1
      if (values[i][0] === email && values[i][1] === password) {
        isValid = true;
        break;
      }
    }

    // Return JSON response
    const response = isValid ? { status: 'success' } : { status: 'error' };
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Handle errors
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}