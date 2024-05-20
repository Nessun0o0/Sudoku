
let rand = (n) => {
    return Math.floor(Math.random() * n)
}

let swap_del = (v, n) => {
    let i = -1
    if (typeof(v) == "object") {
        i = v.indexOf(n)
        console.log(n, i)
    }
    if (i != -1 /* && v.length > 1 */) {
        v[i] = v[v.length - 1]
        v.pop()
    }
}

let fill = (v) => {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            v[i][j] = [...full_cell]
        }
    }
}

let squares_index = [[[],[],[]],[[],[],[]],[[],[],[]]]
let table = [[],[],[],[],[],[],[],[],[]]
let full_cell = [1,2,3,4,5,6,7,8,9]

function prepare_table() {
    
    // Generate map to find the index of the 3x3 square
    for (i = 0; i < 9; i++) {
        for (j = 3 * Math.floor(i/3); j < 3 * Math.floor(i/3) + 3; j++) {
            for (h = 3*(i%3); h < 3*(i%3) + 3; h++) {
                squares_index[Math.floor(j/3)][Math.floor(h/3)].push([j,h])
            }
        }
    }

    fill(table)
}



function fill_table(table) {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            let h = rand(table[j][i].length)
            let n = table[j][i][h]
            table[j][i] = n
            for (k = 0; k < 9; k++) {
                if (k != i) {
                    swap_del(table[j][k], n)
                }
                if (k != j) {
                    swap_del(table[k][i], n)
                }
                let r = squares_index[Math.floor(j/3)][Math.floor(i/3)][k][0]
                let c = squares_index[Math.floor(j/3)][Math.floor(i/3)][k][1]
                if (r != j && c != i) {
                    swap_del(table[r][c], n)
                }
            }
        }        
    }
}

function print_table(table) {
    for (i = 0; i < 9; i++) {
        let output = "  "
        for (j = 0; j < 9; j++) {
            output += table[j][i].toString() + "  "
        }
        console.log(output)
    }
}

prepare_table()
fill_table(table)
print_table(table)