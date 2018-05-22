

def server2int(server):
    serverl = server.lower()
    if serverl == "ice" or serverl == "1":
        return 1
    elif serverl == "ros" or serverl == "2":
        return 2
    elif serverl == "glacier" or serverl == "glacier2" or serverl == "3":
        return 3
    else : return 0