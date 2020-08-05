import { Component, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  closeResult = '';
  description: string;
  title: string;
  model: NgbDateStruct;

  // Declare and initializing the array
  backlogs = [
  	{
  		task: "Task-101",
  		description: "Description of backlogs Task-101",
  		date: '08-10-2020'
  	}
  ]

  development = [
   {
  		task: "Task-201",
  		description: "Description of development Task-201",
  		date: '10-10-2020'
  	}
  ];

  codereview = [
  	{
  		task: "Task-301",
  		description: "Description of Code Review Task-301",
  		date: '07-10-2020'
  	}
  ];

  acceptance = [
 	{
  		task: "Task-401",
  		description: "Task-401 Accepted",
  		date: '06-10-2020'
  	}
  ]

 
  constructor(private modalService: NgbModal, private calendar: NgbCalendar, private config: NgbDatepickerConfig) {
  	  // Below code is used to disable past date in datepicker
  	  const current = new Date();
	  config.minDate = { year: current.getFullYear(), month: 
	  current.getMonth() + 1, day: current.getDate() };
	    //config.maxDate = { year: 2099, month: 12, day: 31 };
	  config.outsideDays = 'hidden';
  }
 
  // Function used to open the modal popup
  open(content) {
  	this.title = '';
  	this.description='';
 	 this.model = this.calendar.getToday();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Function is used to close the modal popup
  close(){
  	let obj = {
  		task: '',
  		description: '',
  		date: ''
  	};
  	if(this.backlogs.length < 5){
  		obj.task = this.title;
  		obj.description = this.description
  		obj.date = this.model.day + '-' + this.model.month + '-' +this.model.year
  		this.backlogs.push(obj)
  	}
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Function is used for Drag and Drop operation
  drop(event: CdkDragDrop<string[]>) {
     if(event.container.id == 'cdk-drop-list-0' && this.backlogs.length >=5  ){
     	return true;
     } else if(event.container.id == 'cdk-drop-list-1' && this.development.length >=4){
     	return true;
     }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
 }
}
