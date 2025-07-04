import pandas as pd
data = "ages.xlsx"
outfile ="ages.csv"
df = pd.read_excel(data)
df.to_csv(outfile, sep=",", index=False)