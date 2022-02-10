import time

z = """
for i in range(999999):for j in range(20)  :    for i in range(999999): pass
for i in range(999999):
    print("OMG")
"""

def a(code):
    now = 0
    while(True):
        now = code.find("for", now)
        if now < 0 or now > len(code): break

        indent = 0
        tmp = now
        while(True):
            if code[tmp-4:tmp] != " "*4: break
            indent += 1
            tmp -= 4

        while(True):
            ending = code.find(":", now)
            now = ending
            if code[ending+1] != "=": break
            continue

        tmp = now+1
        while(True):
            if code[tmp] != " ":
                code = code[:now+1] + code[tmp:]
                break
            tmp += 1
        
        adding = "\n" + " "*4*(indent+1) + "if(GetTimeFunction() - RuntimeStartTime > RuntimeMaxTime):break" + "\n" + " "*4*(indent+1)
        code = code[:now+1] + adding + code[now+1:] + "\n"
        now += len(adding)
    return code




code = a(z)
print(code)
s = time.time()
j = {"GetTimeFunction":time.time, "RuntimeStartTime":s, "RuntimeMaxTime":5}
exec(code, j)
print(time.time()-s)
