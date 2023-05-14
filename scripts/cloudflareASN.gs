// This function attempts to fetch the name of an Autonomous System (AS) from Cloudflare using its ASN (Autonomous System Number).
function fetchAsnName(asn) {
  
  // Your Cloudflare API token should be placed here.
  var apiToken = "API_TOKEN"; // Replace with your Cloudflare API token
  
  // The query is constructed by appending the string "as" to the ASN.
  var query = "as" + asn; // Search query

  // The options for the HTTP request are set up, including the necessary headers for authorization and content type.
  var options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apiToken
    }
  };

  // The UrlFetchApp.fetch() method is used to send an HTTP GET request to Cloudflare's API, with the search query appended to the URL.
  var response = UrlFetchApp.fetch("https://api.cloudflare.com/client/v4/radar/search/global?query=" + query, options);
  
  // The response from the HTTP request is parsed from JSON format into a JavaScript object.
  var jsonData = JSON.parse(response.getContentText());

  // If the 'success' property of the response object is true and the search results array is not empty,
  // the function returns the 'name' property of the first result.
  // If no results are found or if the 'success' property is not true, it returns a message saying that the ASN name was not found.
  if (jsonData.success && jsonData.result.search.length > 0) {
    return jsonData.result.search[0].name;
  } else {
    return "ASN name not found";
  }
}
