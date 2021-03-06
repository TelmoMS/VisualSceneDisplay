import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../types';
import { SceneDisplayComponent } from '../scene-display/scene-display.component';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  mode = "play";
  sceneTitle : string;
  displayBar = true;
  hideShowButtonChar = "▲";
  currentDrawingTool = "white";
  COLORS: Color[] = [
    { name: "white"  , hex: '#FFFFFF' },
    { name: "black"  , hex: '#000000' },
    { name: "red"    , hex: '#f34336' },
    { name: "orange" , hex: '#ff7f00' },
    { name: "blue"   , hex: '#0080ff' },
    { name: "green"  , hex: '#228b22' },
  ];

  changeMode(mode : string): void {
    this.mode = mode;
  }

  changeColor(toolName: string): void {
    this.currentDrawingTool = toolName;
  }

  hideShowMenu(): void {
    if (this.displayBar === true) {
      this.displayBar = false;
      this.mode="play";
      this.hideShowButtonChar = "▼";
    } else {
      this.displayBar = true;
      this.hideShowButtonChar = "▲"
    }
  }

  onImageChange(imageName: string): void {
    this.sceneTitle = imageName;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
