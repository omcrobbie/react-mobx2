export function httpClient(url: string, method: string, body: any = {}) {
    return fetch(`http://34.216.109.58:8080/v1/${url}`, {
        method,
        body,
        headers: new Headers({
            'api-key': '4275578e2e3e4f179b92773b1717eea8',
            'app-secret': '80ddbdaa90634a75975168cb9b04c6f5',
            'token': '59ae89f11e7e495b8bb8619b80ac2ca2'
            }
        )
    })
    .then(res => {
        return res.json();
    });
}