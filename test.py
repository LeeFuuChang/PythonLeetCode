p = """
class a():
    def __init__(self, a, b):
        self.a = a
        self.b = b
class z():
    def add(self, c, d):
        self.k = a(c, d)
        return self.k.a + self.k.b
"""



a = 10
def g():
    k = {}
    exec(p, k)
    print(k["z"]().add(1, 50))
g()