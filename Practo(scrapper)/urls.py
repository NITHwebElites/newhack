
import json
import requests
from bs4 import BeautifulSoup as soup
import uuid
import pandas as pd 


#https://www.practo.com/practopedia-sitemap.xml
#https://www.practo.com/diagnostics-sitemap.xml





URL = "https://www.practo.com/practopedia-sitemap.xml"

HEADER = {
    'Origin': 'https://www.practo.com',
    'Referer': URL,
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 OPR/78.0.4093.184',
    'Accept-Language':'en-US,en;q=0.9'
}




html = requests.get(url=URL,headers=HEADER)
print(html.status_code)




bsoj = soup(html.content,'lxml')

catagories=[]
medicine_categories =[]





try:
    for url in bsoj.find_all('loc'):
        # medicine_catagories.append(sub_cataogory.text.strip())
        
       
        medicine_categories.append({"id": str(uuid.uuid4()),  'link':url.get_text()})
        
    with open("categories.json", "w") as file:
        json.dump(medicine_categories, file)




except Exception as e:
    print(e)
