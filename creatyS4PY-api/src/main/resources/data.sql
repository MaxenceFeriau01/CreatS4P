-- Nettoyage
DELETE FROM activite_etapes;
DELETE FROM activite_materiaux;
DELETE FROM activite_tags;
DELETE FROM activite_gouts;
DELETE FROM activite_motric;
DELETE FROM activite_ages;
DELETE FROM activites;

-- Activités
INSERT INTO activites (id, titre, description, icone, couleur, duree_minutes, difficulte, fiche_pro, conseil_accompagnant, nombre_participants) VALUES
(1, 'Bracelet en perles',
'Enfiler des perles colorées sur un fil élastique. Simple, beau, offrable.',
'📿', '#FBEAF0', 60, 'FACILE', true,
'Prépare les perles dans un plateau pour éviter qu''elles roulent. Aide le jeune à nouer le fil au départ. Laisse-le choisir ses couleurs librement — c''est là que la créativité s''exprime.',
'1 à 3 personnes'),

(2, 'Collier perles bois',
'Perles en bois naturel et fil ciré. Activité sensorielle et créative.',
'💎', '#FAEEDA', 90, 'FACILE', true,
'Les perles en bois sont plus faciles à manipuler que les petites perles plastiques. Idéal pour travailler la motricité fine en douceur. Propose des modèles de couleurs pour inspirer.',
'1 à 4 personnes'),

(3, 'Collage nature',
'Magazines découpés et fleurs séchées sur carton. Laisser aller son imagination.',
'🌸', '#FAEEDA', 60, 'FACILE', true,
'Prépare les magazines découpés à l''avance si les ciseaux sont difficiles à utiliser. Pas de règles — chaque collage est unique. Encourage le jeune à raconter ce qu''il a créé.',
'1 à 6 personnes'),

(4, 'Bougeoir en argile',
'Malaxer, modeler, laisser sécher puis peindre. Très sensoriel et relaxant.',
'🕯️', '#EEEDFE', 120, 'FACILE', true,
'L''argile est très apaisante pour les jeunes avec des besoins sensoriels. Prévoir une séance de séchage (24h) avant la peinture. Protéger la table avec une toile cirée.',
'1 à 4 personnes'),

(5, 'Jardinière bois',
'Caisse à plantes avec drainage. Construire et jardiner en même temps.',
'🪴', '#EAF3DE', 90, 'MOYEN', true,
'Prévisser les trous à l''avance pour faciliter l''assemblage. Le jeune peut se concentrer sur l''assemblage et la décoration. Prévoir des gants si besoin.',
'1 à 3 personnes'),

(6, 'Banc simple en bois',
'Planches et vis, aucun outil électrique. Grande fierté à la fin !',
'🪑', '#E1F5EE', 180, 'MOYEN', true,
'Activité idéale en binôme jeune/accompagnant. Prévisser tous les trous à l''avance. Le jeune peut visser, poncer et peindre de façon autonome. Valoriser chaque étape accomplie.',
'2 à 4 personnes'),

(7, 'Cadre photo décoré',
'Baguettes bois peintes et décorées. Parfait pour offrir à sa famille.',
'🖼️', '#FAECE7', 60, 'FACILE', true,
'Prévoir une photo significative pour le jeune à insérer dans le cadre terminé. La décoration est totalement libre — peinture, stickers, feutrine. Activité très valorisante car le résultat est concret et offrable.',
'1 à 4 personnes'),

(8, 'Porte-manteau',
'Un pied bois avec crochets. On peut le peindre comme on veut.',
'🧥', '#E6F1FB', 120, 'MOYEN', true,
'Utiliser des crochets à visser à la main pour éviter le marteau. Le jeune peut peindre le pied avant d''installer les crochets. Activité utile — le jeune voit son objet utilisé au quotidien.',
'1 à 3 personnes'),

(9, 'Vase en récup',
'Un bocal, de la ficelle et de la peinture. Zéro déchet, 100% créatif.',
'♻️', '#EAF3DE', 60, 'FACILE', true,
'Parfait pour sensibiliser au recyclage. Prévoir plusieurs bocaux de tailles différentes. La colle peut être appliquée par l''accompagnant si besoin. Résultat utilisable comme vase ou pot à crayons.',
'1 à 6 personnes');

-- Matériaux
INSERT INTO activite_materiaux (activite_id, materiau) VALUES
(1,'Fil élastique transparent'),(1,'Perles colorées (grosses)'),(1,'Ciseaux'),(1,'Plateau pour les perles'),
(2,'Perles en bois naturel'),(2,'Fil ciré épais'),(2,'Ciseaux'),(2,'Peinture acrylique (optionnel)'),
(3,'Carton épais'),(3,'Magazines ou journaux'),(3,'Colle blanche'),(3,'Ciseaux'),(3,'Fleurs séchées (optionnel)'),
(4,'Argile autodurcissante'),(4,'Toile de protection'),(4,'Peinture acrylique'),(4,'Vernis (optionnel)'),(4,'Bougie chauffe-plat'),
(5,'3 planches de bois (30x10cm)'),(5,'Vis à bois'),(5,'Tournevis'),(5,'Peinture extérieure'),(5,'Perceuse (adulte uniquement)'),
(6,'2 planches de bois (100x20cm)'),(6,'4 pieds carrés (40cm)'),(6,'Vis à bois'),(6,'Tournevis'),(6,'Papier de verre'),(6,'Peinture ou vernis'),
(7,'Cadre en bois brut'),(7,'Peinture acrylique'),(7,'Pinceaux'),(7,'Stickers ou feutrine'),(7,'Colle'),(7,'Photo format cadre'),
(8,'Bâton de bois (80cm)'),(8,'3 crochets à visser'),(8,'Peinture acrylique'),(8,'Pinceau'),(8,'Papier de verre'),
(9,'Bocal en verre récupéré'),(9,'Ficelle ou raphia'),(9,'Colle forte'),(9,'Peinture pour verre'),(9,'Ruban décoratif');

-- Étapes
INSERT INTO activite_etapes (activite_id, etape, etape_ordre) VALUES
(1,'Choisis tes couleurs de perles préférées et mets-les dans le plateau.',0),
(1,'Coupe un morceau de fil élastique de 25 cm environ.',1),
(1,'Fais un nœud à un bout du fil pour que les perles ne tombent pas.',2),
(1,'Enfile les perles une par une dans l''ordre que tu veux.',3),
(1,'Quand le bracelet fait le tour de ton poignet, arrête-toi.',4),
(1,'Fais un nœud solide et coupe le fil en trop. Bravo !',5),

(2,'Choisis tes perles en bois et dispose-les dans l''ordre que tu veux.',0),
(2,'Coupe 60 cm de fil ciré.',1),
(2,'Fais un gros nœud à un bout pour bloquer la première perle.',2),
(2,'Enfile les perles une à une en suivant ton idée.',3),
(2,'Laisse 5 cm de fil libre à la fin pour faire le fermoir.',4),
(2,'Noue les deux bouts ensemble solidement. Ton collier est prêt !',5),

(3,'Découpe ou déchire des images dans les magazines — tout ce qui te plaît.',0),
(3,'Dispose les images sur le carton sans coller pour voir le résultat.',1),
(3,'Quand tu es content(e) de la disposition, commence à coller.',2),
(3,'Applique la colle sur le carton puis pose chaque image.',3),
(3,'Ajoute des fleurs séchées ou des détails décoratifs si tu veux.',4),
(3,'Laisse sécher 30 minutes. Tu peux signer ton œuvre !',5),

(4,'Malaxe l''argile avec tes mains pour la ramollir — c''est la partie fun !',0),
(4,'Forme une boule puis creuse le centre avec ton pouce.',1),
(4,'Agrandis le trou en tournant l''argile dans tes mains.',2),
(4,'Donne la forme que tu veux — rond, carré, avec des décors...',3),
(4,'Laisse sécher 24 heures à l''air libre.',4),
(4,'Peins ton bougeoir avec les couleurs que tu aimes. Laisse sécher.',5),
(4,'Place une bougie chauffe-plat à l''intérieur. C''est prêt !',6),

(5,'Ponce légèrement les planches pour enlever les échardes.',0),
(5,'Peins les planches si tu veux les décorer avant l''assemblage.',1),
(5,'Place les 3 planches en U : une au fond et deux sur les côtés.',2),
(5,'Visse les côtés sur la planche du fond (les trous sont déjà faits).',3),
(5,'Perce des petits trous au fond pour l''écoulement de l''eau.',4),
(5,'Remplis de terreau et plante ce que tu veux. C''est ta jardinière !',5),

(6,'Ponce les planches et les pieds pour les lisser.',0),
(6,'Place les deux grandes planches côte à côte — c''est le siège.',1),
(6,'Positionne les pieds sous le siège aux quatre coins.',2),
(6,'Visse chaque pied solidement (les trous sont pré-percés).',3),
(6,'Teste la solidité en appuyant sur le siège.',4),
(6,'Ponce à nouveau si besoin puis peins ou vernis comme tu veux.',5),
(6,'Laisse sécher et installe ton banc où tu veux. Quelle fierté !',6),

(7,'Ponce légèrement le cadre pour bien accrocher la peinture.',0),
(7,'Peins le cadre avec ta couleur préférée. Laisse sécher.',1),
(7,'Ajoute une deuxième couche si tu veux une couleur plus intense.',2),
(7,'Décore avec des stickers, de la feutrine ou des dessins au feutre.',3),
(7,'Insère ta photo dans le cadre.',4),
(7,'Offre-le à quelqu''un que tu aimes ou garde-le pour toi !',5),

(8,'Ponce le bâton de bois pour enlever les échardes.',0),
(8,'Peins le bâton avec tes couleurs. Laisse sécher complètement.',1),
(8,'Marque 3 emplacements réguliers pour les crochets avec un crayon.',2),
(8,'Visse les crochets à la main sur les marques.',3),
(8,'Fixe le porte-manteau au mur ou pose-le dans un coin.',4),
(8,'Accroche tes affaires dessus. Tu l''as fabriqué toi-même !',5),

(9,'Nettoie bien le bocal et laisse-le sécher.',0),
(9,'Peins le bocal avec de la peinture pour verre si tu veux.',1),
(9,'Laisse sécher la peinture 30 minutes.',2),
(9,'Enroule la ficelle ou le raphia autour du bocal avec de la colle.',3),
(9,'Ajoute des décorations : ruban, coquillages, boutons...',4),
(9,'Laisse sécher et utilise ton vase ou pot à crayons !',5);

-- Ages, goûts, motricité, tags (sans doublons)
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