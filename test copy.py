import tracemalloc  
import time  
  
if __name__ == '__main__':  
    tracemalloc.start()  
    my_list = []  
    for i in range(10000):  
        my_list.extend(list(range(1000)))  
        time.sleep(5)  
        current, peak = tracemalloc.get_traced_memory()  
        print(f"Current memory usage is {current / 10**6}MB; Peak was {peak / 10**6}MB")  
  
    tracemalloc.stop() 