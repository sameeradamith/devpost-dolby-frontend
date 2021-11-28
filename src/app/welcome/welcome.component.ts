import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MainService } from '../services/main.service';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild(TemplateRef, { static: false }) tpl: TemplateRef<any>;

  constructor(private router: Router, 
    public mainService: MainService,
    public ngxSmartModalService: NgxSmartModalService) {}

  runForm: FormGroup;

  isVideo:boolean = true;
  isScreen:boolean = true;
  isRecording:boolean = true;

  ngOnInit() {
    this.runForm = new FormGroup({
      app_name: new FormControl(''),
      clientId_value: new FormControl(''),
      client_secret: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log(form.value);

    form.value.is_video = this.isVideo
    form.value.is_screen = this.isScreen
    form.value.is_recording = this.isRecording

    console.log(form.value);
    this.mainService.run(form.value).subscribe(data => {

      this.ngxSmartModalService.create('successModal', this.tpl).open();

      const blob = new Blob([data], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.location.assign(url);

    })
  }


  updateIsVideo(event) {
    console.log(event.target)
    if(event == true || event == false ) {
      this.isVideo = event;
    }

  }


  updateScreenShare(event) {
    if(event == true || event == false ) {
      this.isScreen = event;
    }
  }

  updateRecording(event) {
    console.log(event)
    if(event == true || event == false ) {
      this.isRecording = event;
    }
  }


}
