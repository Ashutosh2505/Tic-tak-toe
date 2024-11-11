document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameEnded = false;

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                return cells[a].innerText;
            }
        }
        return null;
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = parseInt(cell.dataset.index);

        if (cell.innerText || gameEnded) return;

        cell.innerText = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            message.innerText = `Player ${winner} wins!`;
            gameEnded = true;
        } else if ([...cells].every(cell => cell.innerText)) {
            message.innerText = "It's a tie!";
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const resetGame = () => {
        cells.forEach(cell => {
            cell.innerText = '';
        });
        message.innerText = '';
        currentPlayer = 'X';
        gameEnded = false;
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetBtn.addEventListener('click', resetGame);
});
