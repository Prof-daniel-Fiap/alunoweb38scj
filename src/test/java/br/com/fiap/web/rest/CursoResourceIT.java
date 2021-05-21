package br.com.fiap.web.rest;

import br.com.fiap.AlunoWebApp;
import br.com.fiap.domain.Curso;
import br.com.fiap.repository.CursoRepository;
import br.com.fiap.service.CursoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.fiap.domain.enumeration.TipoCurso;
/**
 * Integration tests for the {@link CursoResource} REST controller.
 */
@SpringBootTest(classes = AlunoWebApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CursoResourceIT {

    private static final String DEFAULT_NOME_CURSO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_CURSO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_CRIACAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_CRIACAO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO_CURSO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO_CURSO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CURSO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CURSO_CONTENT_TYPE = "image/png";

    private static final TipoCurso DEFAULT_TIPO = TipoCurso.MBA;
    private static final TipoCurso UPDATED_TIPO = TipoCurso.SHIFT;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private CursoService cursoService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCursoMockMvc;

    private Curso curso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Curso createEntity(EntityManager em) {
        Curso curso = new Curso()
            .nomeCurso(DEFAULT_NOME_CURSO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .descricao(DEFAULT_DESCRICAO)
            .logoCurso(DEFAULT_LOGO_CURSO)
            .logoCursoContentType(DEFAULT_LOGO_CURSO_CONTENT_TYPE)
            .tipo(DEFAULT_TIPO);
        return curso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Curso createUpdatedEntity(EntityManager em) {
        Curso curso = new Curso()
            .nomeCurso(UPDATED_NOME_CURSO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .logoCurso(UPDATED_LOGO_CURSO)
            .logoCursoContentType(UPDATED_LOGO_CURSO_CONTENT_TYPE)
            .tipo(UPDATED_TIPO);
        return curso;
    }

    @BeforeEach
    public void initTest() {
        curso = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurso() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();
        // Create the Curso
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isCreated());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate + 1);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getNomeCurso()).isEqualTo(DEFAULT_NOME_CURSO);
        assertThat(testCurso.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testCurso.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testCurso.getLogoCurso()).isEqualTo(DEFAULT_LOGO_CURSO);
        assertThat(testCurso.getLogoCursoContentType()).isEqualTo(DEFAULT_LOGO_CURSO_CONTENT_TYPE);
        assertThat(testCurso.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createCursoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();

        // Create the Curso with an existing ID
        curso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isBadRequest());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCursos() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get all the cursoList
        restCursoMockMvc.perform(get("/api/cursos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(curso.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeCurso").value(hasItem(DEFAULT_NOME_CURSO)))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].logoCursoContentType").value(hasItem(DEFAULT_LOGO_CURSO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logoCurso").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO_CURSO))))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }
    
    @Test
    @Transactional
    public void getCurso() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", curso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(curso.getId().intValue()))
            .andExpect(jsonPath("$.nomeCurso").value(DEFAULT_NOME_CURSO))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.logoCursoContentType").value(DEFAULT_LOGO_CURSO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logoCurso").value(Base64Utils.encodeToString(DEFAULT_LOGO_CURSO)))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCurso() throws Exception {
        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurso() throws Exception {
        // Initialize the database
        cursoService.save(curso);

        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // Update the curso
        Curso updatedCurso = cursoRepository.findById(curso.getId()).get();
        // Disconnect from session so that the updates on updatedCurso are not directly saved in db
        em.detach(updatedCurso);
        updatedCurso
            .nomeCurso(UPDATED_NOME_CURSO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .descricao(UPDATED_DESCRICAO)
            .logoCurso(UPDATED_LOGO_CURSO)
            .logoCursoContentType(UPDATED_LOGO_CURSO_CONTENT_TYPE)
            .tipo(UPDATED_TIPO);

        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCurso)))
            .andExpect(status().isOk());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getNomeCurso()).isEqualTo(UPDATED_NOME_CURSO);
        assertThat(testCurso.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testCurso.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testCurso.getLogoCurso()).isEqualTo(UPDATED_LOGO_CURSO);
        assertThat(testCurso.getLogoCursoContentType()).isEqualTo(UPDATED_LOGO_CURSO_CONTENT_TYPE);
        assertThat(testCurso.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingCurso() throws Exception {
        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isBadRequest());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCurso() throws Exception {
        // Initialize the database
        cursoService.save(curso);

        int databaseSizeBeforeDelete = cursoRepository.findAll().size();

        // Delete the curso
        restCursoMockMvc.perform(delete("/api/cursos/{id}", curso.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
