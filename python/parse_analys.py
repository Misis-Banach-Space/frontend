import requests
from bs4 import BeautifulSoup
import re
import ast

LINK = 'https://med-elearn.ru/'
DOMAIN_NAME = re.findall(r'([\w.-]+\.[\w.-]+)', LINK)[0]


def get_soup(DOMAIN_NAME):
    URL = f'https://be1.ru/stat/{DOMAIN_NAME}'
    req = requests.get(URL)
    soup = BeautifulSoup(req.text, "html.parser")
    return soup

def get_soupBase(LINK):
    req = requests.get(LINK)
    soup = BeautifulSoup(req.text, "html.parser")
    return soup

def get_yandex_requests_data(soup):
    data_table = []
    table = soup.find('table', attrs={'class':'table main'})
    table_body = table.find('tbody')

    rows = table_body.find_all('tr')
    for row in rows:
        cols = row.find_all('td')
        cols = [ele.text.strip() for ele in cols]
        data_table.append([ele for ele in cols if ele]) # Get rid of empty values

    for i in range(len(data_table)):
        data_1 = [data_table[i][1], LINK + data_table[i][3], data_table[i][4]]
        data_table[i] = data_1
    return data_table

def clear_str(my_str):
    return my_str.replace('\n', '').replace('\t', '').replace('\r', '')

def get_stats(soup):
    matches = re.findall(r'google\.visualization\.arrayToDataTable\((.*?)\)', clear_str(str(soup)))
    dict_list = []
    for i, match in enumerate(matches):
        if match != 'data':
            try:
                match = match.replace("//", "")
                match = re.sub(r'/\*.*?\*/', '', match)
                list_data = ast.literal_eval(match)
                dict_data = {item[0]: item[1:] for item in list_data}
                dict_list.append(dict_data)
            except:
                domain_names = re.findall(r'"([\w.-]+\.[\w.-]+)"', match)
    return dict_list, domain_names


def main():
    soupBase = get_soupBase(LINK)
    title = soupBase.title.string if soupBase.title else None

    # Получение description
    description_tag = soupBase.find('meta', attrs={'name': 'description'})
    description = description_tag['content'] if description_tag else None

    print(f"Title: {title}")
    print(f"Description: {description}")

    tags = ['div', 'p', 'span']
    result = ""
    for tag in tags:
        elements = soupBase.find_all(tag)
        for element in elements:
            if len(element.text) > 300:
                result += element.text + " "
                result = re.sub(r'\s+', ' ', result)
        if len(result) > 1000:
            break
    result = result[:500]
    result = re.sub(r'[^\w\s.,;:!?-]', '', result)
    print(result)

    # soup = get_soup(DOMAIN_NAME)
    # data_table = get_yandex_requests_data(soup)
    # dict_list, domain_names = get_stats(soup)

    # data = {
    #     'title': soup.find(id="set_title").text,
    #     'description': soup.find(id="set_description").text,
    #     'vozrast': soup.find(id="set_vozrast").text,
    #     'page_size': soup.find(id="set_page_size").text,
    #     'page_load_time': soup.find(id="set_page_load_time").text,
    #     'ip': soup.find(id="set_site_ip").text,
    #     'yandex_iks': soup.find(id="set_iks").text.replace('\n', ''),
    #     'competitiors': domain_names,
    #     'yandex_request': data_table,
    # }

    # for el in dict_list:
    #     if 'Year' in el:
    #             if el['Year'][0] == 'Количество запросов':
    #                 el['Title'] = el.pop('Year')
    #                 data['requests'] = el
    #             elif el['Year'][0] == 'Количество заходов':
    #                 el['Title'] = el.pop('Year')
    #                 data['visits_by_month'] = el
    #     elif 'Country' in el:
    #         el['Title'] = el.pop('Country')
    #         data['visits_by_country'] = el

    # with open('data.txt', 'w') as f:
    #     for key, value in data.items():
    #         f.write(f'{key}: {value}\n')

if __name__ == "__main__":
    main()