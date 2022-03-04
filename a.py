from collections import namedtuple
import pygame
import random

pygame.init()

class Directions():
    RIGHT = 1
    DOWN = 2
    LEFT = 3
    UP = 4
    clock_wise = [RIGHT, DOWN, LEFT, UP]

Point = namedtuple("Point", ("x", "y"))

BACKGROUND = ( 22,  22,  22)
SNAKECOLOR = (  0, 150,   0)
FOOD_COLOR = (241,   9,  22)
SCORECOLOR = (255, 255, 255)

FONT = pygame.font.SysFont('arial', 25)

GAME_WIDTH = 640
GAME_HEIGHT = 480
GAME_SPEED = 20
BLOCK_SIZE = 20
BORDER_WIDTH = 3
DEFAULT_LEN = 3



class SnakeGame():
    def __init__(self, w, h, dlen):
        self.w = w
        self.h = h
        self.dlen = dlen

        self.window = pygame.display.set_mode((self.w, self.h))
        self.FPS = pygame.time.Clock().tick
        self.reset()


    def reset(self):
        self.direction = Directions.RIGHT

        self.head = Point(self.w//2, self.h//2)
        self.snake = [self.head] + [Point(self.head.x-(BLOCK_SIZE*i), self.head.y) for i in range(1, self.dlen)]

        self.frame = 0
        self.score = 0
        self.apple = 0
        self.place_apple()


    def place_apple(self):
        appleX = random.randint(0, (self.w-BLOCK_SIZE)//BLOCK_SIZE)*BLOCK_SIZE
        appleY = random.randint(0, (self.h-BLOCK_SIZE)//BLOCK_SIZE)*BLOCK_SIZE
        self.apple = Point(appleX, appleY)
        if self.apple in self.snake:
            self.place_apple()


    def update(self, action):
        self.frame += 1

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()

        game_over = self.update_snake(action)

        self.draw()
        self.FPS(GAME_SPEED)
        return game_over
    

    def update_snake(self, action):
        idx_now = Directions.clock_wise.index(self.direction)
        idx_nxt = action.index(1)

        nxt_direction = {
            0:Directions.clock_wise[ (idx_now - 1) % 4 ],
            1:self.direction,
            2:Directions.clock_wise[ (idx_now + 1) % 4 ]
        }

        self.direction = nxt_direction[idx_nxt]

        v = {
            Directions.RIGHT:( BLOCK_SIZE, 0),
            Directions.DOWN :(0,  BLOCK_SIZE),
            Directions.LEFT :(-BLOCK_SIZE, 0),
            Directions.UP   :(0, -BLOCK_SIZE)
        }
        x = self.head.x + v[self.direction][0]
        y = self.head.y + v[self.direction][1]
        self.head = Point(x, y)
        self.snake.insert(0, self.head)

        if self.check_collision() or self.frame > 100*len(self.snake):
            return True

        if self.head == self.apple:
            self.score += 1
            self.place_apple()
        else:
            self.snake.pop()
        return False


    def check_collision(self):
        if self.head in self.snake[1:]:
            return True
        elif self.head.x > self.w-BLOCK_SIZE or self.head.x < 0:
            return True
        elif self.head.y > self.h-BLOCK_SIZE or self.head.y < 0:
            return True
        return False


    def draw(self):

        self.window.fill(BACKGROUND)

        for block in self.snake:
            pygame.draw.rect(
                self.window,
                SNAKECOLOR,
                pygame.Rect(
                    block.x+BORDER_WIDTH,
                    block.y+BORDER_WIDTH,
                    BLOCK_SIZE-(BORDER_WIDTH*2),
                    BLOCK_SIZE-(BORDER_WIDTH*2)
                )
            )

        pygame.draw.rect(
            self.window,
            FOOD_COLOR,
            pygame.Rect(
                self.apple.x+BORDER_WIDTH,
                self.apple.y+BORDER_WIDTH,
                BLOCK_SIZE-(BORDER_WIDTH*2),
                BLOCK_SIZE-(BORDER_WIDTH*2)
            )
        )

        self.window.blit(
            FONT.render(
                f"Score: {self.score}",
                True,
                SCORECOLOR
            ),
            (0, 0)
        )

        pygame.display.update()





Game = SnakeGame(GAME_WIDTH, GAME_HEIGHT, DEFAULT_LEN)
held = False
while(True):
    pressed = pygame.key.get_pressed()

    action = [0, 1, 0]
    if not held:
        if pressed[pygame.K_LEFT]:
            action = [1, 0, 0]
        elif pressed[pygame.K_RIGHT]:
            action = [0, 0, 1]

    Game_Over = Game.update(action)
    if Game_Over: break

    held = pressed[pygame.K_LEFT] or pressed[pygame.K_RIGHT]

print(Game.score)




