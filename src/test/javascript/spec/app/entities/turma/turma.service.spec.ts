import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TurmaService } from 'app/entities/turma/turma.service';
import { ITurma, Turma } from 'app/shared/model/turma.model';

describe('Service Tests', () => {
  describe('Turma Service', () => {
    let injector: TestBed;
    let service: TurmaService;
    let httpMock: HttpTestingController;
    let elemDefault: ITurma;
    let expectedResult: ITurma | ITurma[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TurmaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Turma(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
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

      it('should create a Turma', () => {
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

        service.create(new Turma()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Turma', () => {
        const returnedFromService = Object.assign(
          {
            codigoTurma: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_FORMAT),
            unidade: 'BBBBBB',
            observacoes: 'BBBBBB',
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

      it('should return a list of Turma', () => {
        const returnedFromService = Object.assign(
          {
            codigoTurma: 'BBBBBB',
            dataCriacao: currentDate.format(DATE_FORMAT),
            unidade: 'BBBBBB',
            observacoes: 'BBBBBB',
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

      it('should delete a Turma', () => {
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
