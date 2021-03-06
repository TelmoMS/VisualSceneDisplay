import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { ScenesService } from '../scenes.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { RenameDialogComponent } from '../rename-dialog/rename-dialog.component';
import { ImportScenesDialogComponent } from '../import-scenes-dialog/import-scenes-dialog.component';

@Component({
  selector: 'app-manage-scenes',
  templateUrl: './manage-scenes.component.html',
  styleUrls: ['./manage-scenes.component.css']
})
export class ManageScenesComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() imageSelected: boolean;
  @Output() updateScenes = new EventEmitter<string>();

  constructor(private scenesService: ScenesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  hide(): void {
    let SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length != 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: "Do you want to hide " + (this.imageSelected ? "the image : " + SCENES[this.selectedScene].images[this.selectedImage].name : "the scene : " + SCENES[this.selectedScene].name ) + " ?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          if (this.imageSelected == true) {
            this.scenesService.hideImage(this.selectedScene,this.selectedImage);
          } else {
            this.scenesService.hideScene(this.selectedScene);
          }
          this.updateScenes.emit("hide");
        }
      });
    }
  }

  remove(): void {
    let SCENES = this.scenesService.getScenes();
    if (SCENES != null && SCENES.length != 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: "Do you confirm the deletion of " + (this.imageSelected ? "the image : " + SCENES[this.selectedScene].images[this.selectedImage].name : "the scene : " + SCENES[this.selectedScene].name ) + " ?"
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          if (this.imageSelected == true) {
            this.scenesService.removeImage(this.selectedScene,this.selectedImage);
          } else {
            this.scenesService.removeScene(this.selectedScene);
          }
          this.updateScenes.emit("remove");
        }
      });
    }
  }


  rename(): void {
    let SCENES = this.scenesService.getScenes();
    let tempString = "test";
    if (SCENES != null && SCENES.length != 0) {
      const dialogRef = this.dialog.open(RenameDialogComponent, {
        width: '350px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.imageSelected = this.imageSelected;
      dialogRef.afterClosed().subscribe(result => {
        this.updateScenes.emit("rename");
      });
    }
  }

  export(): void {
    let SCENESjson = JSON.stringify(this.scenesService.getScenes());
    var file = new Blob([SCENESjson], {type: 'text/json'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
       window.navigator.msSaveOrOpenBlob(file, 'scenes.json');
    else { // Others
       var a = document.createElement("a"),
               url = URL.createObjectURL(file);
       a.href = url;
       a.download = 'scenes.json';
       document.body.appendChild(a);
       a.click();
       setTimeout(function() {
           document.body.removeChild(a);
           window.URL.revokeObjectURL(url);
       }, 0);
    }
  }

  import(): void {
    let tempString = "test";
    const dialogRef = this.dialog.open(ImportScenesDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.updateScenes.emit("import");
    });

  }




}
