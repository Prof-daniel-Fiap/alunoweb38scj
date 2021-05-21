package br.com.fiap.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Turma.
 */
@Entity
@Table(name = "turma")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Turma implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo_turma")
    private String codigoTurma;

    @Column(name = "data_criacao")
    private LocalDate dataCriacao;

    @Column(name = "unidade")
    private String unidade;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "observacoes")
    private String observacoes;

    @OneToMany(mappedBy = "turma")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Curso> cursos = new HashSet<>();

    @ManyToMany(mappedBy = "turmas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Aluno> alunos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoTurma() {
        return codigoTurma;
    }

    public Turma codigoTurma(String codigoTurma) {
        this.codigoTurma = codigoTurma;
        return this;
    }

    public void setCodigoTurma(String codigoTurma) {
        this.codigoTurma = codigoTurma;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public Turma dataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
        return this;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getUnidade() {
        return unidade;
    }

    public Turma unidade(String unidade) {
        this.unidade = unidade;
        return this;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public Turma observacoes(String observacoes) {
        this.observacoes = observacoes;
        return this;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public Turma cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    public Turma addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.setTurma(this);
        return this;
    }

    public Turma removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.setTurma(null);
        return this;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }

    public Set<Aluno> getAlunos() {
        return alunos;
    }

    public Turma alunos(Set<Aluno> alunos) {
        this.alunos = alunos;
        return this;
    }

    public Turma addAluno(Aluno aluno) {
        this.alunos.add(aluno);
        aluno.getTurmas().add(this);
        return this;
    }

    public Turma removeAluno(Aluno aluno) {
        this.alunos.remove(aluno);
        aluno.getTurmas().remove(this);
        return this;
    }

    public void setAlunos(Set<Aluno> alunos) {
        this.alunos = alunos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Turma)) {
            return false;
        }
        return id != null && id.equals(((Turma) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Turma{" +
            "id=" + getId() +
            ", codigoTurma='" + getCodigoTurma() + "'" +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", unidade='" + getUnidade() + "'" +
            ", observacoes='" + getObservacoes() + "'" +
            "}";
    }
}
