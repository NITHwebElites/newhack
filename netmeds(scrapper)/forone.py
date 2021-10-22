#install these librarires using pip install <lib_name>

import json
import requests
from bs4 import BeautifulSoup
import uuid

# Scrapping medicine details from netmeds.com





def getdetails(s):
    url = "https://www.netmeds.com/prescriptions/" + name
                
    data = requests.get(url)
    if(data.status_code==200):
        return url
    elif(data.status_code==404):
        if(name[len(name)-2:len(name)-1]=="-"):
                v_name= name[:len(name)-2]+name[len(name)-1:]
                url = "https://www.netmeds.com/prescriptions/" + v_name
    return url
    
    





with open("medicines.json", "r") as file:
        data = json.load(file)
        length = len(data)
        print(len(data))
        batches = int(length / 1000)
        medicine_details=[]
        for ii in range(0,1):
            
                state = 0
                Medicines = []
                product_name=[]
                price =[]
                sizeandcompany=[]
                salts=[]
                product_urls = []
                pimage_urls=[]
                size=[]
                company=[]
                pcategory=[]
                
                for medicine in data:
                    
                    try:
                        state += 1
                        print(state)
                        name = medicine["medicine_name"]
                        Medicine = medicine
                        name = name.lower().replace(' ', '-').replace('\'', '-').replace("\\", "-").replace(".", "-")
                        
                            

                        name = name.replace("%", "")
                        first = name.find("(")
                        last = name.find(")")
                        if first != -1:
                            name = name.replace(name[first: last + 1], "")
                        print(name)
                        # product_name.append(name)
                        
                        url = getdetails(name)
                        # product_urls.append(url)
                        data = requests.get(url)
                        print(data.status_code)
                        
                        if data.status_code == 200:
                            product_name.append(name)
                            product_urls.append(url)
                            Data = BeautifulSoup(data.text, "lxml")
                            images = Data.find("figure", {"class": "figure largeimage"})
                            # Taking image urls
                            image_urls = []
                            if images is not None:
                                for image in images:
                                    data = BeautifulSoup(f" <body> f{image} </body>", "lxml")
                                    i = data.find('img', {})
                                    if i is not None:
                                        image_urls.append(i['src'])
                            Medicine["image_urls"] = image_urls
                            # print(image_urls)
                            pimage_urls.append(image_urls)

                            
                            # Finding Out MRP
                            amount = Data.find("span", {"class": "final-price"}).get_text().replace("Best Price*", "").replace("₹","").lstrip()
                            Medicine["MRP"] = amount
                            # print(amount)
                            price.append(amount)

                            # Finding Manufacturer
                            manufacturerData = Data.find("span", {"class": "drug-manu"})
                            manufacturerData = manufacturerData.find("a", {})
                            manufacturer_url = manufacturerData['href']
                            try:
                                manufacturer_name = manufacturerData.get_text()
                            except Exception as e:
                                manufacturer_name = None
                            manufacturer = manufacturer_name
                            Medicine["pcompany"] = manufacturer
                            print(manufacturer)
                            company.append(manufacturer)

                            # Variant
                            try:
                                Variant = Data.find("span", {"class": "drug-varient"}).get_text()
                                Medicine["psize"] = Variant
                            except Exception as e:
                                Variant = None
                                
                            # print(Variant)
                            size.append(Variant)
                            # salt
                            try:
                                Salt = Data.find("div", {"class": "drug-manu"}).get_text().strip()
                                Medicine["psize"] = Salt
                            except Exception as e:
                                Medicine["psize"] = None
                                
                            # print(Salt)
                            salts.append(Salt)


                            category = medicine['category']['category']
                            print(category)
                            pcategory.append(category)
                        # elif(data.statuscode=="404"):
                        #     url = "https://www.netmeds.com/prescriptions/" + vname
                        #     product_urls.append(url)
                        #     data = requests.get(url)
                        #     print(data.status_code)
                        

                            
                            
                          
                            
                    except Exception as e:
                        print(e)
                        pass
                try:
                    
                    print(len(product_name))
                    print(len(price))

                    print(len(company))
                    print(len(pcategory))
                    # print(pcategory)
                    print(len(size))
                    print(len(product_urls))
                    # print(product_urls)
                    print(len(pimage_urls))
                    print(len(product_urls))

                    for i in range(len(product_name)):
                        
                        d1 = {"site name": "netmeds" ,"id": str(uuid.uuid4()),'pname':product_name[i],'psize':size[i],"pcompany":company[i],'mrp':price[i],'salts' :salts[i] ,"image_url":pimage_urls[i],"product_url" : product_urls[i] ,'category': pcategory[i]}
                            # print(d1)
                        medicine_details.append(d1)
                    # json.dump(Medicines, file1)
                except Exception as e:
                    print(e)
                    pass

with open("medicinedetails.json", "w") as file:
        json.dump(medicine_details, file)

