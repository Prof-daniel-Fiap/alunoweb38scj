import { Moment } from 'moment';
import { ITurma } from 'app/shared/model/turma.model';
import { TipoCurso } from 'app/shared/model/enumerations/tipo-curso.model';

export interface ICurso {
  id?: number;
  nomeCurso?: string;
  dataCriacao?: Moment;
  descricao?: any;
  logoCursoContentType?: string;
  logoCurso?: any;
  tipo?: TipoCurso;
  turma?: ITurma;
}

export class Curso implements ICurso {
  constructor(
    public id?: number,
    public nomeCurso?: string,
    public dataCriacao?: Moment,
    public descricao?: any,
    public logoCursoContentType?: string,
    public logoCurso?: any,
    public tipo?: TipoCurso,
    public turma?: ITurma
  ) {}
}
