import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICurso } from 'app/shared/model/curso.model';

type EntityResponseType = HttpResponse<ICurso>;
type EntityArrayResponseType = HttpResponse<ICurso[]>;

@Injectable({ providedIn: 'root' })
export class CursoService {
  public resourceUrl = SERVER_API_URL + 'api/cursos';

  constructor(protected http: HttpClient) {}

  create(curso: ICurso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .post<ICurso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(curso: ICurso): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(curso);
    return this.http
      .put<ICurso>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICurso>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICurso[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(curso: ICurso): ICurso {
    const copy: ICurso = Object.assign({}, curso, {
      dataCriacao: curso.dataCriacao && curso.dataCriacao.isValid() ? curso.dataCriacao.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((curso: ICurso) => {
        curso.dataCriacao = curso.dataCriacao ? moment(curso.dataCriacao) : undefined;
      });
    }
    return res;
  }
}
