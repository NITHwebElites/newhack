import requests
from bs4 import BeautifulSoup as soup
import lxml
import uuid
import json
import pandas as pd
from selenium import webdriver

chrome_driver_path = "C:\Development\chromedriver.exe"

driver =webdriver.Chrome(executable_path=chrome_driver_path)



medicine_details = []
with open('categories.json','r') as file:
    data = json.load(file)
    # print(data)

    for dicto in data:
      
        
        link = dicto['link']
        print(link)


        
        URL = link

        HEADER = {
            'Origin': 'https://www.practo.com',
            'Referer': URL,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.184',
            'Accept-Language':'en-US,en;q=0.9'
        }
        html = requests.get(url=URL,headers=HEADER)
        print(html.status_code)

        bsoj = soup(html.content,'lxml')
        # print(bsoj)
        driver.get(link)





        
with open("medicine.json", "w") as file:
    json.dump(medicine_details, file)
