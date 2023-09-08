import json
from os.path import join, dirname

algerian_cities = {}
ROOT_PATH = dirname(dirname(__file__))

# read raw data and clean it
with open(join(ROOT_PATH, "storage/algerian_cities_raw.json"), 'r') as f:
    for i in json.load(f):
        if algerian_cities.get(i['wilaya_code']) is None:
            algerian_cities[i['wilaya_code']] = {
                "wilaya_name_ascii": i['wilaya_name_ascii'],
                "wilaya_name_ar": i['wilaya_name'],
                "cities_ascii": [i['commune_name_ascii']],
                "cities_ar": [i['commune_name']]
            }
        else:
            algerian_cities[i['wilaya_code']]['cities_ascii'].append(i['commune_name_ascii'])
            algerian_cities[i['wilaya_code']]['cities_ar'].append(i['commune_name'])

# write cleaned version
with open(join(ROOT_PATH, "storage/algerian_cities.json"), 'w') as f:
    json.dump(algerian_cities, f, ensure_ascii=False, indent=4)
