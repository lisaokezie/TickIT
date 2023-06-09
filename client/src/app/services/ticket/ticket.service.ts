import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../api/ticket';
import { CategoryAssignment } from 'src/app/api/categoryAssignment';
import { User } from '../../api/user';
import { TicketMembership } from '../../api/ticketMembership';
import { UserWrapper } from '../../api/userWrapper';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  readonly baseURL = '/api/v1/ticket';

  constructor(private http: HttpClient) {}

  saveTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseURL, ticket);
  }
  getSelectedTicket(id: any): Observable<Ticket> {
    return this.http.get<Ticket>(this.baseURL + '/' + id);
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(this.baseURL + '/' + ticket.id, ticket);
  }

  updateTicketStatus(ticketId: number, statusId: number): Observable<Ticket> {
    return this.http.post<Ticket>(
      this.baseURL + '/' + ticketId + '/' + 'status' + '/' + statusId,
      {}
    );
  }

  deleteTicket(ticketId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/' + ticketId);
  }

  updateTicketMembership(
    ticketId: number,
    membership: TicketMembership
  ): Observable<User[]> {
    return this.http
      .put<UserWrapper>(this.baseURL + '/' + ticketId, membership)
      .pipe(map((wrapper: UserWrapper) => wrapper.users));
  }

  assignCategories(ticketId: number, categories: CategoryAssignment) {
    return this.http.put<Ticket>(
      `${this.baseURL}/${ticketId}/category`, categories
    );
  }
}
