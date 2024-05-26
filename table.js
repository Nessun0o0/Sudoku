let swap_del = (v, n) => {
    let i = -1
    if (typeof(v) == "object") {
        i = v.indexOf(n)
    }
    if (i != -1 /* && v.length > 1 */) {
        v[i] = v[v.length - 1]
        v.pop()
    }
}

function Table () {
    let arr = [[],[],[],[],[],[],[],[],[]]

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            arr[i][j] = [1,2,3,4,5,6,7,8,9].slice()
        }
    }

    arr.history = []
    arr.move_count = -1

    arr.place = (n, row, col) => {
        for (let i = 0; i < 9; i++) {
            if (i != row) {
                swap_del(arr[i][col], n)
            }
            if (i != col) {
                swap_del(arr[row][i], n)
            }
            let row_s = 3*Math.floor(row/3) + i%3
            let col_s = 3*Math.floor(col/3) + Math.floor(i/3)
            if (col_s != col && row_s != row) {
                swap_del(arr[row_s][col_s], n)
            }
        }
        swap_del(arr[row][col], n)
        arr.history[arr.move_count].possible.push([arr[row][col].slice(), n, row, col])
        arr[row][col] = n
    }
    
    arr.revert = () => {
        let move = arr.history[arr.move_count].possible.pop()
        let n = move[1]
        let row = move[2]
        let col = move[3]

        for (let i = 0; i < 9; i++) {
            if (i != row && typeof(arr[i][col]) != "number") {
                arr[i][col].push(n)
            }
            if (i != col && typeof(arr[row][i]) != "number") {
                arr[row][i].push(n)
            }
            let row_s = 3*Math.floor(row/3) + i%3
            let col_s = 3*Math.floor(col/3) + Math.floor(i/3)
            if (col_s != col && row_s != row && typeof(arr[row_s][col_s]) != "number") {
                arr[row_s][col_s].push(n)
            }
        }

        arr[row][col] = move[0]
        return [row, col]
    }

    arr.adjust_table = (row, col) => {
        let n = arr[row][col]

        for (let i = 0; i < 9; i++) {
            if (i != row) {
                swap_del(arr[i][col], n)
            }
            if (i != col) {
                swap_del(arr[row][i], n)
            }
            let row_s = 3*Math.floor(row/3) + i%3
            let col_s = 3*Math.floor(col/3) + Math.floor(i/3)
            if (col_s != col && row_s != row) {
                swap_del(arr[row_s][col_s], n)
            }
        }
    }

    arr.find_min = () => {
        let min = 10
        let coords = [-1, -1]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (typeof(arr[i][j]) != "number" && arr[i][j].length < min) {
                    min = arr[i][j].length
                    coords = [i, j]
                }
            }
        }
        return coords
    }

    arr.is_impossible = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (typeof(arr[i][j]) != "number" && arr[i][j].length == 0) {
                    return true
                }
            }
        }
        return false
    }

    return arr
}

module.exports = Table