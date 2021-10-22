
import json
import requests
from bs4 import BeautifulSoup as soup
import uuid
import pandas as pd 

from  selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options



chrome_driver_path = "C:\Development\chromedriver.exe"

options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=options)



driver =webdriver.Chrome(executable_path="C:\Development\chromedriver.exe")



#https://www.practo.com/practopedia-sitemap.xml
#https://www.practo.com/diagnostics-sitemap.xml





# print(bsoj.find('span',class_="heading-beta-bold text-charcoal-grey").get_text()) #h complete
pname=[]
pcompany=[]
pprice=[]
psalt=[]
psize=[]
pimage=[]
medicine_details = []
with open('Practo Scrapper\medcine_urls.json','r') as file:
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

        
        pname.append((bsoj.find(class_="heading-alpha").get_text())) #heading complete
        try:
            company=(bsoj.find(class_="u-m-r--10 u-text--no-decoration").get_text()) #manufacture complete
            pcompany.append(company)
        except Exception as e:
            pcompany.append("Company Currently Unavailable")

        try:
            salt =(bsoj.find('a',class_="u-m-r--10 u-text--no-decoration").get_text()) #h complete
            psalt.append(salt)
            
        except Exception as e:
            salt="No Information"
            psalt.append(salt)




        driver.get(URL)
        try:
            price = driver.find_element_by_xpath('//*[@id="root"]/div[2]/container/div[1]/div/div[2]/div[3]/div[1]/div/span[1]/span[2]')
            price= float(price.text)
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


        pprice.append(price)
        psize.append(size)
        pimage.append(image)




        
        for i in range(len(pname)):

            d1 = {"site name": "practo" ,"id": str(uuid.uuid4()),'pname':pname[i],'psize':psize[i],'pcompany':pcompany[i],'mrp':pprice[i] ,'salts':psalt[i] ,'image_url':pimage[i],'product_url':URL}
            # print(d1)
            medicine_details.append(d1)
        
with open("medicine.json", "w") as file:
        json.dump(medicine_details, file)

