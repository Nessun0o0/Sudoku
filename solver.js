const Table = require("./table.js")

table = new Table

//Example table
/* table[0][1] = 7
table[0][2] = 1
table[0][6] = 4
table[0][7] = 3
table[1][0] = 8
table[1][3] = 3
table[1][5] = 9
table[1][8] = 6
table[2][2] = 5
table[2][5] = 8
table[2][8] = 2
table[3][0] = 1
table[3][1] = 9
table[3][2] = 3
table[3][3] = 7
table[3][6] = 2
table[3][7] = 8
table[5][1] = 4
table[5][2] = 6
table[5][6] = 9
table[5][7] = 1
table[6][0] = 7
table[6][3] = 2
table[6][5] = 1
table[6][8] = 4
table[7][2] = 8
table[7][5] = 7
table[7][8] = 9
table[8][0] = 6
table[8][1] = 3
table[8][2] = 2
table[8][3] = 4
table[8][6] = 8
table[8][7] = 7 */

table[0][0] = 7
table[0][2] = 8
table[0][6] = 3
table[1][3] = 2
table[1][5] = 1
table[2][0] = 5
table[3][1] = 4
table[3][7] = 2
table[3][8] = 6
table[4][0] = 3
table[4][4] = 8
table[5][3] = 1
table[5][7] = 9
table[6][1] = 9
table[6][3] = 6
table[6][8] = 4
table[7][4] = 7
table[7][6] = 5

function solve(table) {

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (typeof(table[j][i]) == "number") {
                table.adjust_table(j, i)
            }
        }
    }
    
    while (true) {
        const coords = table.find_min()
        let row = coords[0]
        let col = coords[1]
        if (row == -1) return;
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

solve(table)
print_table(table)