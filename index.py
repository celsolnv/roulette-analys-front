from collections import deque
import sys
sys.setrecursionlimit(10000)

def evolve(matrix):
    rows = len(matrix)
    cols = len(matrix[0])

    # criar uma cópia da matriz atual
    new_matrix = [[matrix[i][j] for j in range(cols)] for i in range(rows)]

    # percorrer cada célula da matriz
    for i in range(rows):
        for j in range(cols):
            # contar células verdes adjacentes
            count = 0
            for x in range(-1, 2):
                for y in range(-1, 2):
                    if x == 0 and y == 0:
                        continue
                    if i + x < 0 or i + x >= rows or j + y < 0 or j + y >= cols:
                        continue
                    if matrix[i+x][j+y] == 1:
                        count += 1

            # aplicar as regras para as células brancas
            if i == 0 and j == 0 or i == 6 and j == 7:
                continue
            elif matrix[i][j] == 0:
                if count == 2 or count == 3:
                    new_matrix[i][j] = 1
                else:
                    new_matrix[i][j] = 0

            # aplicar as regras para as células verdes
            else:
                if count > 3 and count < 6:
                    new_matrix[i][j] = 1
                else:
                    new_matrix[i][j] = 0

    # atualizar a matriz antiga com a nova matriz
    for i in range(rows):
        for j in range(cols):
            matrix[i][j] = new_matrix[i][j]

    return matrix


def find_path(matrix):
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    visited = set()
    stack = [(0, 0)]
    
    while stack:
        x, y = stack.pop()
        if (x, y) == (6, 7):
            return [(6, 7)]
        visited.add((x, y))
        
        for dx, dy in directions:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < len(matrix) and 0 <= new_y < len(matrix[0]) and (new_x, new_y) not in visited:
                if matrix[new_x][new_y] == 0:
                    stack.append((new_x, new_y))
                    break
        else:
            continue
        
        while True:
            matrix = evolve(matrix)
            if matrix[x][y] == 0:
                break
        
        path = find_path(matrix)
        if path is not None:
            return [(x, y)] + path
    
    return None


matriz = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]
caminho = find_path(matriz)
print(caminho)
# Exibe o resultado
# for i in range(7):
#     matrix = evolve_matrix(matrix)
#     print(f"Generation {i+1}:")
#     for row in matrix:
#         print(row)
#     print()


