import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper-serivce.service';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {DeleteModalComponent} from '../modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-tournaments-card',
  templateUrl: './tournaments-card.component.html',
  styleUrls: ['./tournaments-card.component.scss']
})
export class TournamentsCardComponent implements OnInit {
  tournaments: any;
  private unsubscribe$: Subject<void> = new Subject();


  constructor(private helperService: HelperService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Get tournaments from API GET
    this.helperService.tournaments$.pipe(
      map((t => this.tournaments = t)),
      takeUntil(this.unsubscribe$)).subscribe();
  }


  openDeleteModal(tournament: any): void {
    const deleteModal = this.dialog.open(DeleteModalComponent, {
      disableClose: true,
      width: '290px',
      height: '160px',
      panelClass: 'defaultDialog',
      position: {
        top: '100px',
      },
      data: {
        id: tournament.id,
      },
    });
    deleteModal.afterClosed().subscribe(res => {
      if (res && res > 0) {
        this.helperService.delete.next(res);
      }
    });

  }
}
