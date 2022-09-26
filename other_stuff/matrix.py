import copy

matrix = [[0, 3, 4, 3], [0, 6, 8, 6], [-2, -1, 4, 0], [-2, -7, 4, 9]] # rows

def det2(matrix):
    return (matrix[0][0]*matrix[1][1] - matrix[0][0]*matrix[1][1])

def det3(matrix):
    return (matrix[0][0]*matrix[1][1]*matrix[2][2] + matrix[0][1]*matrix[1][2]*matrix[2][0] +
            matrix[0][2]*matrix[1][0]*matrix[2][1] - matrix[0][2]*matrix[1][1]*matrix[2][0] -
            matrix[0][1]*matrix[1][0]*matrix[2][2] - matrix[0][0]*matrix[1][2]*matrix[2][1])

def minorant(matrix, i, j): # i'th column, j'th row
    matrix_new = copy.deepcopy(matrix)
    for c in range(0, len(matrix_new)):
        del matrix_new[c][i]
    del matrix_new[j]
    return matrix_new

def det(matrix, j):
    type_of_square_matrix = len(matrix)
    for i in matrix:
        if len(i) != type_of_square_matrix:
            raise Exception('Matrix not square.')

    if len(matrix) == 1:
        return matrix[0]
    elif len(matrix) == 2:
        return det2(matrix)
    elif len(matrix) == 3:
        return det3(matrix)
    else:
        # Laplas'sche entwicklung nach j'ter Zeile
        sum = 0
        for k in range(0, type_of_square_matrix):
            print(matrix)
            sum += (-1)**(k+j) * matrix[j][k] * det(minorant(matrix, k, j), 1)
        return sum

def transpose(matrix):
    return list(map(list, zip(*matrix)))

def self_adjugated(matrix):
    return True if matrix == transpose(matrix) else False

def eigenvalues(matrix):
    return

if __name__ == '__main__':
    print(det(matrix, 1))
