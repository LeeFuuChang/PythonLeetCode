import time

class CodeProcessor():
    def Fix(code):
        fixed_code = CodeProcessor.FixInfiniteWhile(code)
        fixed_code = CodeProcessor.FixLongFor(fixed_code)
        fixed_code = CodeProcessor.FixLongComprehension(fixed_code)
        return fixed_code

    def FixInfiniteWhile(code):
        now = 0
        while(True):
            finding = "while("
            idx = code.find(finding, now)
            if idx < 0 or idx > len(code): break
            inserting = "(self._GetTimeFunction() - self._RuntimeStartTime < self._RuntimeMaxTime) and ("
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

    def FixLongFor(code):
        now = 0
        while(True):
            now = code.find("for", now)
            if now < 0 or now > len(code): break

            is_for = True
            looking_for_brac = [0, 0, 0, 0] #[], (), '', ""
            tmp = now+3
            while(True):
                tmp+=1
                if(not sum(looking_for_brac[2:])):
                    if code[tmp] == "[":
                        looking_for_brac[0] += 1
                    elif code[tmp] == "]":
                        if(not looking_for_brac[0]): 
                            is_for = False
                            break
                        else:
                            looking_for_brac[0] -= 1
                    elif code[tmp] == "(":
                        looking_for_brac[1] += 1
                    elif code[tmp] == ")":
                        if(not looking_for_brac[1]): 
                            is_for = False
                            break
                        else:
                            looking_for_brac[1] -= 1
                    elif code[tmp] == "\'":
                        looking_for_brac[2] += 1
                    elif code[tmp] == "\"":
                        looking_for_brac[3] += 1
                    elif code[tmp] == ":" and not sum(looking_for_brac):
                        break
                    elif code[tmp] == "\n":
                        is_for = False
                        break
                else:
                    if code[tmp] == "\'" and looking_for_brac[2]:
                        looking_for_brac[2] -= 1
                    elif code[tmp] == "\"" and looking_for_brac[3]:
                        looking_for_brac[3] -= 1

            if not is_for:
                now = tmp
                continue
            else:
                ending = tmp

            indent = 0
            tmp = now
            while(True):
                if code[tmp-4:tmp] != " "*4: break
                indent += 1
                tmp -= 4

            if ending:
                _now = ending+1
                while(True):
                    if code[_now] != " ": break
                    _now += 1

                adding = "\n" + " "*4*(indent+1) + "if(self._GetTimeFunction() - self._RuntimeStartTime > self._RuntimeMaxTime):break" + "\n" + " "*4*(indent+1)
                code = code[:ending+1] + adding + code[_now:] + "\n"
                now += len(adding)
        return code

    def FixLongComprehension(code):
        now = 0
        while(True):
            now = code.find("for", now)
            if now < 0 or now > len(code): break

            is_for = True
            looking_for_brac = [0, 0, 0, 0] #[], (), '', ""
            tmp = now
            while(True):
                tmp -= 1
                if(not sum(looking_for_brac[2:])):
                    if code[tmp] == "[":
                        if(not looking_for_brac[0]): 
                            is_for = True
                            break
                        else:
                            looking_for_brac[0] -= 1
                    elif code[tmp] == "]":
                        looking_for_brac[0] += 1
                    elif code[tmp] == "(":
                        if(not looking_for_brac[1]): 
                            is_for = True
                            break
                        else:
                            looking_for_brac[1] -= 1
                    elif code[tmp] == ")":
                        looking_for_brac[1] += 1
                    elif code[tmp] == "\'":
                        looking_for_brac[2] += 1
                    elif code[tmp] == "\"":
                        looking_for_brac[3] += 1
                    elif code[tmp] == "\n":
                        is_for = False
                        break
                else:
                    if code[tmp] == "\'" and looking_for_brac[2]:
                        looking_for_brac[2] -= 1
                    elif code[tmp] == "\"" and looking_for_brac[3]:
                        looking_for_brac[3] -= 1

            if not is_for:
                now += 3
                continue
            else:
                ending = tmp

            if ending:
                adding = ") if(self._GetTimeFunction() - self._RuntimeStartTime < self._RuntimeMaxTime)else(self._KillTLE()) "
                code = code[:ending+1] + "(" + code[ending+1:now] + adding + code[now:]
                now += len(adding) + 3
        return code

    def _GetTimeFunction(Solution_self):
        return time.time()
    
    def _KillTLE(Solution_self):
        class Time_Limit_Exceed(Exception):
            pass
        raise Time_Limit_Exceed("Time Limit Exceed")
