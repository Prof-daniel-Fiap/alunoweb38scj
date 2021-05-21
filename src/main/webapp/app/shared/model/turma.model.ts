import { Moment } from 'moment';
import { ICurso } from 'app/shared/model/curso.model';
import { IAluno } from 'app/shared/model/aluno.model';

export interface ITurma {
  id?: number;
  codigoTurma?: string;
  dataCriacao?: Moment;
  unidade?: string;
  observacoes?: any;
  cursos?: ICurso[];
  alunos?: IAluno[];
}

export class Turma implements ITurma {
  constructor(
    public id?: number,
    public codigoTurma?: string,
    public dataCriacao?: Moment,
    public unidade?: string,
    public observacoes?: any,
    public cursos?: ICurso[],
    public alunos?: IAluno[]
  ) {}
}
