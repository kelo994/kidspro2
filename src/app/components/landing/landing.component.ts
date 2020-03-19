import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface DialogData {
  video: '1' | '2' | '3';
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  viewLoginMob = false;
  isActive = 'true';
  
  constructor(public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
    // $('html, body').animate({
    //   scrollTop: 0
    // }, 2000);
  }

  click(idx) {
    if(localStorage.getItem('pageUs') == 'true') {
      window.location.href = "home";
    } else {
      $('html, body').animate({
        scrollTop: $("#" + idx).offset().top
      }, 2000);
    }    
  }

  openDialog(idx): void {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      width: '800px',
      data: {video: '' + idx}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  back() {
    this.router.navigate(['/home']);
  }

  setActive(item) {
    this.isActive = item;
  }

  toggleMenu() {
    $('.navTrigger').toggleClass('active');
    // console.log("Clicked menu");
    // $("#mainListDiv").toggleClass("show_list");
    // $("#mainListDiv").fadeIn();

    $('#sidebarMenu').toggleClass('toggleSideBar');

    // $(".topNav").css({'margin-bottom': '10px'});
  }

  scroll(id) {
    console.log(`scrolling to ${id}`);
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

}


@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog.video.html',
})
export class DialogDataExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogDataExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}