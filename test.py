import resource
usage = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
print(usage)