# Word Counter

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app=FastAPI()

origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Text(BaseModel):
    text:str

@app.post("/result",status_code=status.HTTP_200_OK)
async def result(user:Text):
    word_list = user.text.strip().split()
    maxlen = 0
    longestWord=""
    length=0
    word_mode={}
    unique=set()

    for i in word_list:
        length+=len(i)
        word_mode[i] = word_mode.get(i,0)+1
        if i not in unique:
            unique.add(i)
        if len(i)>maxlen:
            maxlen=len(i)
            longestWord=i
    if len(set(word_mode.values())) == 1:
        frequent=max(word_mode,key=word_mode.get)
        occuring = word_mode[frequent]
        frequent = "All words occur the same number of times"
    else:
        frequent=max(word_mode,key=word_mode.get)
        occuring = word_mode[frequent]
    return {"words":len(word_list),"chars":length,"chars_with_space":len(word_list)+length-1,"frequent_word":frequent,"occuring":occuring,"longest_word":longestWord,"unique_words":len(unique)}
