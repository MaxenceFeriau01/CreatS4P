package fr.creatyS4PY.repository;

import fr.creatyS4PY.model.Creation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CreationRepository extends JpaRepository<Creation, Long> {

    List<Creation> findAllByOrderByDateCreationDesc();

    List<Creation> findByTypeCreationOrderByDateCreationDesc(String typeCreation);

    List<Creation> findByEstAnonymeOrderByDateCreationDesc(Boolean estAnonyme);

    /** Récupère uniquement les créations avec étapes/matériaux (mode complet) */
    List<Creation> findByEstActiviteTrueOrderByDateCreationDesc();
}