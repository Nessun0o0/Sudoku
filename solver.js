function solve(table) {

    if (table.is_impossible()) return -1;

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
    
    if (solve(temp1) == -1) {
        return false
    }

    for (let i = temp1.history.length - 1; i >= 0; i--) {
        const undone = temp1.history[i].possible[0]
        temp1[undone[2]][undone[3]] = [1,2,3,4,5,6,7,8,9].slice()

        if (undone[0].length != 0) {
            for (let j = 0; j < undone[0].length; j++) {
                let temp2 = clone_table(temp1)
                temp2[undone[2]][undone[3]] = undone[0][j]
                if (solve(temp2) == 1) {
                    return false
                }
            }
        }
    }

    return true
}