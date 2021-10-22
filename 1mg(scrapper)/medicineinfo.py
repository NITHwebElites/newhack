import requests
from bs4 import BeautifulSoup as soup
import lxml
import uuid
import json
import pandas as pd



medicine_details = []
with open('categories.json','r') as file:
    data = json.load(file)
    # print(data)

    for dicto in data:
      
        category = dicto["category"]
        link = dicto['link']
        print(link)


        
        URL = link

        HEADER = {
            'Origin': 'https://www.1mg.com',
            'Referer': URL,
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.184',
            'Accept-Language':'en-US,en;q=0.9'
        }
        html = requests.get(url=URL,headers=HEADER)
        print(html.status_code)

        bsoj = soup(html.content,'lxml')


        product_name=[]
        price =[]
        sizeandcompany=[]
        salts=[]
        product_urls = []
        image_urls=[]
        size=[]
        company=[]
        for name in bsoj.find_all('div',class_='style__font-bold___1k9Dl style__font-14px___YZZrf style__flex-row___2AKyf style__space-between___2mbvn style__padding-bottom-5px___2NrDR'):
            name=name.text.split('₹')
            product_name.append(name[0][:len(name[0])-3])
            price.append(float(name[1]))

        # print(price)
        # print(product_name)

        for name in bsoj.find_all('div',class_="style__flex-column___1zNVy style__font-12px___2ru_e"):
        
            for each in name.find_all('div',class_="style__padding-bottom-5px___2NrDR"):
                sizeandcompany.append(each.get_text())
            
        for i in range(len(sizeandcompany)):
            if(i==0):
                size.append(sizeandcompany[i])
            elif (i%2==0):
                size.append(sizeandcompany[i])
            else:
                company.append(sizeandcompany[i])



        for salt_name in bsoj.find_all('div',class_="style__font-12px___2ru_e style__product-content___5PFBW style__display-inline-block___2y7gd"):
            salts.append(salt_name.text)
       
        for product_url in bsoj.find_all('a',class_="button-text style__flex-row___2AKyf style__flex-1___A_qoj style__product-name___HASYw"):
            link= "https://www.1mg.com"+(product_url.get('href'))
            product_urls.append(link)


        for image_url in bsoj.find_all(class_="style__card-image___1oz_4"):
            image_urls.append(image_url.img['src'])
                



        for i in range(1):
            
            d1 = {"site name": "1mg" ,"id": str(uuid.uuid4()),'pname':product_name[i],'psize':size[i],"pcompany":company[i],'mrp':price[i],'salts' :salts[i] ,"image_url":image_urls[i],"product_url" : product_urls[i] ,'category': category}
            # print(d1)
            medicine_details.append(d1)

      


        
with open("medicine.json", "w") as file:
    json.dump(medicine_details, file)
