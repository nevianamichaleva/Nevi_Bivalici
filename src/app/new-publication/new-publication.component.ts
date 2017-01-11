import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';


@Component({
  selector: 'text-editor',
  templateUrl: './new-publication.component.html',
  styleUrls: ['./new-publication.component.css']
})
export class NewPublicationComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: 500,
      width: 900,
      file_picker_types: 'file image media',
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools"
      ],
      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}