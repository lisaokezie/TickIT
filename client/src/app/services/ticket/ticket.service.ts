import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../api/ticket';
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

  deleteTicket(ticket: Ticket): Observable<boolean> {
    return this.http.delete<boolean>(this.baseURL + '/' + ticket.id);
  }
}