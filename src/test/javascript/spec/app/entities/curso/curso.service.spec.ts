import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { CursoService } from 'app/entities/curso/curso.service';
import { ICurso, Curso } from 'app/shared/model/curso.model';
import { TipoCurso } from 'app/shared/model/enumerations/tipo-curso.model';

describe('Service Tests', () => {
  describe('Curso Service', () => {
    let injector: TestBed;
    let service: CursoService;
    let httpMock: HttpTestingController;
    let elemDefault: ICurso;
    let expectedResult: ICurso | ICurso[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CursoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Curso(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'image/png', 'AAAAAAA', TipoCurso.MBA);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataCriacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Curso', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataCriacao: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriacao: currentDate,
          },
          returnedFromService
        );

        service.create(new Curso()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Curso', () => {
        const returnedFromService = Object.assign(
          {
            nomeCurso: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
            logoCurso: 'BBBBBB',
            tipo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriacao: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Curso', () => {
        const returnedFromService = Object.assign(
          {
            nomeCurso: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
            logoCurso: 'BBBBBB',
            tipo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataCriacao: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Curso', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
