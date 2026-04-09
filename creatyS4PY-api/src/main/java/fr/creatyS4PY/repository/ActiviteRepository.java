package fr.creatyS4PY.repository;

import fr.creatyS4PY.model.Activite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActiviteRepository extends JpaRepository<Activite, Long> {

    @Query("SELECT a FROM Activite a WHERE :age MEMBER OF a.ages")
    List<Activite> findByAge(@Param("age") String age);

    @Query("SELECT DISTINCT a FROM Activite a JOIN a.gouts g WHERE g IN :gouts")
    List<Activite> findByGouts(@Param("gouts") List<String> gouts);

    List<Activite> findByDifficulte(Activite.Difficulte difficulte);
}