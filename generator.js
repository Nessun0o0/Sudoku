let rand = (n) => {
    return Math.floor(Math.random() * n)
}

function place_number(table, n, row, col) {
    for (let i = 0; i < 9; i++) {
        if (i != row) {
            swap_del(table[i][col], n)
        }
        if (i != col) {
            swap_del(table[row][i], n)
        }
        let row_s = 3*Math.floor(row/3) + i%3
        let col_s = 3*Math.floor(col/3) + Math.floor(i/3)
        if (col_s != col && row_s != row) {
            swap_del(table[row_s][col_s], n)
        }
    }
}

function fill_random(table) {
    let free_cells = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            free_cells.push([j,i])
        }
    }

    let operations = 0
    while (!has_single_solution(table)) {
        const cell = free_cells[rand(free_cells.length)]
        const row = cell[0]; const col = cell[1];
        swap_del(free_cells, cell)
        let found = false
        
        while (!found) {
            operations++
            const n = table[row][col][rand(table[row][col].length)]
            let temp = clone_table(table)
            temp[row][col] = n

            if (solve(temp) == 1) {
                table[row][col] = n
                place_number(table, n, row, col)
                found = true
            } else {
                swap_del(table[row][col], n)
            }
        }

        if (operations > 15) {
            solve(table)
            hide_cells(table)
            return
        }
    }
    //solve(table)
    return

}

function hide_cells(table) {
    let filled_cells = []
    for (let i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            filled_cells.push([j,i])
        }
    }

    while(true) {
        const cell = filled_cells[rand(filled_cells.length)]
        const row = cell[0]; const col = cell[1];
        swap_del(filled_cells, cell)
        let temp = clone_table(table)

        temp[row][col] = [1,2,3,4,5,6,7,8,9].slice()
        if (!has_single_solution(temp)) {
            break
        } else {
            table[row][col] = [1,2,3,4,5,6,7,8,9].slice()
        }
    }

    for (let i = 0; i < filled_cells.length; i++) {
        const row = filled_cells[i][0]
        const col = filled_cells[i][1]
        let temp = clone_table(table)

        temp[row][col] = [1,2,3,4,5,6,7,8,9].slice()
        if (has_single_solution(temp)) {
            table[row][col] = [1,2,3,4,5,6,7,8,9].slice()
        }
    }
}

function generate(table) {
    fill_random(table)
    draw()
}