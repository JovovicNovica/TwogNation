import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {finalize, shareReplay} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService) {
  }

  apiURL: string = environment.apiURL;


  allTournaments(size: number, page: number): Observable<any> {
    let query = new HttpParams();
    query = query.append('size', size.toString());
    query = query.append('page', page.toString());
    const endPoint = this.apiURL + '/api/tournaments';

    return this.http.get<any>(endPoint, {params: query}).pipe(
      finalize(() => this.spinner.hide()),
      shareReplay(),
    );
  }

  // API PROBLEM, RESPONSE 404 !!
  deleteTournament(id: number): Observable<number> {
    const endPoint = this.apiURL + `/api/tournament/${id}`;
    return this.http.delete<any>(endPoint).pipe(
      shareReplay()
    );
  }
}
