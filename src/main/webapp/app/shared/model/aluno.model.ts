import { Moment } from 'moment';
import { ITurma } from 'app/shared/model/turma.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IAluno {
  id?: number;
  nome?: string;
  email?: string;
  dataNascimento?: Moment;
  rm?: number;
  fotoContentType?: string;
  foto?: any;
  status?: Status;
  turmas?: ITurma[];
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public dataNascimento?: Moment,
    public rm?: number,
    public fotoContentType?: string,
    public foto?: any,
    public status?: Status,
    public turmas?: ITurma[]
  ) {}
}
