import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { AlunoWebTestModule } from '../../../test.module';
import { AlunoDetailComponent } from 'app/entities/aluno/aluno-detail.component';
import { Aluno } from 'app/shared/model/aluno.model';

describe('Component Tests', () => {
  describe('Aluno Management Detail Component', () => {
    let comp: AlunoDetailComponent;
    let fixture: ComponentFixture<AlunoDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ aluno: new Aluno(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AlunoWebTestModule],
        declarations: [AlunoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AlunoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlunoDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load aluno on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aluno).toEqual(jasmine.objectContaining({ id: 123 }));
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
