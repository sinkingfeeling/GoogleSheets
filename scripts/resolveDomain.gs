// This function attempts to resolve the IP address of a given domain using Cloudflare's DNS over HTTP service.
function resolveIP(domain) {
  
  // If no domain is provided to the function, it returns a message asking for a domain.
  if (!domain) {
    return 'Please provide a domain';
  }
  
  // The try-catch block handles potential errors that may occur when making the HTTP request.
  try {
    
    // The UrlFetchApp.fetch() method is used to send an HTTP request to Cloudflare's DNS over HTTP service.
    // The URL includes query parameters specifying the domain name and record type (A record, which corresponds to an IPv4 address).
    // The 'accept' header is set to 'application/dns-json' to specify the desired response format.
    var response = UrlFetchApp.fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      'headers': {
        'accept': 'application/dns-json'
      }
    });

    // The response from the HTTP request is parsed from JSON format into a JavaScript object.
    var result = JSON.parse(response.getContentText());
    
    // If the result contains an 'Answer' property (the DNS records in the response), and there's at least one record,
    // the function returns the 'data' property of the first record, which should be the IP address.
    // If no records are found, it returns a message saying that no IP address was found.
    if (result && result.Answer && result.Answer.length > 0) {
      return result.Answer[0].data;
    } else {
      return 'No IP address found';
    }
    
  // If an error occurs during the HTTP request, the catch block is executed, and the function returns a message indicating an error.
  } catch (error) {
    return 'Error fetching IP address';
  }
}
