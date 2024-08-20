//import {Table} from './table.js'
/* const Table = require('./table.js')
let table = new Table */

/* table[2][0] = 3
table[3][0] = 5
table[4][0] = 7
table[0][1] = 4
table[1][1] = 2
table[4][1] = 1
table[1][2] = 6
table[3][2] = 8
table[5][2] = 9
table[5][3] = 4
table[6][3] = 5
table[7][3] = 7
table[8][3] = 3
table[0][4] = 8
table[2][4] = 1
table[3][4] = 6
table[6][4] = 4
table[1][5] = 4
table[5][5] = 1
table[6][5] = 8
table[3][6] = 2
table[6][6] = 7
table[7][6] = 9
table[0][7] = 9
table[2][7] = 5
table[6][7] = 3
table[0][8] = 3
table[1][8] = 8
table[6][8] = 2
table[7][8] = 6 */

function solve(table) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (typeof(table[j][i]) == "number") {
                if (table.adjust_table(j, i) == -1) return -1;
            }
        }
    }

    

    while (true) {
        const coords = table.find_min()
        let row = coords[0]
        let col = coords[1]
        if (row == -1) return 1;
        table.move_count++
        if (table.history.length == table.move_count) {
            table.history.push({
                "possible": new Array,
                "original": table[row][col].slice()
            })
        }
        const n = table[row][col][0]
        table.place(n, row, col)

        if (table.is_impossible()) {
            const undone = table.revert()
            row = undone[0]
            col = undone[1]
            table.move_count--
            while (table[row][col].length == 0) {
                if (table.move_count == -1) return -1
                table[row][col] = table.history[table.move_count+1].original
                table.history.pop()
                const move = table.revert()
                row = move[0]
                col = move[1]
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if (typeof(table[j][i]) == "number") {
                            table.adjust_table(j, i)
                        }
                    }
                }
                table.move_count--
                //if (table.move_count == -1 && table.history[table.move_count].possible[0][0].length == 0) return -1;
                //console.log(table.history[0].possible[0][0])
            }
        }
    }
}

function print_table(table) {
    for (i = 0; i < 9; i++) {
        let output = "  "
        for (j = 0; j < 9; j++) {
            output += table[i][j].toString() + "  "
        }
        console.log(output)
    }
}

function has_single_solution(table) {
    let temp1 = clone_table(table)
    let temp2 = clone_table(table)
    console.log(temp1[2][6])
    if (solve(temp1) == -1) {
        return false
    }
    const last_move = temp1.history[temp1.history.length - 1].possible[0]
    swap_del(temp2[last_move[2]][last_move[3]], last_move[1])
    if (solve(temp2) == 1) {
        return false
    }
    return true
}

/* solve(table)
print_table(table) */
//module.exports = solve