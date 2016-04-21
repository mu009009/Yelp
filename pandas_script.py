import pandas as pd
import numpy as np
import datetime

csv_in = pd.read_csv("/Users/Maaria/Desktop/Yelp2/Yelp/Data/yelp-reviews-sel.csv", parse_dates=False)
csv_out = csv_in.loc[:10000, :]
csv_out.to_csv('sample_reviews.csv')
#csv_in["year"] =  csv_in.loc[:, csv_in["date"][:4]]
#csv_in["year"] = pd.DatetimeIndex(csv_in['date']).year
#csv_in_d = csv_in.loc[csv_in["year"] isin ["2010", "2011", "2012", "2013", "2014", "2015"], :]
#print csv_in
