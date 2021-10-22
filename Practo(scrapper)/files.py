import requests
from bs4 import BeautifulSoup as soup
import lxml
import uuid
import json
import pandas as pd
from selenium import webdriver
import os





try:
        # This is the path where all the files are stored.
    folder_path = 'all catagories url'
    # Open one of the files,
    path_list=[]
    medicine_urls=[]
    product_urls=[]
    medicine_categories=[]
    for data_file in sorted(os.listdir(folder_path)):
        path_list.append('all catagories url\\'+data_file)
    # all catagories url\drug-4-aminoquinolines-1-sitemap.xml
    # print(path_list)

    # # Reading the data inside the xml file to a variable under the name  data
    # with open(path_list[0], 'r') as f:
    #     data = f.read() 

    # # Passing the stored data inside the beautifulsoup parser 
    # bs_data = BeautifulSoup(data, 'xml') 

    # # Finding all instances of tag   
    # b_unique = bs_data.find('loc')
    # print(b_unique.get_text()) 
    print(len(path_list))
    for i in range(len(path_list)):
        print(i)
        with open(path_list[i],'r') as f:
            data = f.read()
        bsoj = soup(data, 'xml')
        for url in bsoj.find_all('loc'):
            product_urls.append(url.get_text())
        medicine_categories.append({"id": str(uuid.uuid4()),  'link':url.get_text()})
        
    with open("medcine_urls.json", "w") as file:
        json.dump(medicine_categories, file)




except Exception as e:
    print(e)
