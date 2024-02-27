// puzzle.service.ts
import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {
  private puzzleSize = 4;
  private tiles: number[][] = [];

  constructor() { 
    this.initPuzzle();
  }

  private initPuzzle(): void {
    // Initialize puzzle tiles
    for (let i = 0; i < this.puzzleSize; i++) {
      this.tiles[i] = [];
      for (let j = 0; j < this.puzzleSize; j++) {
        this.tiles[i][j] = i * this.puzzleSize + j + 1;
      }
    }
    this.tiles[this.puzzleSize - 1][this.puzzleSize - 1] = 0; // Empty tile
  }

  shuffle(): void {
    // Shuffle tiles by randomly swapping them
    for (let i = this.puzzleSize - 1; i >= 0; i--) {
      for (let j = this.puzzleSize - 1; j >= 0; j--) {
        // Skip shuffling the empty tile
        if (i === this.puzzleSize - 1 && j === this.puzzleSize - 1) {
          continue;
        }
        const randI = Math.floor(Math.random() * (i + 1));
        const randJ = Math.floor(Math.random() * (j + 1));
        [this.tiles[i][j], this.tiles[randI][randJ]] = [this.tiles[randI][randJ], this.tiles[i][j]];
      }
    }
  }

  moveTile(row: number, col: number): void {
    // Check if the clicked tile can be moved
    if (this.canMove(row, col)) {
      // Find empty tile position
      const emptyRow = this.tiles.findIndex(row => row.includes(0));
      const emptyCol = this.tiles[emptyRow].indexOf(0);

      // Swap clicked tile with empty tile
      [this.tiles[row][col], this.tiles[emptyRow][emptyCol]] = [this.tiles[emptyRow][emptyCol], this.tiles[row][col]];
    }
  }

  private canMove(row: number, col: number): boolean {
    // Check if the tile can be moved
    const emptyRow = this.tiles.findIndex(row => row.includes(0));
    const emptyCol = this.tiles[emptyRow].indexOf(0);

    // Check if the clicked tile is adjacent to the empty tile
    return (Math.abs(emptyRow - row) === 1 && emptyCol === col) || 
           (Math.abs(emptyCol - col) === 1 && emptyRow === row);
  }

  checkWin(): boolean {
    // Check if the puzzle is solved
    let count = 1;
    for (let i = 0; i < this.puzzleSize; i++) {
      for (let j = 0; j < this.puzzleSize; j++) {
        if (this.tiles[i][j] !== count % (this.puzzleSize * this.puzzleSize)) {
          return false;
        }
        count++;
      }
    }
    return true;
  }

  getPuzzle(): number[][] {
    return this.tiles;
  }
}
