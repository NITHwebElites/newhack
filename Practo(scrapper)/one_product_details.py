
import json
import requests
from bs4 import BeautifulSoup as soup
import uuid
import pandas as pd 

from  selenium import webdriver
from selenium.webdriver.common.keys import Keys

chrome_driver_path = "C:\Development\chromedriver.exe"

driver =webdriver.Chrome(executable_path=chrome_driver_path)



#https://www.practo.com/practopedia-sitemap.xml
#https://www.practo.com/diagnostics-sitemap.xml





URL = "https://www.practo.com/health-products/keraboost-tablet-14231/p"

HEADER = {
    'Origin': 'https://www.practo.com',
    'Referer': URL,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.184',
    'Accept-Language':'en-US,en;q=0.9'
}




html = requests.get(url=URL,headers=HEADER)
print(html.status_code)




bsoj = soup(html.content,'lxml')
print(bsoj.find(class_="heading-alpha").get_text()) #heading complete
print(bsoj.find(class_="u-m-r--10 u-text--no-decoration").get_text()) #manufacture complete
try:
    salt =(bsoj.find('a',class_="u-m-r--10 u-text--no-decoration").get_text()) #h complete
    print(salt)
except Exception as e:
    salt="No Information"




driver.get(URL)
try:
    price = driver.find_element_by_xpath('//*[@id="root"]/div[2]/container/div[1]/div/div[2]/div[3]/div[1]/div/span[1]/span[2]')
    price= price.text
except Exception as e:
    price = "Price Currently Unavailable"

try:
    
    size = driver.find_element_by_xpath('//*[@id="root"]/div[2]/container/div[1]/div/div[2]/div[3]/div[3]/span')
    size=size.text
except Exception as e:
    size = "Size Currently Unavailable"

try:
    
    image = driver.find_element_by_class_name("image-carousel--default-image").get_attribute('src')
    image=image
except Exception as e:
    image = "Image Currently Unavailable"


print(price)
print(size)
print(image)
# print(bsoj.find('span',class_="heading-beta-bold text-charcoal-grey").get_text()) #h complete

