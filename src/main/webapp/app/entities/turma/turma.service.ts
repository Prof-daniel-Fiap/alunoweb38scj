import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITurma } from 'app/shared/model/turma.model';

type EntityResponseType = HttpResponse<ITurma>;
type EntityArrayResponseType = HttpResponse<ITurma[]>;

@Injectable({ providedIn: 'root' })
export class TurmaService {
  public resourceUrl = SERVER_API_URL + 'api/turmas';

  constructor(protected http: HttpClient) {}

  create(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .post<ITurma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(turma: ITurma): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(turma);
    return this.http
      .put<ITurma>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITurma>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITurma[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(turma: ITurma): ITurma {
    const copy: ITurma = Object.assign({}, turma, {
      dataCriacao: turma.dataCriacao && turma.dataCriacao.isValid() ? turma.dataCriacao.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataCriacao = res.body.dataCriacao ? moment(res.body.dataCriacao) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((turma: ITurma) => {
        turma.dataCriacao = turma.dataCriacao ? moment(turma.dataCriacao) : undefined;
      });
    }
    return res;
  }
}
