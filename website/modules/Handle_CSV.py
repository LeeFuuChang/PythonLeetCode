import pandas as pd
def Read_CSV(Data_File):
    #remove spaces in title
    Data = pd.read_csv(Data_File)
    _titles = Data.head()
    Data.rename(columns={_:_.replace(" ", "") for _ in _titles}, inplace=True, errors="raise")
    Titles = Data.head()

    #remove spaces in data
    for title in Titles:
        for i in range(len(Data[title])):
            Data.at[i, title] = str(Data[title][i]).replace(" ", "")
    return list(Titles), Data

def Write_CSV(Data_File, Titles, Rows):
    lengths = [max([len(Titles[i]), ] + [len(str(value)) for value in Rows[Titles[i]]]) for i in range(len(Titles))]
    titles = []
    for i in range(len(Titles)):
        titles.append(Titles[i].rjust(lengths[i]))
    Data_File.write(", ".join(titles)+"\n")
    for i in range(len(Rows)):
        datas = []
        for idx, value in enumerate(list(Rows.iloc[i])[:len(Titles)]):
            datas.append(str(value).rjust(lengths[idx]))
        Data_File.write(", ".join(datas)+"\n")