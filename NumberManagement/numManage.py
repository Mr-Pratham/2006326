import requests
import json
import time

def get_numbers(urls):
  
  numbers = []
  for url in urls:
    response = requests.get(url, timeout=500)
    if response.status_code == 200:
      numbers.extend(json.loads(response.content)["numbers"])
  return numbers

def main():
  
  urls = [
      "http://20.244.56.144/numbers/primes",
      "http://20.244.56.144/numbers/fibo",
  ]
  numbers = get_numbers(urls)
  numbers.sort()
  print(json.dumps({"numbers": numbers}))

if __name__ == "__main__":
  main()


#code for postman 
# const urls = [
#     "http://20.244.56.144/numbers/primes",
#     "http://20.244.56.144/numbers/fibo"
# ];

# let numbers = [];

# function getNextUrl() {
#     if (urls.length > 0) {
#         return urls.shift();
#     }
#     return null;
# }

# function processResponse(err, response) {
#     if (!err && response && response.code === 200) {
#         const jsonData = response.json();
#         if (jsonData && jsonData.numbers) {
#             numbers.push(...jsonData.numbers);
#         }
#     }
#     makeRequest();
# }

# function makeRequest() {
#     const nextUrl = getNextUrl();
#     if (nextUrl) {
#         pm.sendRequest({
#             url: nextUrl,
#             method: 'GET',
#             timeout: 500
#         }, processResponse);
#     } else {
#         numbers.sort();
#         console.log(JSON.stringify({ numbers: numbers }));
#     }
# }

# makeRequest();
