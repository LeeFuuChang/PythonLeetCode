def Search(ip, current):
    ip_node = ip.split(".")
    if current.get(ip_node[0], False):
        if current[ip_node[0]].get(ip_node[1], False):
            if current[ip_node[0]][ip_node[1]].get(ip_node[2], False):
                if current[ip_node[0]][ip_node[1]][ip_node[2]].get(ip_node[3], False):
                    return current[ip_node[0]][ip_node[1]][ip_node[2]][ip_node[3]]
    return None


def Join(ip, current, username):
    ip_node = ip.split(".")
    if not current.get(ip_node[0], False):
        current[ip_node[0]] = {}
    if not current[ip_node[0]].get(ip_node[1], False):
        current[ip_node[0]][ip_node[1]] = {}
    if not current[ip_node[0]][ip_node[1]].get(ip_node[2], False):
        current[ip_node[0]][ip_node[1]][ip_node[2]] = {}
    current[ip_node[0]][ip_node[1]][ip_node[2]][ip_node[3]] = username
    return current


def Delete(ip, current):
    if not Search(ip, current): return current
    ip_node = ip.split(".")
    if len(current[ip_node[0]][ip_node[1]][ip_node[2]]) == 1:
        if len(current[ip_node[0]][ip_node[1]]) == 1:
            if len(current[ip_node[0]]) == 1:
                del current[ip_node[0]]
            else:
                del current[ip_node[0]][ip_node[1]]
        else:
            del current[ip_node[0]][ip_node[1]][ip_node[2]]
    else:
        del current[ip_node[0]][ip_node[1]][ip_node[2]][ip_node[3]]
    return current
