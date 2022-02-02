var QUESTION = {
    "id":"1",
    "name":"Two Sum",
    "difficulty":"Easy",
    "likes":28753,
    "dislikes":923,
    "description":[
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.<br>",
        "You may assume that each input would have exactly one solution, and you may not use the same element twice.<br>",
        "You can return the answer in any order.<br>"
    ],
    "var":[
        "nums",
        "target"
    ],
    "example":{
        "ex1":{
            "input":"nums = [2,7,11,15], target = 9",
            "output":"[0,1]",
            "explain":"Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        "ex2":{
            "input":"nums = [3,2,4], target = 6",
            "output":"[1,2]",
            "explain":null
        },
        "ex3":{
            "input":"nums = [3,3], target = 6",
            "output":"[0,1]",
            "explain":null
        }
    },
    "constraints":[
        "2 <= nums.length <= 10<sup>4</sup>",
        "-10<sup>9</sup> <= nums[i] <= 10<sup>9</sup>",
        "-10<sup>9</sup> <= target <= 10<sup>9</sup>",
        "Only one valid answer exists."
    ]
}