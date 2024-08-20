/* Table = require("./table")
solve = require("./solver.js") */

table = new Table

let rand = (n) => {
    return Math.floor(Math.random() * n)
}

function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

let fill = (v) => {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            v[i][j] = []
        }
    }
}

function is_square_free(n, r, c) {
    let square = squares_index[r][c]
    if (numbers[n].squares.includes(square)) {
        return true
    }
    return false
}

function is_tile_free(table, r, c) {
    if (typeof(table[r][c]) != "number") {
        return true
    }
}

/* function prepare_table() {
    
    // Generate map to find the index of the 3x3 square
    for (i = 0; i < 9; i++) {
        for (j = 3 * Math.floor(i/3); j < 3 * Math.floor(i/3) + 3; j++) {
            for (h = 3*(i%3); h < 3*(i%3) + 3; h++) {
                //squares_index[Math.floor(j/3)][Math.floor(h/3)].push([j,h])
                squares_index[j][h] = i
            }
        }
        numbers[i+1] = {
            columns : [],
            rows : [0,1,2,3,4,5,6,7,8],
            squares : [0,1,2,3,4,5,6,7,8]
        }
    }


    fill(table)
} */



function fill_table(table, max) {
    let quantities = [0,0,0,0,0,0,0,0,0]
    while (max > 0) {
        for (i = 0; i < 9; i++) {
            quantities[i]++
            max--
        }
    }
    console.log(quantities)
    for (i = 1; i < 10; i++) {
        const n = rand(3) + 3
    }

    for (i = 1; i < 10; i++) {
        let c = numbers[i].columns
        while (numbers[i].rows.length > 0) {
            c = numbers[i].columns
            place_number(table, i, c)
            //draw(data[2]), data[0], data[1]
        }
    }
    //console.log("end")
}

function place_number(table, i, c) {
    let rows = numbers[i].rows.slice()
    placed = false
    while (!placed) {
        h = rand(rows.length)
        r = rows[h]
        //console.log(rows, i, r, c)
        if (is_tile_free(table, r, c) && is_square_free( i, r, c)) {
            table[r][c] = i
            swap_del(numbers[i].rows, r)
            swap_del(numbers[i].squares, squares_index[r][c])
            placed = true
        } else if (!is_square_free(i, r, c)) {
            let start_r = Math.floor(r/3) * 3
            for (j = start_r; j < start_r + 3; j++) {
                swap_del(rows, j)
            }
        } else {
            swap_del(rows, r) 
        }
    }
}

function distribute_numbers(max) {
    let quantities = [0,0,0,0,0,0,0,0,0]
    while (true) {
        for (i = 0; i < 9; i++) {
            quantities[i]++
            max--
            if (max == 0) return quantities;
        }
    }
}

function distribute_columns(quant) {
    let columns = []
    let count = 0
    for (i = 0; i < 9; i++) {
        for (j = 0; j < quant[i]; j++) {
            columns.push(i)
            count++
            /* n = numbs[rand(numbs.length)]
            numbers[n].columns.push(i)
            swap_del(numbs, n) */
        }
    }
    let count2 = 0
    shuffleArray(quant)
    for (i = 1; i < 10; i++) {
        cols = columns.slice()
        for (j = 0; j < quant[i-1]; j++) {
            n = cols[rand(cols.length)]
            numbers[i].columns.push(n)
            swap_del(columns, n)
            cols = cols.filter((value) => value != n)
            count2++
        }

    }
    console.log(count, count2)
    return columns
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

function generate_sudoku(table) {
    let free_cells = []
    for (let i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            free_cells.push([j,i])
        }
    }
    
    while (placed < 81) {
        const cell = free_cells[rand(free_cells.length)]
        const row = cell[0]; const col = cell[1];
        const n = table[row][col][rand(table[row][col].length)]    
    }

}

/* prepare_table()
fill_table(table)
print_table(table) */