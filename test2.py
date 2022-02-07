import time, threading

code = """
class Solution():
    def main(self, l1, l2):
        while(a:=True) :
            pass
"""

def FixInfiniteWhile(code):
    now = 0
    while(True):
        finding = "while("
        idx = code.find(finding, now)
        if idx < 0 or idx > len(code): break
        inserting = "(self.GetTimeFunction() - self.RuntimeStartTime < self.RuntimeMaxTime) and ("
        code = code[:idx+len(finding)] + inserting + code[idx+len(finding):]
        now = idx+len(finding)+len(inserting)

        _now = now
        while(True):
            ending = code.find(":", _now)
            if code[ending+1] == "=": 
                _now = ending+1
                continue
            code = code[:ending] + ")" + code[ending:]
            now = ending+2
            break
    return code
code = FixInfiniteWhile(code)
print(code)


def a():
    z = {}
    exec(code, z)
    setattr(z["Solution"], "RuntimeMaxTime", 5)
    setattr(z["Solution"], "GetTimeFunction", time.time)
    setattr(z["Solution"], "RuntimeStartTime", time.time())
    setattr(z["Solution"], "RuntimeMaxTime", 10)
    setattr(z["Solution"], "GetTimeFunction", time.time)
    setattr(z["Solution"], "RuntimeStartTime", time.time())
    aa = time.time()
    z["Solution"]().main(1, 1)
    print("end", time.time()-aa)

    
a()