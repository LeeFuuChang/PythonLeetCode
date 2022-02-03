from typing import List


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

a = ListNode(4, ListNode(3))
b = ListNode(4, ListNode(3))
print([4, 3] == [4, 3])