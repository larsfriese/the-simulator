matrix = [[2, 3, 4], [6, 7, 8], [4, 6, 2]] # rows

type_of_square_matrix = len(matrix)

def det2(matrix):
    return (matrix[0][0]*matrix[1][1] - matrix[0][0]*matrix[1][1])

def det3(matrix):
    return (matrix[0][0]*matrix[1][1]*matrix[2][2] + matrix[0][1]*matrix[1][2]*matrix[2][0] +
            matrix[0][2]*matrix[1][0]*matrix[2][1] - matrix[0][2]*matrix[1][1]*matrix[2][0] -
            matrix[0][1]*matrix[1][0]*matrix[2][2] - matrix[0][0]*matrix[1][2]*matrix[2][1])

def min(matrix, i, j): # i'th column, j'th row
    del matrix[j]
    for x in matrix:
        del matrix[x][i]
    return matrix

def det(matrix, j):
    if len(i) != type_of_square_matrix:
        print('Not square.')
        exit(0)
    
    if len(matrix) == 1:
        return matrix[0]
    elif len(matrix) == 2:
        return det3(matrix)
    elif len(matrix) == 3:
        return det3(matrix)
    else:
        sum = 0
        for k in range(type_of_square_matrix, 1):
            sum += (-1)**(k+j) * matrix[j][k] * det(min(matrix, k, j))

# def check_selfadj():
    

if __name__ == '__main__':
    print(det(matrix, 1))
