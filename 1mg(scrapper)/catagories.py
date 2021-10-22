
#?scrapinng catagories on the basis of drug-therapeutic-classes

import requests
from bs4 import BeautifulSoup as soup
import lxml
import uuid
import json

URL = "https://www.1mg.com/drugs-therapeutic-classes"

HEADER = {
    'Origin': 'https://www.1mg.com',
    'Referer': URL,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.184',
    'Accept-Language':'en-US,en;q=0.9'
}





html = requests.get(url=URL,headers=HEADER)
print(html.status_code)

bsoj = soup(html.content,'lxml')



catagories=[]
medicine_categories =[]




# for catagory in bsoj.find_all('div',class_="style__category___3TRar"):
#     catagories.append(catagory.text.strip())
try:
    for sub_cataogory in bsoj.find_all('div',class_="style__sub-category___2354n"):
        # medicine_catagories.append(sub_cataogory.text.strip())
        body= f'<body> {str(sub_cataogory)} </body>'
    
        d =soup(body,'lxml')

        medicine_category = d.get_text()
        link= "https://www.1mg.com"+(sub_cataogory.find('a').get('href'))
        print(link)

    
        medicine_categories.append({"id": str(uuid.uuid4()), "category": medicine_category , 'link':link})
        
    with open("categories.json", "w") as file:
        json.dump(medicine_categories, file)




except Exception as e:
    print(e)


    







