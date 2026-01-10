import pandas as pd
import csv

# data = "site/testData.xlsx"
# outfile ="site/testData.csv"

data = "marvelDataBase.xlsx"
outfile ="marvelDataBase.csv"

df = pd.read_excel(data)
df.to_csv(outfile, sep=",", index=False, quoting=csv.QUOTE_NONE, escapechar='\\')
