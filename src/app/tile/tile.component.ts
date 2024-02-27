import { Component, Input } from '@angular/core';
import { PuzzleService } from '../puzzle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
})
export class TileComponent {
  @Input() value!: number;

  constructor(private puzzleService: PuzzleService) {}

  tileClicked(): void {
    // Get the position of the clicked tile
    const row = this.puzzleService
      .getPuzzle()
      .findIndex((row) => row.includes(this.value));
    const col = this.puzzleService.getPuzzle()[row].indexOf(this.value);

    // Move the tile if it's movable
    this.puzzleService.moveTile(row, col);
  }
}
