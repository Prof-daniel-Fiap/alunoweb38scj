import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'aluno',
        loadChildren: () => import('./aluno/aluno.module').then(m => m.AlunoWebAlunoModule),
      },
      {
        path: 'curso',
        loadChildren: () => import('./curso/curso.module').then(m => m.AlunoWebCursoModule),
      },
      {
        path: 'turma',
        loadChildren: () => import('./turma/turma.module').then(m => m.AlunoWebTurmaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AlunoWebEntityModule {}
