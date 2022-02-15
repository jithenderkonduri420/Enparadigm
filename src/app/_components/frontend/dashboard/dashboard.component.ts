import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../_service/api.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "frontend-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class FrontEndDashboardComponent implements OnInit {
  public questionnairesList: any;
  surveyDetails: any = {
    questionnaires: {}
  };
  submitted = false;
  BlockIndexList: any;
  currentIndex: any = 0;
  loading = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getQuizQuestions();
  }
  getQuizQuestions() {
    this.apiService.readAll('questionnaire').subscribe(res => {
      this.questionnairesList = res.questionnaires;
    })
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }
  closeModal() {
    this.modalService.dismissAll();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  selectedOption(index: any, option: any, value: any) {
    this.questionnairesList[index]['selectedOption'] = option;
    this.questionnairesList[index]['selectedvalue'] = value;
    console.log(index);
  }
  changeList(event: any, index: number): any {
    const option = this.questionnairesList[this.currentIndex]['selectedOption'];
    if(!option) { 
      alert('Please select at least one answer'); 
      return false; 
    }
    if (index)
      this.currentIndex++
    else
      this.currentIndex--
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.surveyDetails['questionnaires'] = this.questionnairesList;
    localStorage.setItem('surveyDetails', JSON.stringify(this.surveyDetails));
    this.modalService.dismissAll();
    this.router.navigate(["/results"]);
  }
}
