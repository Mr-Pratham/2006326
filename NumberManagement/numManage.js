const urls = [
    "http://20.244.56.144/numbers/primes",
    "http://20.244.56.144/numbers/fibo"
];

let numbers = [];

function getNextUrl() {
    if (urls.length > 0) {
        return urls.shift();
    }
    return null;
}

function processResponse(err, response) {
    if (!err && response && response.code === 200) {
        const jsonData = response.json();
        if (jsonData && jsonData.numbers) {
            numbers.push(...jsonData.numbers);
        }
    }
    makeRequest();
}

function makeRequest() {
    const nextUrl = getNextUrl();
    if (nextUrl) {
        pm.sendRequest({
            url: nextUrl,
            method: 'GET',
            timeout: 500
        }, processResponse);
    } else {
        numbers.sort();
        console.log(JSON.stringify({ numbers: numbers }));
    }
}

makeRequest();