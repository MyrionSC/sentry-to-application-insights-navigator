#!/usr/bin/env python3

import sys
import json

def pathTypeFilter(x):
    return x['type'] == 'match' and 'notebooks/Shared' in x['data']['path']['text']

inp = sys.stdin.read()
split = inp.split('\n')[:-1] # cut off last
rg_out_list = [json.loads(x) for x in split]
rg_out_matches_list = list(filter(pathTypeFilter, rg_out_list))
result = {}
for match in rg_out_matches_list:
    # print(match)
    pathName = match['data']['path']['text'][37:-3]
    funcName = match['data']['lines']['text'][4:].split('(')[0].strip()
    result[funcName] = pathName
    # print(result)
print(json.dumps(result))

