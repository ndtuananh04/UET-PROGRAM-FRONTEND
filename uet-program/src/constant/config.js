
const apiKey = process.env.REACT_APP_BACKEND_API_KEY;

export const baseURL = () => {
    const apiUrl = "backend.stunet.site";
    const apiPort = "80";
    // console.log(apiUrl)
    // console.log(apiPort)
    // const apiUrl = "localhost";
    // const apiPort = "8080";
    return `http://${apiUrl}:${apiPort}/api/v1`;
}