import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth-service.service';
import {Observable, Subject} from 'rxjs';
import {finalize, map, takeUntil, tap} from 'rxjs/operators';
import {ApiService} from '../../../shared/services/api-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {HelperService} from '../../../shared/services/helper-serivce.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  user$: Observable<any>;
  tournaments: any;
  user: any;
  size = 10;
  page = 0;
  loading = true;
  emptyArray = false;

  constructor(public authService: AuthService,
              public apiService: ApiService,
              private spinner: NgxSpinnerService,
              private helperService: HelperService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // Start spinner
    if (this.loading) {
      this.spinner.show();
    }

    this.user$ = this.authService.getUser();
    this.user$.pipe(
      tap(((user: any) => this.user = user)),
      takeUntil(this.unsubscribe$),
    ).subscribe();

    this.apiService.allTournaments(this.size, this.page).pipe(
      map((tournaments: any) => this.tournaments = tournaments),
      finalize(() => {
        this.loading = false;
        this.spinner.hide();
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe(val => {
      if (val.length === 0) {
        this.emptyArray = true;
      }
      this.helperService.tournaments.next(this.tournaments);
    });

    // Delete tournament from the list
    this.helperService.delete$.pipe(
      map(((del: number) => {
        const deleteIndex = this.tournaments.findIndex((t: { id: number }) => t.id === del);
        if (deleteIndex !== -1) {
          this.tournaments.splice(deleteIndex, 1);
          const message = 'The tournament has been deleted!';
          this.snackBar.open(message,
            'OK',
            {
              duration: 3000,
            }
          );
        }
      })),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.tournaments.length === 0) {
        this.emptyArray = true;
      }
    });
  }

  // New page of tournament list
  onScrollDown(): void {
    this.page++;
    this.apiService.allTournaments(this.size, this.page).pipe(
      map(((tournaments: any) => {
        tournaments.forEach((tournament: any) =>
          this.tournaments.push(tournament));
      }))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
