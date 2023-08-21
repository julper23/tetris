const SHAPES = [
    {
        // Cuadrado
        shape: [
            {x:0, y:0},
            {x:0, y:1},
            {x:1, y:0},
            {x:1, y:1}
        ],
        width: 2,
        height: 2,
        rotate: false
    },
    {
        // Largo
        shape: [
            {x:0, y:0},
            {x:0, y:1},
            {x:0, y:2},
            {x:0, y:3}
        ],
        width: 1,
        height: 4
    },
    {
        // Ele
        shape: [
            {x:0, y:0},
            {x:0, y:1},
            {x:0, y:2},
            {x:1, y:2}
        ],
        width: 1,
        height: 3
    },
    {
        //Z
        shape: [
            {x:0, y:0},
            {x:1, y:0},
            {x:1, y:1},
            {x:2, y:1}
        ],
        width: 3,
        height: 2,
    },
    {
        //Z invertida
        shape: [
            {x:0, y:1},
            {x:1, y:1},
            {x:1, y:0},
            {x:2, y:0}
        ],
        width: 3,
        height: 2,
    },
    { 
        // T
        shape: [
            {x:0, y:1},
            {x:1, y:1},
            {x:2, y:1},
            {x:1, y:2},
        ],
        width: 3,
        height: 1,
    }
/*
[0][1][2]2
[0][1][2]1
[0][1][2]0*/

];

export function randomShape() {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}