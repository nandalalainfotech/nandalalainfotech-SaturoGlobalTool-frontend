import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-application-setting',
  templateUrl: './application-setting.component.html',
  styleUrls: ['./application-setting.component.css']
})
export class ApplicationSettingComponent implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  public files: NgxFileDropEntry[] = [];

  imageUrl: any ;

  ngOnInit() { }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file

          // ###################
          // file control jpeg png gif vs
          if (droppedFile.relativePath.match(/.(jpg|jpeg|png|gif)$/i)) {
            var reader = new FileReader();
            //var preview = document.querySelector('img');
            reader.addEventListener(
              'load',
              () => {
                this.imageUrl = reader.result;
              },
              false
            );
            reader.readAsDataURL(file);
            // ad class
            const getDropcozneClass = this.elRef.nativeElement.querySelector(
              '.satFat-dropZoneBody'
            );
            getDropcozneClass.classList.remove('imgBorderYes');
            getDropcozneClass.classList.add('imgBorderNone');
          } else {
            return;
          }
          // ###################

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event: any) {
    console.log('fileOver :', event);
  }

  public fileLeave(event: any) {
    console.log('fileLeave :', event);
  }

  fileRemove() {
    this.imageUrl = '';
    this.files.splice(0, 1);
    // ad class
    const getDropcozneClass = this.elRef.nativeElement.querySelector(
      '.satFat-dropZoneBody'
    );
    getDropcozneClass.classList.remove('imgBorderNone');
    getDropcozneClass.classList.add('imgBorderYes');
  }
}

