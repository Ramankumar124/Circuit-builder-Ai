 // Function to decode a Base64 URL-encoded string
 const base64UrlToBase64 = (base64Url: string) => {
    return base64Url.replace(/-/g, "+").replace(/_/g, "/");
  };

export  const decodeJWT = (token: string) => {
    const base64Url = token.split(".")[1]; // The payload is in the second part of the JWT
    const base64 = base64UrlToBase64(base64Url);
    const decoded = JSON.parse(window.atob(base64));
    return decoded;
  };