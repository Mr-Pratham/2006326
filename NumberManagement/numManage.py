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
#   const urls = [
#     "http://20.244.56.144/numbers/primes",
#     "http://20.244.56.144/numbers/fibo"
# ];

# const numbers = [];

# urls.forEach(url => {
#     pm.sendRequest({
#         url: url,
#         method: 'GET',
#         timeout: 500
#     }, function (err, response) {
#         if (response && response.code === 200) {
#             const jsonData = response.json();
#             if (jsonData && jsonData.numbers) {
#                 numbers.push(...jsonData.numbers);
#             }
#         }
#     });
# });

# pm.waitForRequests();

# numbers.sort();
# console.log(JSON.stringify({ numbers: numbers }));
