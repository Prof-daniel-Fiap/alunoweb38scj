import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AlunoWebTestModule } from '../../../test.module';
import { CursoDetailComponent } from 'app/entities/curso/curso-detail.component';
import { Curso } from 'app/shared/model/curso.model';

describe('Component Tests', () => {
  describe('Curso Management Detail Component', () => {
    let comp: CursoDetailComponent;
    let fixture: ComponentFixture<CursoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ curso: new Curso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AlunoWebTestModule],
        declarations: [CursoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CursoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CursoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load curso on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.curso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
