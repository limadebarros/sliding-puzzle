import { Component } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzle.component.html',
  styleUrl: './puzzle.component.css',
})
export class PuzzleComponent {
  puzzle: number[][] = [];
  gameFinished: boolean = false;
  winMessage: string = '';

  constructor(private puzzleService: PuzzleService) {}

  ngOnInit(): void {
    this.initializePuzzle();
  }

  initializePuzzle(): void {
    this.puzzleService.shuffle();
    this.puzzle = this.puzzleService.getPuzzle();
    this.winMessage = '';
  }

  shuffle(): void {
    this.initializePuzzle();
    this.gameFinished = false
  }

  tileClicked(row: number, col: number): void {
    this.puzzleService.moveTile(row, col);
    this.puzzle = this.puzzleService.getPuzzle();
    if (this.puzzleService.checkWin()) {
      this.gameFinished = true;
      this.winMessage = 'Congratulations! You solved the puzzle!';

      // launch confetti from the left edge
      confetti({
        particleCount: 1000,
        angle: 60,
        spread: 250,
        origin: { x: 0 },
      });

      // and launch confetti from the right edge
      confetti({
        particleCount: 1000,
        angle: 120,
        spread: 250,
        origin: { x: 1 },
      });
    }
  }
}
