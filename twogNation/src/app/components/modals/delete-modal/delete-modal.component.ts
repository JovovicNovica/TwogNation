import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../../../../shared/services/api-service.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    // PROBLEM U APIJU, RES VRACA 404 !!!

    // this.apiService.deleteTournament(this.data.id).subscribe(
    //   res => this.dialogRef.close(res)
    // );

    this.dialogRef.close(this.data.id);
  }

  back(): void {
    this.dialogRef.close();
  }
}
