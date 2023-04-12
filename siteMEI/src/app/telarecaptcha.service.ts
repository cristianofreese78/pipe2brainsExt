import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelarecaptchaService {

  private url = environment.urlConsultaCpf;

  constructor(private http: HttpClient) { }

  public retornaDadosCPF(cpf: string): Observable<any> {
    return this.http.get(`${this.url}/${cpf}`);
  }
}