package fr.creatyS4PY.repository;

import fr.creatyS4PY.model.Reaction;
import fr.creatyS4PY.model.Reaction.TypeReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    List<Reaction> findByCreationId(Long creationId);

    Long countByCreationIdAndType(Long creationId, TypeReaction type);
}