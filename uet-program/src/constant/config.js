
const apiKey = process.env.REACT_APP_BACKEND_API_KEY;

export const baseURL = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_WS_HOST;
    const apiPort = process.env.REACT_APP_BACKEND_WS_PORT;
    console.log(apiUrl)
    console.log(apiPort)
    return `http://${apiUrl}:${apiPort}/myprogram`;
}