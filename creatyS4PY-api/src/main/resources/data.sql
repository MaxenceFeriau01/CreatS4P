INSERT INTO activites (titre, description, icone, couleur, duree_minutes, difficulte, fiche_pro) VALUES
('Bracelet en perles', 'Enfiler des perles colorées sur un fil élastique. Simple, beau, offrable.', '📿', '#FBEAF0', 60, 'FACILE', true),
('Collier perles bois', 'Perles en bois naturel et fil ciré. Activité sensorielle et créative.', '💎', '#FAEEDA', 90, 'FACILE', true),
('Collage nature', 'Magazines, fleurs séchées et carton. Laisser aller son imagination.', '🌸', '#FAEEDA', 60, 'FACILE', true),
('Bougeoir en argile', 'Malaxer, modeler, laisser sécher puis peindre. Très sensoriel et relaxant.', '🕯️', '#EEEDFE', 120, 'FACILE', true),
('Jardinière bois', 'Caisse à plantes avec drainage. Construire et jardiner en même temps.', '🪴', '#EAF3DE', 90, 'MOYEN', true),
('Banc simple en bois', 'Planches et vis, aucun outil électrique. Grande fierté à la fin !', '🪑', '#E1F5EE', 180, 'MOYEN', true),
('Cadre photo décoré', 'Baguettes bois peintes et décorées. Parfait pour offrir à sa famille.', '🖼️', '#FAECE7', 60, 'FACILE', true),
('Porte-manteau', 'Un pied bois avec crochets. On peut le peindre comme on veut.', '🧥', '#E6F1FB', 120, 'MOYEN', true),
('Vase en récup', 'Un bocal, de la ficelle et de la peinture. Zéro déchet, 100% créatif.', '♻️', '#EAF3DE', 60, 'FACILE', true);

INSERT INTO activite_ages (activite_id, ages) VALUES
(1,'enfant'),(1,'ado'),(1,'adulte'),
(2,'ado'),(2,'adulte'),
(3,'enfant'),(3,'ado'),(3,'adulte'),
(4,'enfant'),(4,'ado'),(4,'adulte'),
(5,'ado'),(5,'adulte'),
(6,'ado'),(6,'adulte'),
(7,'enfant'),(7,'ado'),(7,'adulte'),
(8,'ado'),(8,'adulte'),
(9,'enfant'),(9,'ado'),(9,'adulte');

INSERT INTO activite_gouts (activite_id, gouts) VALUES
(1,'bijoux'),(1,'offrir'),
(2,'bijoux'),(2,'nature'),(2,'offrir'),
(3,'creer'),(3,'couleurs'),(3,'nature'),(3,'recup'),
(4,'calme'),(4,'couleurs'),(4,'creer'),
(5,'construire'),(5,'nature'),
(6,'construire'),(6,'creer'),
(7,'couleurs'),(7,'offrir'),(7,'creer'),
(8,'construire'),(8,'couleurs'),
(9,'recup'),(9,'couleurs'),(9,'creer'),(9,'offrir');

INSERT INTO activite_motric (activite_id, motric) VALUES
(1,'fine'),(1,'aide'),
(2,'fine'),(2,'aide'),
(3,'large'),(3,'fine'),(3,'aide'),
(4,'large'),(4,'aide'),
(5,'large'),(5,'aide'),
(6,'large'),(6,'aide'),
(7,'fine'),(7,'large'),(7,'aide'),
(8,'large'),(8,'aide'),
(9,'large'),(9,'fine');

INSERT INTO activite_tags (activite_id, tags) VALUES
(1,'Bijou'),(1,'Perles'),(1,'Offrir'),
(2,'Bijou'),(2,'Nature'),
(3,'Collage'),(3,'Couleurs'),
(4,'Argile'),(4,'Calme'),
(5,'Bois'),(5,'Nature'),
(6,'Bois'),(6,'Construction'),
(7,'Peinture'),(7,'Offrir'),
(8,'Bois'),(8,'Déco'),
(9,'Récup'),(9,'Couleurs');