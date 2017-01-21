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
  @Output() onEditorChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: 500,
      width: 980,
      file_picker_types: 'file image media',
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table contextmenu paste imagetools",
        'emoticons template textcolor colorpicker textpattern'
      ],
      toolbar1: "insertfile undo redo | sizeselect | bold italic | fontselect |  fontsizeselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
      fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
      toolbar2: 'print preview media | forecolor backcolor emoticons',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      skin_url: '../../assets/skins/custom', 
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
        editor.on('change', () => {
          const content = editor.getContent();
          this.onEditorChange.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
    
}