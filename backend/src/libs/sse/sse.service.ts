import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SseService {
  private clients: Subject<any>[] = [];

  // Método para registrar um novo cliente SSE
  addClient(): Observable<any> {
    const subject = new Subject<any>();
    this.clients.push(subject);
    return subject.asObservable();
  }

  // Método para enviar eventos para todos os clientes SSE conectados
  sendEvent(event: any) {
    this.clients.forEach((subject) => subject.next(event));
  }
}
