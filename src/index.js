import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// A board which contains 9 squares
class Board extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the board, represented by an array with 9 null values
    // By default, X is set to go first
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  // Button click handler
  handleClick(i) {
    // Create a copy of the squares to prevent mutation
    const squares = this.state.squares.slice();
    // If there is a winner or a square already contains X/O, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Determine whose turn it is
    squares[i] = this.state.xIsNext ? "X" : "O";
    // Set the state of the board to contain the contains of squares
    // Every time this is called, xIsNext is flipped to toggle between X and O
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  // Render a single square
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} // the value of the square according to the array in squares
        onClick={() => this.handleClick(i)} // on click, use the board's handleClick method
      />
    );
  }

  render() {
    // Every time the board is rendered, check for a winner
    const winner = calculateWinner(this.state.squares);
    // Display the winner or the next player's turn
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}