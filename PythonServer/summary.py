import numpy as np
import pandas as pd


def summay_daily_record(data):
    df = pd.DataFrame(data)

    df2 = df.groupby(["NOTIFY_DATE", "NOTIFY_PNUM"])["NOTIFY_PNUM"].count()

    df_date = df["NOTIFY_DATE"].drop_duplicates().values.tolist()

    pt = pd.pivot_table(df, index="NOTIFY_DATE", columns="NOTIFY_PNUM",
                        values="NOTIFY_STATUS", aggfunc="count", fill_value=0).astype(int)
    print(pt.reset_index().to_json())

    # df3 = pd.DataFrame(index=[df2["NOTIFY_DATE"]], columns=[
    #                    "신고접수", "담당자배정", "신고처리중", "처리완료"])
    # print(df3)
    df_date = df["NOTIFY_DATE"].drop_duplicates()
    df3 = pd.DataFrame(index=[df_date], columns=[
                       "신고접수", "담당자배정", "신고처리중", "처리완료"])
    # print(df3)
    result = df.groupby(["NOTIFY_DATE", "NOTIFY_STATUS"])[
        "NOTIFY_PNUM"].count().to_json(orient="split")
    return pt.reset_index().to_json()
