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