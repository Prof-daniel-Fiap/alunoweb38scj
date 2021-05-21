import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ICurso, Curso } from 'app/shared/model/curso.model';
import { CursoService } from './curso.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ITurma } from 'app/shared/model/turma.model';
import { TurmaService } from 'app/entities/turma/turma.service';

@Component({
  selector: 'jhi-curso-update',
  templateUrl: './curso-update.component.html',
})
export class CursoUpdateComponent implements OnInit {
  isSaving = false;
  turmas: ITurma[] = [];
  dataCriacaoDp: any;

  editForm = this.fb.group({
    id: [],
    nomeCurso: [],
    dataCriacao: [],
    descricao: [],
    logoCurso: [],
    logoCursoContentType: [],
    tipo: [],
    turma: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected cursoService: CursoService,
    protected turmaService: TurmaService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ curso }) => {
      this.updateForm(curso);

      this.turmaService.query().subscribe((res: HttpResponse<ITurma[]>) => (this.turmas = res.body || []));
    });
  }

  updateForm(curso: ICurso): void {
    this.editForm.patchValue({
      id: curso.id,
      nomeCurso: curso.nomeCurso,
      dataCriacao: curso.dataCriacao,
      descricao: curso.descricao,
      logoCurso: curso.logoCurso,
      logoCursoContentType: curso.logoCursoContentType,
      tipo: curso.tipo,
      turma: curso.turma,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('alunoWebApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const curso = this.createFromForm();
    if (curso.id !== undefined) {
      this.subscribeToSaveResponse(this.cursoService.update(curso));
    } else {
      this.subscribeToSaveResponse(this.cursoService.create(curso));
    }
  }

  private createFromForm(): ICurso {
    return {
      ...new Curso(),
      id: this.editForm.get(['id'])!.value,
      nomeCurso: this.editForm.get(['nomeCurso'])!.value,
      dataCriacao: this.editForm.get(['dataCriacao'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      logoCursoContentType: this.editForm.get(['logoCursoContentType'])!.value,
      logoCurso: this.editForm.get(['logoCurso'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      turma: this.editForm.get(['turma'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICurso>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITurma): any {
    return item.id;
  }
}
