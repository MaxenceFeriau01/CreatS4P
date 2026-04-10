-- ============================================================
-- NETTOYAGE
-- ============================================================
DELETE FROM activite_etapes;
DELETE FROM activite_materiaux;
DELETE FROM activite_tags;
DELETE FROM activite_gouts;
DELETE FROM activite_motric;
DELETE FROM activite_ages;
DELETE FROM activites;

-- ============================================================
-- ACTIVITÉS (65 au total)
-- IDs 1–9   : activités d'origine
-- IDs 10–55 : nouvelles activités créatives (handicap)
-- IDs 56–65 : activités informatique / numérique
-- ============================================================

INSERT INTO activites (id, titre, description, icone, couleur, duree_minutes, difficulte, fiche_pro, conseil_accompagnant, nombre_participants) VALUES

-- ── ACTIVITÉS D'ORIGINE ────────────────────────────────────
(1, 'Bracelet en perles', 'Enfiler des perles colorées sur un fil élastique. Simple, beau, offrable.', '📿', '#FBEAF0', 60, 'FACILE', true, 'Prépare les perles dans un plateau pour éviter qu''elles roulent. Aide le jeune à nouer le fil au départ. Laisse-le choisir ses couleurs librement.', '1 à 3 personnes'),
(2, 'Collier perles bois', 'Perles en bois naturel et fil ciré. Activité sensorielle et créative.', '💎', '#FAEEDA', 90, 'FACILE', true, 'Les perles en bois sont plus faciles à manipuler. Idéal pour travailler la motricité fine en douceur.', '1 à 4 personnes'),
(3, 'Collage nature', 'Magazines découpés et fleurs séchées sur carton. Laisser aller son imagination.', '🌸', '#FAEEDA', 60, 'FACILE', true, 'Prépare les magazines découpés à l''avance si les ciseaux sont difficiles. Pas de règles — chaque collage est unique.', '1 à 6 personnes'),
(4, 'Bougeoir en argile', 'Malaxer, modeler, laisser sécher puis peindre. Très sensoriel et relaxant.', '🕯️', '#EEEDFE', 120, 'FACILE', true, 'L''argile est très apaisante pour les jeunes avec des besoins sensoriels. Prévoir une séance de séchage (24h) avant la peinture.', '1 à 4 personnes'),
(5, 'Jardinière bois', 'Caisse à plantes avec drainage. Construire et jardiner en même temps.', '🪴', '#EAF3DE', 90, 'MOYEN', true, 'Prévisser les trous à l''avance pour faciliter l''assemblage. Le jeune peut se concentrer sur l''assemblage et la décoration.', '1 à 3 personnes'),
(6, 'Banc simple en bois', 'Planches et vis, aucun outil électrique. Grande fierté à la fin !', '🪑', '#E1F5EE', 180, 'MOYEN', true, 'Activité idéale en binôme jeune/accompagnant. Prévisser tous les trous à l''avance.', '2 à 4 personnes'),
(7, 'Cadre photo décoré', 'Baguettes bois peintes et décorées. Parfait pour offrir à sa famille.', '🖼️', '#FAECE7', 60, 'FACILE', true, 'Prévoir une photo significative pour le jeune à insérer dans le cadre terminé.', '1 à 4 personnes'),
(8, 'Porte-manteau', 'Un pied bois avec crochets. On peut le peindre comme on veut.', '🧥', '#E6F1FB', 120, 'MOYEN', true, 'Utiliser des crochets à visser à la main pour éviter le marteau.', '1 à 3 personnes'),
(9, 'Vase en récup', 'Un bocal, de la ficelle et de la peinture. Zéro déchet, 100% créatif.', '♻️', '#EAF3DE', 60, 'FACILE', true, 'Parfait pour sensibiliser au recyclage. Prévoir plusieurs bocaux de tailles différentes.', '1 à 6 personnes'),

-- ── PEINTURE ───────────────────────────────────────────────
(10, 'Peinture aux doigts', 'Peindre directement avec les mains sur du papier. Coloré, libre, joyeux.', '🖐️', '#FDE68A', 45, 'FACILE', false, 'Proposer des peintures lavables non toxiques. Protéger la table. Laisser un choix total des couleurs.', '1 à 6 personnes'),
(11, 'Aquarelle sur sel', 'Poser du sel sur une aquarelle humide pour créer des effets surprises et magiques.', '🌊', '#BAE6FD', 45, 'FACILE', false, 'L''effet est garanti même sans technique. Encourage la curiosité sensorielle et l''émerveillement.', '1 à 4 personnes'),
(12, 'Peinture soufflée à la paille', 'Déposer des gouttes de peinture diluée et souffler avec une paille pour créer des formes.', '💨', '#FCA5A5', 30, 'FACILE', false, 'Adaptable avec une pipette si souffler est difficile. Stimule aussi la respiration.', '1 à 4 personnes'),
(13, 'Peinture au rouleau mousse', 'Utiliser un gros rouleau mousse pour couvrir de grandes surfaces facilement.', '🖌️', '#A7F3D0', 45, 'FACILE', false, 'Le rouleau demande peu de précision — idéal pour une motricité réduite ou des tremblements.', '1 à 4 personnes'),
(14, 'Tampons végétaux', 'Couper des légumes (pomme, poivron, céleri) et s''en servir comme tampons à peindre.', '🥦', '#BBF7D0', 45, 'FACILE', false, 'Préparer les légumes à l''avance. L''activité stimule aussi l''odorat et le toucher.', '1 à 6 personnes'),
(15, 'Mandala à colorier', 'Colorier un grand mandala imprimé avec des feutres ou crayons de couleur.', '🌀', '#DDD6FE', 60, 'FACILE', false, 'Effet méditatif et apaisant. Choisir des mandalas avec de grands espaces pour faciliter le coloriage.', '1 à 4 personnes'),
(16, 'Peinture sur galet', 'Peindre et décorer des galets avec de la peinture acrylique.', '🪨', '#D1FAE5', 60, 'FACILE', false, 'Les galets plats sont faciles à tenir. Activité très valorisante car l''objet est concret et offrable.', '1 à 4 personnes'),
(17, 'Peinture à l''éponge', 'Créer des dégradés et textures avec des éponges découpées en formes.', '🧽', '#FEF3C7', 45, 'FACILE', false, 'Les éponges sont plus faciles à tenir qu''un pinceau. Idéal pour les personnes avec une prise difficile.', '1 à 4 personnes'),

-- ── COLLAGE & PAPIER ───────────────────────────────────────
(18, 'Mosaïque de papier', 'Coller de petits morceaux de papier coloré pour former un dessin en mosaïque.', '🔲', '#6EE7B7', 90, 'MOYEN', false, 'Proposer des grilles prédécoupées. Travailler par petites zones pour ne pas décourager.', '1 à 3 personnes'),
(19, 'Livre de souvenirs', 'Assembler des photos, dessins et textes dans un petit carnet personnel.', '📖', '#FBCFE8', 90, 'FACILE', false, 'Propose des autocollants et tampons pour décorer. Activité très émotionnelle et narrative.', '1 à 2 personnes'),
(20, 'Carte en relief', 'Créer une carte de vœux avec des éléments en relief (papier froissé, tissu, mousse).', '💌', '#FDE68A', 60, 'FACILE', false, 'La carte peut être offerte à un proche — renforce le lien social et le sentiment d''utilité.', '1 à 4 personnes'),
(21, 'Mobile en papier', 'Découper et assembler des formes en papier suspendues à une branche ou bâtonnet.', '🪁', '#BFDBFE', 60, 'MOYEN', false, 'Utiliser du papier épais pour que les formes restent bien. L''accompagnant peut aider au découpage.', '1 à 3 personnes'),

-- ── ARGILE & MODELAGE ──────────────────────────────────────
(22, 'Bol en argile pincé', 'Créer un petit bol en pinçant l''argile entre les doigts. Très accessible.', '🫙', '#FEF3C7', 60, 'FACILE', false, 'Technique du "pincement" très simple. L''argile autodurcissante ne nécessite pas de four.', '1 à 4 personnes'),
(23, 'Plaque décorative en argile', 'Rouler l''argile et y imprimer des textures (feuilles, objets) pour créer une plaque murale.', '🍃', '#D1FAE5', 90, 'FACILE', false, 'Imprimer des textures dans l''argile est très gratifiant sensoriel. Utiliser des feuilles de jardin.', '1 à 4 personnes'),
(24, 'Figurine en pâte à modeler', 'Créer un personnage ou animal avec de la pâte à modeler colorée.', '🐾', '#FCA5A5', 45, 'FACILE', false, 'La pâte à modeler est plus souple que l''argile — idéale pour les mains moins fortes.', '1 à 6 personnes'),
(25, 'Empreintes en plâtre', 'Faire des empreintes de mains ou pieds dans du plâtre. Souvenir unique.', '✋', '#E0E7FF', 45, 'FACILE', false, 'Activité très inclusive — accessible même avec une motricité très réduite. Le résultat est très touchant.', '1 à 4 personnes'),

-- ── NATURE & JARDINAGE ─────────────────────────────────────
(26, 'Semis en pot', 'Planter des graines de fleurs ou herbes aromatiques dans un pot décoré.', '🌱', '#DCFCE7', 45, 'FACILE', false, 'Prendre soin d''une plante donne un sentiment de responsabilité positif. Choisir des graines à pousse rapide.', '1 à 4 personnes'),
(27, 'Herbier coloré', 'Ramasser des plantes, les presser et les coller dans un cahier en les nommant.', '🌿', '#BBF7D0', 90, 'FACILE', false, 'La balade de collecte est aussi une activité. Nommer les plantes ensemble développe le vocabulaire.', '1 à 4 personnes'),
(28, 'Attrape-soleil nature', 'Coller des feuilles et fleurs séchées entre deux feuilles de plastique transparent.', '☀️', '#FEF9C3', 60, 'FACILE', false, 'L''effet lumineux est magique quand on accroche l''attrape-soleil à une fenêtre. Très encourageant.', '1 à 4 personnes'),
(29, 'Terrarium miniature', 'Créer un mini jardin dans un bocal avec du sable, des galets et des plantes grasses.', '🌵', '#D1FAE5', 60, 'MOYEN', false, 'Peu d''entretien requis ensuite. Les cactus et plantes grasses sont très résistants — idéal.', '1 à 3 personnes'),

-- ── SENSORIEL & BIEN-ÊTRE ──────────────────────────────────
(30, 'Bac sensoriel textures', 'Remplir un bac avec différentes textures (sable, riz, mousse, tissu) à explorer avec les mains.', '🤲', '#FDE68A', 30, 'FACILE', false, 'Idéal pour les personnes avec des besoins sensoriels importants. Adapter les textures selon les préférences.', '1 à 2 personnes'),
(31, 'Bouquet de fleurs séchées', 'Assembler et lier des fleurs séchées pour créer un bouquet décoratif.', '💐', '#FBCFE8', 45, 'FACILE', false, 'Les fleurs séchées ont une odeur apaisante. Activité très sensorielle et le résultat est très beau.', '1 à 4 personnes'),
(32, 'Peinture sonore', 'Peindre en écoutant de la musique, en suivant le rythme avec le pinceau.', '🎵', '#DDD6FE', 45, 'FACILE', false, 'Choisir différents styles de musique pour voir comment le dessin change. Très libérateur émotionnellement.', '1 à 6 personnes'),
(33, 'Pochette en tissu décoré', 'Décorer une pochette en tissu blanc avec des feutres spéciaux tissu.', '👜', '#FBEAF0', 60, 'FACILE', false, 'Les feutres tissu sont permanents mais faciles à utiliser. Résultat offrable et très personnalisé.', '1 à 4 personnes'),
(34, 'Boîte à secrets décorée', 'Peindre et décorer une petite boîte en bois pour y garder ses trésors.', '📦', '#FEF3C7', 60, 'FACILE', false, 'La boîte donne un espace personnel et privé — très important pour l''estime de soi.', '1 à 4 personnes'),

-- ── TEXTILE & COUTURE ──────────────────────────────────────
(35, 'Tissage sur cadre', 'Tisser des fils colorés sur un cadre en carton pour créer un petit tableau textile.', '🧶', '#FBEAF0', 90, 'MOYEN', false, 'Le geste de tissage est répétitif et apaisant. Utiliser de gros fils pour faciliter la manipulation.', '1 à 3 personnes'),
(36, 'Décoration de T-shirt', 'Personnaliser un T-shirt blanc avec des feutres tissu ou de la peinture textile.', '👕', '#E0F2FE', 60, 'FACILE', false, 'Porter quelque chose qu''on a fait soi-même est très valorisant. Proposer des gabarits si besoin.', '1 à 4 personnes'),
(37, 'Tapis en nouettes', 'Faire des nœuds avec des bandes de tissu sur une grille plastique pour créer un tapis.', '🧵', '#FEF3C7', 120, 'MOYEN', false, 'Le geste de nouage est simple et répétitif. Utiliser des bandes de tissu épaisses pour faciliter.', '1 à 3 personnes'),
(38, 'Marionnette en chaussette', 'Transformer une vieille chaussette en marionnette avec des boutons et du tissu.', '🧦', '#FCA5A5', 45, 'FACILE', false, 'Activité très ludique et imaginative. La marionnette peut être utilisée pour exprimer des émotions.', '1 à 4 personnes'),

-- ── MUSIQUE & RYTHME ───────────────────────────────────────
(39, 'Fabrication d''un tambourin', 'Créer un tambourin avec une assiette en carton, des grelots et de la peinture.', '🥁', '#FDE68A', 45, 'FACILE', false, 'L''instrument fabriqué peut être utilisé en séance de musicothérapie. Laisser décorer librement.', '1 à 4 personnes'),
(40, 'Maracas en bouteille', 'Remplir une bouteille plastique de riz ou cailloux et la décorer. Instrument à secouer.', '🎶', '#D1FAE5', 30, 'FACILE', false, 'Très accessible même avec une mobilité réduite. Jouer ensemble après pour créer du rythme collectif.', '1 à 6 personnes'),
(41, 'Illustration de chanson', 'Écouter une chanson et dessiner ce qu''elle évoque, image par image.', '🎼', '#DDD6FE', 60, 'FACILE', false, 'Choisir des chansons connues et appréciées par la personne. Sans jugement artistique — tout est juste.', '1 à 4 personnes'),

-- ── RÉCUPÉRATION & RECYCLAGE ───────────────────────────────
(42, 'Robot en cartons', 'Assembler des boîtes en carton de toutes tailles pour construire un robot.', '🤖', '#BFDBFE', 90, 'FACILE', false, 'Collecter les boîtes à l''avance avec le jeune pour l''impliquer dès le début. Très ludique et créatif.', '1 à 4 personnes'),
(43, 'Mobile en bouchons', 'Peindre des bouchons de liège et les assembler en mobile suspendu.', '🍷', '#FCA5A5', 60, 'FACILE', false, 'Les bouchons de liège sont faciles à manipuler. Activité de sensibilisation au recyclage.', '1 à 4 personnes'),
(44, 'Lampion en bocal', 'Coller du papier de soie coloré sur un bocal pour créer un lampion lumineux.', '🏮', '#FEF9C3', 45, 'FACILE', false, 'Allumer une bougie LED à l''intérieur pour voir l''effet. Visuellement très beau et motivant.', '1 à 4 personnes'),
(45, 'Tableau en capsules de café', 'Coller des capsules de café peintes sur un carton pour créer un tableau abstrait.', '☕', '#FEF3C7', 60, 'FACILE', false, 'Les capsules sont faciles à tenir et coller. Proposer plusieurs couleurs de peinture.', '1 à 4 personnes'),

-- ── PHOTOGRAPHIE & EXPRESSION ──────────────────────────────
(46, 'Album photo commenté', 'Choisir des photos, les imprimer et les coller dans un album en ajoutant des légendes.', '📷', '#E0F2FE', 90, 'FACILE', false, 'L''activité favorise la mémoire et la narration. Encourager à raconter le contexte de chaque photo.', '1 à 2 personnes'),
(47, 'Calendrier personnalisé', 'Créer un calendrier mensuel illustré de ses propres dessins ou photos.', '📅', '#FEF9C3', 120, 'MOYEN', false, 'Le calendrier sera utilisé toute l''année — très valorisant. Préparer un gabarit simple pour faciliter.', '1 à 2 personnes'),
(48, 'Portrait expressif', 'Dessiner son autoportrait en s''aidant d''un miroir et en jouant avec les couleurs.', '🪞', '#FBCFE8', 60, 'FACILE', false, 'Centrer sur l''expression et la couleur plutôt que la ressemblance. Toutes les interprétations sont valides.', '1 à 4 personnes'),

-- ── ORIGAMI & PAPIER ───────────────────────────────────────
(49, 'Origami facile', 'Plier du papier coloré pour créer des animaux simples (bateau, grenouille, cocotte).', '🦢', '#BFDBFE', 45, 'FACILE', false, 'Commencer par des pliages à 3-4 étapes maximum. Guider les mains si besoin.', '1 à 4 personnes'),
(50, 'Fleurs en papier crépon', 'Rouler et plier du papier crépon coloré pour créer des fleurs décoratives.', '🌺', '#FCA5A5', 45, 'FACILE', false, 'Le papier crépon est très souple et forgiving. Les fleurs peuvent décorer une chambre ou un couloir.', '1 à 6 personnes'),

-- ── CUISINE CRÉATIVE ───────────────────────────────────────
(51, 'Décoration de biscuits', 'Peindre des biscuits sablés avec du glaçage coloré et des décorations sucrées.', '🍪', '#FEF3C7', 60, 'FACILE', false, 'Activité très motivante car comestible ! Utiliser des coupelles de glaçage prêt à l''emploi.', '1 à 6 personnes'),
(52, 'Smoothie coloré', 'Mélanger des fruits et légumes pour créer un smoothie coloré et personnalisé.', '🥤', '#D1FAE5', 30, 'FACILE', false, 'Parler des couleurs et saveurs ensemble. La personne peut choisir ses ingrédients selon ses goûts.', '1 à 4 personnes'),
(53, 'Sel aromatisé décoratif', 'Mélanger du gros sel avec des herbes séchées et colorants alimentaires dans des bocaux.', '🧂', '#FDE68A', 45, 'FACILE', false, 'Résultat très visuel et offrable. Stimule l''odorat avec les herbes aromatiques.', '1 à 4 personnes'),

-- ── RELAXATION & ART-THÉRAPIE ──────────────────────────────
(54, 'Carnet d''émotions', 'Créer un carnet où dessiner ou coller des images qui représentent ses émotions du jour.', '📓', '#DDD6FE', 60, 'FACILE', false, 'Ne jamais forcer à montrer le carnet. C''est un espace personnel de régulation émotionnelle.', '1 personne'),
(55, 'Zen garden miniature', 'Créer un petit jardin zen avec du sable, des galets et un mini râteau.', '🪨', '#E0E7FF', 60, 'FACILE', false, 'L''action de ratisser le sable est très apaisante. Idéal pour les moments de stress ou surcharge sensorielle.', '1 à 2 personnes'),

-- ── INFORMATIQUE & NUMÉRIQUE ───────────────────────────────
(56, 'Dessin sur Paint', 'Utiliser le logiciel Paint (ou équivalent) pour créer un dessin numérique coloré.', '🖥️', '#BFDBFE', 45, 'FACILE', false, 'L''outil "remplissage" est très gratifiant car il colorie instantanément. Commencer par des formes simples.', '1 à 2 personnes'),
(57, 'Carte de vœux numérique', 'Créer une carte de vœux avec Canva ou Word en ajoutant des images et du texte.', '💻', '#FDE68A', 60, 'FACILE', false, 'Proposer des modèles prêts à personnaliser. Se concentrer sur le choix des couleurs et du message.', '1 à 2 personnes'),
(58, 'Présentation photo', 'Créer un diaporama de ses photos préférées avec Google Slides ou PowerPoint.', '📊', '#D1FAE5', 60, 'MOYEN', false, 'Commencer avec 5 à 10 photos. L''activité favorise la narration et le partage de souvenirs.', '1 à 2 personnes'),
(59, 'Jeu de mémoire numérique', 'Jouer à des jeux de mémoire ou puzzles en ligne adaptés pour stimuler la cognition.', '🧩', '#FCA5A5', 30, 'FACILE', false, 'Choisir un niveau adapté. L''objectif est le plaisir et la stimulation, pas la performance.', '1 à 2 personnes'),
(60, 'Montage photo simple', 'Assembler plusieurs photos avec un outil simple (Canva, Google Photos) pour créer un collage.', '🖼️', '#E0F2FE', 60, 'MOYEN', false, 'Utiliser des photos que la personne a choisies elle-même. Le résultat peut être imprimé et encadré.', '1 à 2 personnes'),
(61, 'Musique sur Incredibox', 'Composer une mélodie simple sur Incredibox (application musicale intuitive et visuelle).', '🎹', '#DDD6FE', 30, 'FACILE', false, 'Incredibox est entièrement visuel et intuitif — aucune connaissance musicale requise. Très ludique.', '1 à 2 personnes'),
(62, 'Enregistrement vocal', 'Enregistrer sa voix (histoire, chanson, poème) sur un téléphone ou ordinateur.', '🎙️', '#FBEAF0', 30, 'FACILE', false, 'Réécouter ensemble après l''enregistrement. Activité très valorisante pour la personne.', '1 à 2 personnes'),
(63, 'Histoire illustrée numérique', 'Écrire et illustrer une courte histoire avec des images trouvées sur internet.', '📝', '#FEF9C3', 90, 'MOYEN', false, 'L''accompagnant peut taper le texte si nécessaire. Se concentrer sur l''imagination et la narration.', '1 à 2 personnes'),
(64, 'Pixel art', 'Créer un dessin en pixel art sur un site dédié (comme piskelapp.com) — comme du point de croix numérique.', '👾', '#BBF7D0', 60, 'MOYEN', false, 'Le pixel art est très structurant et apaisant. Commencer par de petits formats (16x16 pixels).', '1 à 2 personnes'),
(65, 'Vidéo stop-motion', 'Photographier des objets ou figurines étape par étape pour créer une mini animation.', '🎬', '#FCA5A5', 120, 'MOYEN', false, 'Utiliser un téléphone ou tablette posé fixe. 10 à 15 photos suffisent pour une animation de quelques secondes.', '1 à 3 personnes');


-- ============================================================
-- MATÉRIAUX
-- ============================================================
INSERT INTO activite_materiaux (activite_id, materiau) VALUES
-- origine
(1,'Fil élastique transparent'),(1,'Perles colorées (grosses)'),(1,'Ciseaux'),(1,'Plateau pour les perles'),
(2,'Perles en bois naturel'),(2,'Fil ciré épais'),(2,'Ciseaux'),(2,'Peinture acrylique (optionnel)'),
(3,'Carton épais'),(3,'Magazines ou journaux'),(3,'Colle blanche'),(3,'Ciseaux'),(3,'Fleurs séchées (optionnel)'),
(4,'Argile autodurcissante'),(4,'Toile de protection'),(4,'Peinture acrylique'),(4,'Vernis (optionnel)'),(4,'Bougie chauffe-plat'),
(5,'3 planches de bois (30x10cm)'),(5,'Vis à bois'),(5,'Tournevis'),(5,'Peinture extérieure'),
(6,'2 planches de bois (100x20cm)'),(6,'4 pieds carrés (40cm)'),(6,'Vis à bois'),(6,'Tournevis'),(6,'Papier de verre'),(6,'Peinture ou vernis'),
(7,'Cadre en bois brut'),(7,'Peinture acrylique'),(7,'Pinceaux'),(7,'Stickers ou feutrine'),(7,'Colle'),(7,'Photo format cadre'),
(8,'Bâton de bois (80cm)'),(8,'3 crochets à visser'),(8,'Peinture acrylique'),(8,'Pinceau'),(8,'Papier de verre'),
(9,'Bocal en verre récupéré'),(9,'Ficelle ou raphia'),(9,'Colle forte'),(9,'Peinture pour verre'),(9,'Ruban décoratif'),
-- peinture
(10,'Peinture lavable non toxique'),(10,'Grandes feuilles de papier'),(10,'Tablier ou vieux vêtements'),(10,'Bassine d''eau'),
(11,'Papier aquarelle'),(11,'Aquarelles'),(11,'Gros sel'),(11,'Pinceau large'),
(12,'Peinture acrylique diluée'),(12,'Pailles'),(12,'Feuilles de papier blanc'),
(13,'Rouleau mousse'),(13,'Peinture acrylique'),(13,'Grande feuille ou toile'),
(14,'Légumes variés (pomme, poivron, céleri)'),(14,'Peinture acrylique'),(14,'Feuilles de papier'),
(15,'Mandala imprimé (A3)'),(15,'Feutres ou crayons de couleur'),
(16,'Galets plats lisses'),(16,'Peinture acrylique'),(16,'Pinceaux fins'),(16,'Vernis protecteur'),
(17,'Éponges naturelles ou découpées'),(17,'Peinture acrylique'),(17,'Feuilles de papier'),
-- collage
(18,'Papier coloré ou magazines'),(18,'Colle blanche'),(18,'Ciseaux'),(18,'Carton'),
(19,'Carnet vierge'),(19,'Photos imprimées'),(19,'Colle'),(19,'Feutres'),(19,'Autocollants'),
(20,'Carton plié en carte'),(20,'Papier froissé'),(20,'Tissu'),(20,'Colle'),(20,'Feutres'),
(21,'Papier épais coloré'),(21,'Ciseaux'),(21,'Fil'),(21,'Bâtonnet ou branche'),
-- argile
(22,'Argile autodurcissante'),(22,'Toile de protection'),(22,'Eau'),
(23,'Argile autodurcissante'),(23,'Feuilles fraîches'),(23,'Rouleau à pâtisserie'),(23,'Toile de protection'),
(24,'Pâte à modeler colorée'),
(25,'Plâtre de Paris'),(25,'Moule'),(25,'Eau'),
-- nature
(26,'Graines (radis, basilic...)'),(26,'Petit pot en terre'),(26,'Terreau'),(26,'Eau'),
(27,'Cahier'),(27,'Plantes ramassées'),(27,'Colle'),(27,'Ciseaux'),
(28,'Plastique transparent (2 feuilles)'),(28,'Fleurs et feuilles séchées'),(28,'Ruban adhésif'),
(29,'Grand bocal en verre'),(29,'Sable'),(29,'Galets'),(29,'Plantes grasses'),(29,'Terreau pour cactus'),
-- sensoriel
(30,'Bac peu profond'),(30,'Sable'),(30,'Riz'),(30,'Mousse à raser'),(30,'Objets variés (cailloux, boutons...)'),
(31,'Fleurs séchées assorties'),(31,'Ficelle ou raphia'),(31,'Ciseaux'),
(32,'Peinture acrylique'),(32,'Pinceaux'),(32,'Feuilles de papier'),(32,'Enceinte ou téléphone'),
(33,'Pochette en tissu blanc'),(33,'Feutres spéciaux tissu'),(33,'Carton à glisser dedans'),
(34,'Petite boîte en bois brut'),(34,'Peinture acrylique'),(34,'Pinceaux'),(34,'Stickers'),
-- textile
(35,'Cadre carton'),(35,'Fils de laine colorés'),(35,'Ciseaux'),
(36,'T-shirt blanc'),(36,'Feutres tissu'),(36,'Carton à glisser dedans'),
(37,'Grille plastique canevas'),(37,'Bandes de tissu coloré'),
(38,'Vieille chaussette'),(38,'Boutons'),(38,'Colle tissu'),(38,'Bouts de tissu coloré'),
-- musique
(39,'Assiette en carton'),(39,'Grelots'),(39,'Peinture acrylique'),(39,'Fil'),
(40,'Bouteille plastique avec bouchon'),(40,'Riz ou petits cailloux'),(40,'Peinture ou autocollants'),
(41,'Feuilles de papier blanc'),(41,'Crayons ou feutres'),(41,'Enceinte ou téléphone'),
-- récup
(42,'Boîtes en carton variées'),(42,'Colle forte ou ruban adhésif'),(42,'Peinture acrylique'),
(43,'Bouchons de liège'),(43,'Peinture acrylique'),(43,'Fil'),(43,'Ciseaux'),
(44,'Bocal en verre'),(44,'Papier de soie coloré'),(44,'Colle diluée'),(44,'Bougie LED'),
(45,'Capsules de café usagées'),(45,'Peinture acrylique'),(45,'Carton épais'),(45,'Colle forte'),
-- photo / expression
(46,'Photos imprimées'),(46,'Album photo vierge'),(46,'Feutres'),(46,'Autocollants'),
(47,'Gabarit calendrier imprimé'),(47,'Crayons de couleur'),(47,'Photos ou dessins personnels'),
(48,'Grand miroir (ou petite glace)'),(48,'Papier aquarelle'),(48,'Peinture ou crayons couleur'),
-- origami
(49,'Feuilles de papier origami coloré'),
(50,'Papier crépon coloré'),(50,'Ciseaux'),(50,'Fil vert pour la tige'),
-- cuisine
(51,'Biscuits sablés ronds'),(51,'Glaçage coloré'),(51,'Décorations sucrées'),
(52,'Fruits variés'),(52,'Yaourt ou lait végétal'),(52,'Blender'),
(53,'Gros sel'),(53,'Herbes séchées (thym, romarin...)'),(53,'Colorant alimentaire'),(53,'Bocaux'),
-- relaxation
(54,'Carnet vierge'),(54,'Feutres'),(54,'Magazines pour découper'),
(55,'Bac plat'),(55,'Sable fin blanc'),(55,'Galets lisses'),(55,'Mini râteau en bois'),
-- informatique
(56,'Ordinateur avec Paint ou équivalent'),
(57,'Ordinateur avec accès à Canva ou Word'),(57,'Connexion internet'),
(58,'Ordinateur avec Google Slides ou PowerPoint'),(58,'Photos personnelles'),
(59,'Ordinateur ou tablette'),(59,'Connexion internet'),
(60,'Ordinateur avec accès à Canva'),(60,'Photos personnelles'),(60,'Connexion internet'),
(61,'Ordinateur ou tablette'),(61,'Connexion internet (incredibox.com)'),
(62,'Téléphone ou ordinateur avec micro'),
(63,'Ordinateur'),(63,'Connexion internet'),
(64,'Ordinateur ou tablette'),(64,'Connexion internet (piskelapp.com)'),
(65,'Téléphone ou tablette'),(65,'Application stop-motion ou appareil photo');


-- ============================================================
-- ÉTAPES
-- ============================================================
INSERT INTO activite_etapes (activite_id, etape, etape_ordre) VALUES
-- origine (inchangées)
(1,'Choisis tes couleurs de perles préférées et mets-les dans le plateau.',0),(1,'Coupe un morceau de fil élastique de 25 cm environ.',1),(1,'Fais un nœud à un bout du fil pour que les perles ne tombent pas.',2),(1,'Enfile les perles une par une dans l''ordre que tu veux.',3),(1,'Quand le bracelet fait le tour de ton poignet, arrête-toi.',4),(1,'Fais un nœud solide et coupe le fil en trop. Bravo !',5),
(2,'Choisis tes perles en bois et dispose-les dans l''ordre que tu veux.',0),(2,'Coupe 60 cm de fil ciré.',1),(2,'Fais un gros nœud à un bout pour bloquer la première perle.',2),(2,'Enfile les perles une à une en suivant ton idée.',3),(2,'Laisse 5 cm de fil libre à la fin pour faire le fermoir.',4),(2,'Noue les deux bouts ensemble solidement. Ton collier est prêt !',5),
(3,'Découpe ou déchire des images dans les magazines — tout ce qui te plaît.',0),(3,'Dispose les images sur le carton sans coller pour voir le résultat.',1),(3,'Quand tu es content(e) de la disposition, commence à coller.',2),(3,'Applique la colle sur le carton puis pose chaque image.',3),(3,'Ajoute des fleurs séchées ou des détails décoratifs si tu veux.',4),(3,'Laisse sécher 30 minutes. Tu peux signer ton œuvre !',5),
(4,'Malaxe l''argile avec tes mains pour la ramollir — c''est la partie fun !',0),(4,'Forme une boule puis creuse le centre avec ton pouce.',1),(4,'Agrandis le trou en tournant l''argile dans tes mains.',2),(4,'Donne la forme que tu veux — rond, carré, avec des décors...',3),(4,'Laisse sécher 24 heures à l''air libre.',4),(4,'Peins ton bougeoir avec les couleurs que tu aimes. Laisse sécher.',5),(4,'Place une bougie chauffe-plat à l''intérieur. C''est prêt !',6),
(5,'Ponce légèrement les planches pour enlever les échardes.',0),(5,'Peins les planches si tu veux les décorer avant l''assemblage.',1),(5,'Place les 3 planches en U : une au fond et deux sur les côtés.',2),(5,'Visse les côtés sur la planche du fond (les trous sont déjà faits).',3),(5,'Perce des petits trous au fond pour l''écoulement de l''eau.',4),(5,'Remplis de terreau et plante ce que tu veux. C''est ta jardinière !',5),
(6,'Ponce les planches et les pieds pour les lisser.',0),(6,'Place les deux grandes planches côte à côte — c''est le siège.',1),(6,'Positionne les pieds sous le siège aux quatre coins.',2),(6,'Visse chaque pied solidement (les trous sont pré-percés).',3),(6,'Teste la solidité en appuyant sur le siège.',4),(6,'Ponce à nouveau si besoin puis peins ou vernis comme tu veux.',5),(6,'Laisse sécher et installe ton banc où tu veux. Quelle fierté !',6),
(7,'Ponce légèrement le cadre pour bien accrocher la peinture.',0),(7,'Peins le cadre avec ta couleur préférée. Laisse sécher.',1),(7,'Ajoute une deuxième couche si tu veux une couleur plus intense.',2),(7,'Décore avec des stickers, de la feutrine ou des dessins au feutre.',3),(7,'Insère ta photo dans le cadre.',4),(7,'Offre-le à quelqu''un que tu aimes ou garde-le pour toi !',5),
(8,'Ponce le bâton de bois pour enlever les échardes.',0),(8,'Peins le bâton avec tes couleurs. Laisse sécher complètement.',1),(8,'Marque 3 emplacements réguliers pour les crochets avec un crayon.',2),(8,'Visse les crochets à la main sur les marques.',3),(8,'Fixe le porte-manteau au mur ou pose-le dans un coin.',4),(8,'Accroche tes affaires dessus. Tu l''as fabriqué toi-même !',5),
(9,'Nettoie bien le bocal et laisse-le sécher.',0),(9,'Peins le bocal avec de la peinture pour verre si tu veux.',1),(9,'Laisse sécher la peinture 30 minutes.',2),(9,'Enroule la ficelle ou le raphia autour du bocal avec de la colle.',3),(9,'Ajoute des décorations : ruban, coquillages, boutons...',4),(9,'Laisse sécher et utilise ton vase ou pot à crayons !',5),
-- peinture
(10,'Prépare ton espace avec une grande feuille et un tablier.',0),(10,'Verse les couleurs que tu veux dans de petites coupelles.',1),(10,'Trempe tes doigts dans la peinture et touche la feuille.',2),(10,'Crée des formes, des empreintes, des lignes... tout est permis !',3),(10,'Laisse sécher avant de signer ton œuvre.',4),
(11,'Prépare ta feuille aquarelle en la mouillant légèrement.',0),(11,'Peins des zones de couleur avec l''aquarelle — sans trop détailler.',1),(11,'Pendant que c''est encore humide, saupoudre du gros sel dessus.',2),(11,'Laisse sécher sans toucher — la magie se fait toute seule !',3),(11,'Enlève le sel sec avec ta main et découvre les motifs créés.',4),
(12,'Prépare des flaques de peinture très diluée sur la feuille.',0),(12,'Prends une paille et souffle doucement sur une flaque.',1),(12,'Regarde les tentacules se former ! Change de couleur.',2),(12,'Continue jusqu''à remplir la feuille. Laisse sécher.',3),
(13,'Verse la peinture dans un bac peu profond.',0),(13,'Trempe le rouleau mousse dans la peinture.',1),(13,'Fais rouler le rouleau sur ta feuille ou toile.',2),(13,'Change de couleur et recommence pour créer des effets.',3),(13,'Laisse sécher. Ton tableau est terminé !',4),
(14,'Coupe tes légumes en deux pour voir les formes intérieures.',0),(14,'Verse la peinture dans de petites assiettes.',1),(14,'Trempe ton légume dans la peinture et tamponne sur la feuille.',2),(14,'Change de légume et de couleur pour créer un motif.',3),(14,'Laisse sécher et contemple ton œuvre végétale !',4),
(15,'Imprime ou télécharge un mandala qui te plaît.',0),(15,'Choisis tes couleurs préférées.',1),(15,'Commence par le centre et colorie vers l''extérieur.',2),(15,'Prends ton temps — c''est une activité calme et zen.',3),(15,'Signe ton mandala et affiche-le !',4),
(16,'Lave et sèche bien tes galets.',0),(16,'Dessine d''abord un motif au crayon sur le galet.',1),(16,'Peins avec de la peinture acrylique en petites couches.',2),(16,'Laisse sécher entre chaque couleur.',3),(16,'Applique du vernis protecteur une fois sec. Ton galet est prêt !',4),
(17,'Découpe tes éponges en formes (carré, rond, étoile).',0),(17,'Trempe une éponge dans la peinture — pas trop chargée.',1),(17,'Tamponne sur la feuille pour créer des textures.',2),(17,'Superpose les formes et couleurs pour un effet unique.',3),(17,'Laisse sécher. Encadre ou offre ton tableau !',4),
-- collage
(18,'Découpe des petits morceaux de papier coloré.',0),(18,'Dessine d''abord ta forme sur le carton au crayon.',1),(18,'Colle les morceaux les uns à côté des autres à l''intérieur du dessin.',2),(18,'Remplis tout l''espace sans laisser de blanc.',3),(18,'Laisse sécher et affiche ta mosaïque !',4),
(19,'Choisis les photos que tu veux mettre dans ton carnet.',0),(19,'Colle-les sur les pages en les arrangeant comme tu veux.',1),(19,'Écris ou fais écrire une légende sous chaque photo.',2),(19,'Décore les pages avec des stickers et des dessins.',3),(19,'Ton carnet de souvenirs est prêt — garde-le précieusement !',4),
(20,'Plie ton carton en deux pour former la carte.',0),(20,'Découpe des formes en papier froissé ou tissu.',1),(20,'Colle les éléments en relief sur le devant de la carte.',2),(20,'Écris ton message à l''intérieur.',3),(20,'Offre ta carte à quelqu''un que tu aimes !',4),
(21,'Découpe 6 à 8 formes dans le papier épais.',0),(21,'Décore chaque forme au feutre ou peinture.',1),(21,'Perce un trou en haut de chaque forme.',2),(21,'Attache chaque forme à un fil de longueur différente.',3),(21,'Fixe tous les fils au bâtonnet ou à la branche.',4),(21,'Suspends ton mobile et regarde-le tourner !',5),
-- argile
(22,'Malaxe l''argile pour la ramollir.',0),(22,'Forme une boule de la taille d''une balle de tennis.',1),(22,'Creuse le centre avec ton pouce en pinçant les bords.',2),(22,'Affine les bords en pinçant régulièrement tout autour.',3),(22,'Laisse sécher 24 heures.',4),(22,'Peins si tu veux et laisse sécher à nouveau.',5),
(23,'Prépare une boule d''argile et étale-la au rouleau (1cm d''épaisseur).',0),(23,'Pose des feuilles fraîches sur l''argile et appuie fermement.',1),(23,'Retire délicatement les feuilles — l''empreinte reste !',2),(23,'Découpe la plaque en forme avec un couteau ou cure-dents.',3),(23,'Laisse sécher 24h à plat.',4),(23,'Peins et vernis pour mettre en valeur les détails.',5),
(24,'Prends les couleurs de pâte à modeler que tu veux.',0),(24,'Forme les différentes parties de ton personnage ou animal.',1),(24,'Assemble les pièces en appuyant légèrement.',2),(24,'Ajoute des détails avec un cure-dents ou un outil.',3),(24,'Pose ta figurine sur une surface plate et admire ton travail !',4),
(25,'Prépare le plâtre en mélangeant avec de l''eau (consistance épaisse).',0),(25,'Verse dans le moule ou dans un bac peu profond.',1),(25,'Appuie ta main ou ton pied doucement dans le plâtre encore mou.',2),(25,'Laisse sécher 30 minutes SANS bouger.',3),(25,'Démoule délicatement. Peins si tu veux !',4),
-- nature
(26,'Remplis le pot de terreau jusqu''à 2 cm du bord.',0),(26,'Fais un petit trou avec ton doigt.',1),(26,'Dépose 2 ou 3 graines dans le trou.',2),(26,'Recouvre légèrement de terreau.',3),(26,'Arrose doucement avec un peu d''eau.',4),(26,'Place au soleil et arrose un peu chaque jour. Surveille la pousse !',5),
(27,'Ramasse plantes, feuilles et fleurs lors d''une balade.',0),(27,'Pose-les à plat entre deux feuilles de papier absorbant.',1),(27,'Pose un livre lourd dessus et attends 48 heures.',2),(27,'Colle les plantes séchées dans ton cahier.',3),(27,'Écris ou fais écrire le nom de chaque plante à côté.',4),
(28,'Ramasse ou prépare des feuilles et fleurs séchées.',0),(28,'Dispose-les sur une feuille de plastique transparent.',1),(28,'Pose la deuxième feuille de plastique par-dessus.',2),(28,'Scelle les bords avec du ruban adhésif.',3),(28,'Perce un trou en haut et accroche à une fenêtre ensoleillée.',4),
(29,'Verse 3 cm de sable au fond du bocal.',0),(29,'Ajoute une couche de petits galets.',1),(29,'Mets une petite couche de terreau pour cactus.',2),(29,'Plante tes plantes grasses délicatement.',3),(29,'Décore avec des galets supplémentaires si tu veux.',4),(29,'Arrose très peu — les plantes grasses aiment la sécheresse !',5),
-- sensoriel
(30,'Prépare le bac avec différentes textures séparées par zones.',0),(30,'Explore le bac avec tes mains — sans règles, juste ressentir.',1),(30,'Décris ce que tu ressens : doux, rugueux, froid, chaud...',2),(30,'Essaie de trouver des objets cachés dans le bac à l''aveugle.',3),
(31,'Sélectionne les fleurs et herbes séchées que tu préfères.',0),(31,'Dispose-les sur la table pour voir le résultat avant d''assembler.',1),(31,'Regroupe les tiges et liens avec de la ficelle au niveau des tiges.',2),(31,'Coupe les tiges à la même longueur.',3),(31,'Ton bouquet est prêt — décore ou offre-le !',4),
(32,'Prépare ta feuille et tes couleurs.',0),(32,'Lance la musique et ferme les yeux un moment pour l''écouter.',1),(32,'Peins ce que la musique te fait ressentir — sans réfléchir.',2),(32,'Change de couleur avec le tempo ou les émotions.',3),(32,'Regarde ton tableau après — qu''est-ce que tu vois ?',4),
(33,'Glisse un carton dans la pochette pour la rigidifier.',0),(33,'Dessine d''abord au crayon sur la pochette.',1),(33,'Repasse avec les feutres tissu permanents.',2),(33,'Laisse sécher 24 heures avant utilisation.',3),
(34,'Ponce légèrement la boîte si elle est brute.',0),(34,'Peins la boîte en une couleur de fond. Laisse sécher.',1),(34,'Décore avec des motifs, stickers ou dessins au feutre.',2),(34,'Ajoute une deuxième couche de peinture si besoin.',3),(34,'Laisse sécher et range tes trésors dedans !',4),
-- textile
(35,'Prépare le cadre en carton en faisant des encoches sur les bords.',0),(35,'Attache tes fils de laine verticalement (fils de chaîne).',1),(35,'Passe un fil horizontal en passant dessus/dessous alternativement.',2),(35,'Tasse bien chaque rang vers le bas avec tes doigts.',3),(35,'Change de couleur quand tu veux en nouant un nouveau fil.',4),(35,'Quand c''est plein, retire du cadre et fais les finitions.',5),
(36,'Glisse un carton dans le T-shirt pour ne pas déborder.',0),(36,'Dessine d''abord ton motif au crayon lavable.',1),(36,'Repasse avec les feutres tissu en appuyant bien.',2),(36,'Laisse sécher 24h avant de laver.',3),
(37,'Découpe des bandes de tissu de 2 cm de large.',0),(37,'Plie une bande en deux et passe-la dans un trou de la grille.',1),(37,'Fais passer les deux extrémités dans la boucle et tire pour nouer.',2),(37,'Continue trou par trou jusqu''à remplir la grille.',3),(37,'Ton tapis est prêt !',4),
(38,'Enfile la chaussette sur ta main pour voir où mettre les yeux.',0),(38,'Marque les emplacements des yeux et bouche avec un crayon.',1),(38,'Colle les boutons pour les yeux.',2),(38,'Ajoute des oreilles, cheveux ou autres détails en tissu.',3),(38,'Laisse sécher et joue avec ta marionnette !',4),
-- musique
(39,'Peins les deux côtés de l''assiette en carton. Laisse sécher.',0),(39,'Perce des petits trous autour du bord de l''assiette.',1),(39,'Passe un fil dans chaque trou et attache un grelot.',2),(39,'Secoue ton tambourin et fais de la musique !',3),
(40,'Remplis la bouteille au tiers avec du riz ou des cailloux.',0),(40,'Ferme bien le bouchon et secoue pour tester le son.',1),(40,'Décore la bouteille avec de la peinture ou des autocollants.',2),(40,'Laisse sécher et joue du rythme avec tes amis !',3),
(41,'Écoute la chanson une première fois les yeux fermés.',0),(41,'Réécoute et commence à dessiner ce que tu imagines.',1),(41,'Ajoute des couleurs selon les émotions de la musique.',2),(41,'Donne un titre à ton illustration.',3),
-- récup
(42,'Collecte différentes boîtes en carton (toutes tailles).',0),(42,'Assemble-les avec du ruban adhésif ou de la colle forte.',1),(42,'Peins le robot dans les couleurs que tu veux.',2),(42,'Ajoute des détails : boutons, antennes, yeux...',3),(42,'Baptise ton robot et présente-le !',4),
(43,'Peins chaque bouchon dans la couleur de ton choix. Laisse sécher.',0),(43,'Perce un trou dans chaque bouchon avec un outil pointu.',1),(43,'Passe un fil dans chaque bouchon à différentes longueurs.',2),(43,'Attache tous les fils à une branche ou bâtonnet.',3),(43,'Accroche ton mobile décoratif !',4),
(44,'Nettoie et sèche bien le bocal.',0),(44,'Déchire des morceaux de papier de soie coloré.',1),(44,'Encolle le bocal zone par zone avec la colle diluée.',2),(44,'Pose les morceaux de papier de soie en les faisant se chevaucher.',3),(44,'Laisse sécher complètement.',4),(44,'Place une bougie LED à l''intérieur — l''effet est magique !',5),
(45,'Peins les capsules de café en différentes couleurs. Laisse sécher.',0),(45,'Dessine ta composition sur le carton.',1),(45,'Colle les capsules selon ton dessin.',2),(45,'Laisse sécher et accroche ton tableau !',3),
-- photo
(46,'Rassemble tes photos préférées — récentes ou anciennes.',0),(46,'Classe-les dans l''ordre que tu veux dans l''album.',1),(46,'Colle-les soigneusement sur chaque page.',2),(46,'Écris une légende sous chaque photo.',3),(46,'Décore les pages avec des feutres et autocollants.',4),(46,'Ton album est prêt — montre-le à ta famille !',5),
(47,'Télécharge ou dessine un gabarit de calendrier.',0),(47,'Écris les mois et les jours.',1),(47,'Illustre chaque mois avec un dessin ou une photo.',2),(47,'Colorie et décore les pages.',3),(47,'Relie les pages ensemble. Ton calendrier est prêt !',4),
(48,'Installe-toi devant le miroir ou la glace.',0),(48,'Observe ton visage — sa forme, ses couleurs, ses expressions.',1),(48,'Dessine les grandes formes d''abord (ovale du visage, yeux...).',2),(48,'Ajoute les détails et les couleurs que tu veux.',3),(48,'Signe ton portrait. C''est toi, vu par toi !',4),
-- origami
(49,'Prends une feuille carrée de papier origami.',0),(49,'Plie en diagonale pour former un triangle.',1),(49,'Suis les étapes du pliage de ton choix (bateau, grenouille...).',2),(49,'Fais les derniers plis pour finaliser la forme.',3),(49,'Montre ta création à quelqu''un !',4),
(50,'Découpe des bandes de papier crépon de 15 cm.',0),(50,'Prends 5 bandes et superpose-les.',1),(50,'Noue un fil au milieu du paquet.',2),(50,'Sépare chaque feuille délicatement vers le haut.',3),(50,'Arrondis les bords avec les doigts. Ta fleur est prête !',4),
-- cuisine
(51,'Prépare les biscuits et les différentes couleurs de glaçage.',0),(51,'Verse le glaçage sur le biscuit avec une cuillère.',1),(51,'Ajoute des décorations sucrées avant que le glaçage sèche.',2),(51,'Laisse sécher 15 minutes.',3),(51,'Emballe et offre, ou mange avec plaisir !',4),
(52,'Lave et coupe les fruits.',0),(52,'Mets les fruits dans le blender.',1),(52,'Ajoute du yaourt ou lait végétal.',2),(52,'Mixe jusqu''à obtenir une texture lisse.',3),(52,'Verse dans un verre et décore avec un fruit. Santé !',4),
(53,'Mesure le gros sel dans un bol.',0),(53,'Ajoute quelques gouttes de colorant alimentaire.',1),(53,'Mélange bien avec une cuillère.',2),(53,'Ajoute les herbes séchées et mélange à nouveau.',3),(53,'Verse dans un bocal et ferme. Ton sel décoratif est prêt à offrir !',4),
-- relaxation
(54,'Ouvre ton carnet et prends un moment de silence.',0),(54,'Pense à comment tu te sens en ce moment.',1),(54,'Dessine, écris, ou colle une image qui représente cette émotion.',2),(54,'Ferme le carnet — c''est ton espace, personne n''a à le voir.',3),
(55,'Verse le sable dans le bac plat.',0),(55,'Place quelques galets dans le sable.',1),(55,'Utilise le mini râteau pour tracer des lignes et des cercles.',2),(55,'Laisse libre cours — il n''y a pas de bonne manière de faire.',3),(55,'Respire lentement et profite du moment de calme.',4),
-- informatique
(56,'Ouvre le logiciel Paint sur l''ordinateur.',0),(56,'Choisis une couleur et un outil (pinceau, forme...).',1),(56,'Dessine ce que tu veux — une maison, un visage, un paysage.',2),(56,'Utilise l''outil "remplissage" pour colorier les zones.',3),(56,'Enregistre ton dessin et imprime-le si tu veux !',4),
(57,'Ouvre Canva ou Word sur l''ordinateur.',0),(57,'Choisis un modèle de carte qui te plaît.',1),(57,'Change les couleurs et le texte pour personnaliser.',2),(57,'Ajoute des images ou photos si tu veux.',3),(57,'Enregistre et imprime ta carte. Elle est prête à offrir !',4),
(58,'Ouvre Google Slides ou PowerPoint.',0),(58,'Crée une nouvelle présentation.',1),(58,'Insère tes photos préférées — une par diapositive.',2),(58,'Ajoute un titre ou une légende sous chaque photo.',3),(58,'Lance le diaporama et montre-le à quelqu''un !',4),
(59,'Ouvre le navigateur et va sur un site de jeux de mémoire.',0),(59,'Choisis un niveau facile pour commencer.',1),(59,'Retourne les cartes deux par deux pour trouver les paires.',2),(59,'Continue jusqu''à trouver toutes les paires. Bravo !',3),
(60,'Rassemble tes photos préférées sur l''ordinateur.',0),(60,'Ouvre Canva et choisis un modèle de collage photo.',1),(60,'Glisse tes photos dans les espaces du modèle.',2),(60,'Ajoute des stickers ou textes si tu veux.',3),(60,'Télécharge et imprime ton collage !',4),
(61,'Va sur incredibox.com dans le navigateur.',0),(61,'Glisse des personnages sur la scène pour les activer.',1),(61,'Essaie différentes combinaisons pour créer ta mélodie.',2),(61,'Quand tu aimes ce que tu entends, enregistre et partage !',3),
(62,'Ouvre l''appli enregistreur vocal de ton téléphone ou ordinateur.',0),(62,'Appuie sur le bouton rouge pour commencer à enregistrer.',1),(62,'Parle, chante ou raconte une histoire dans le micro.',2),(62,'Appuie sur stop et réécoute-toi.',3),(62,'Partage ton enregistrement si tu veux !',4),
(63,'Pense à une histoire courte avec un début, milieu et fin.',0),(63,'Écris ou dicte l''histoire phrase par phrase.',1),(63,'Cherche des images sur internet pour illustrer chaque partie.',2),(63,'Insère les images à côté du texte.',3),(63,'Lis ton histoire à voix haute à quelqu''un !',4),
(64,'Va sur piskelapp.com dans le navigateur.',0),(64,'Crée une nouvelle image en taille 16x16 pixels.',1),(64,'Choisis une couleur et clique sur les cases pour dessiner.',2),(64,'Zoome sur ton dessin pour voir le résultat.',3),(64,'Télécharge et imprime ton pixel art !',4),
(65,'Choisis les objets ou figurines que tu veux animer.',0),(65,'Pose ton téléphone fixe (utilise un support si possible).',1),(65,'Photographie la scène initiale.',2),(65,'Déplace légèrement les objets et reprends une photo.',3),(65,'Répète 10 à 15 fois en bougeant progressivement.',4),(65,'Importe les photos dans une app stop-motion et lance l''animation !',5);


-- ============================================================
-- AGES
-- ============================================================
INSERT INTO activite_ages (activite_id, ages) VALUES
(1,'enfant'),(1,'ado'),(1,'adulte'),
(2,'ado'),(2,'adulte'),
(3,'enfant'),(3,'ado'),(3,'adulte'),
(4,'enfant'),(4,'ado'),(4,'adulte'),
(5,'ado'),(5,'adulte'),
(6,'ado'),(6,'adulte'),
(7,'enfant'),(7,'ado'),(7,'adulte'),
(8,'ado'),(8,'adulte'),
(9,'enfant'),(9,'ado'),(9,'adulte'),
(10,'enfant'),(10,'ado'),(10,'adulte'),
(11,'ado'),(11,'adulte'),
(12,'enfant'),(12,'ado'),(12,'adulte'),
(13,'enfant'),(13,'ado'),(13,'adulte'),
(14,'enfant'),(14,'ado'),
(15,'enfant'),(15,'ado'),(15,'adulte'),
(16,'enfant'),(16,'ado'),(16,'adulte'),
(17,'enfant'),(17,'ado'),(17,'adulte'),
(18,'ado'),(18,'adulte'),
(19,'ado'),(19,'adulte'),
(20,'enfant'),(20,'ado'),(20,'adulte'),
(21,'ado'),(21,'adulte'),
(22,'enfant'),(22,'ado'),(22,'adulte'),
(23,'ado'),(23,'adulte'),
(24,'enfant'),(24,'ado'),
(25,'enfant'),(25,'ado'),(25,'adulte'),
(26,'enfant'),(26,'ado'),(26,'adulte'),
(27,'enfant'),(27,'ado'),(27,'adulte'),
(28,'enfant'),(28,'ado'),(28,'adulte'),
(29,'ado'),(29,'adulte'),
(30,'enfant'),(30,'ado'),(30,'adulte'),
(31,'ado'),(31,'adulte'),
(32,'ado'),(32,'adulte'),
(33,'ado'),(33,'adulte'),
(34,'enfant'),(34,'ado'),(34,'adulte'),
(35,'ado'),(35,'adulte'),
(36,'ado'),(36,'adulte'),
(37,'ado'),(37,'adulte'),
(38,'enfant'),(38,'ado'),
(39,'enfant'),(39,'ado'),(39,'adulte'),
(40,'enfant'),(40,'ado'),(40,'adulte'),
(41,'ado'),(41,'adulte'),
(42,'enfant'),(42,'ado'),
(43,'ado'),(43,'adulte'),
(44,'enfant'),(44,'ado'),(44,'adulte'),
(45,'ado'),(45,'adulte'),
(46,'ado'),(46,'adulte'),
(47,'ado'),(47,'adulte'),
(48,'ado'),(48,'adulte'),
(49,'enfant'),(49,'ado'),
(50,'enfant'),(50,'ado'),(50,'adulte'),
(51,'enfant'),(51,'ado'),(51,'adulte'),
(52,'enfant'),(52,'ado'),(52,'adulte'),
(53,'ado'),(53,'adulte'),
(54,'ado'),(54,'adulte'),
(55,'ado'),(55,'adulte'),
(56,'enfant'),(56,'ado'),(56,'adulte'),
(57,'ado'),(57,'adulte'),
(58,'ado'),(58,'adulte'),
(59,'enfant'),(59,'ado'),(59,'adulte'),
(60,'ado'),(60,'adulte'),
(61,'enfant'),(61,'ado'),(61,'adulte'),
(62,'enfant'),(62,'ado'),(62,'adulte'),
(63,'ado'),(63,'adulte'),
(64,'enfant'),(64,'ado'),(64,'adulte'),
(65,'ado'),(65,'adulte');


-- ============================================================
-- GOÛTS
-- ============================================================
INSERT INTO activite_gouts (activite_id, gouts) VALUES
(1,'bijoux'),(1,'offrir'),
(2,'bijoux'),(2,'nature'),(2,'offrir'),
(3,'creer'),(3,'couleurs'),(3,'nature'),(3,'recup'),
(4,'calme'),(4,'couleurs'),(4,'creer'),
(5,'construire'),(5,'nature'),
(6,'construire'),(6,'creer'),
(7,'couleurs'),(7,'offrir'),(7,'creer'),
(8,'construire'),(8,'couleurs'),
(9,'recup'),(9,'couleurs'),(9,'creer'),(9,'offrir'),
(10,'couleurs'),(10,'creer'),
(11,'couleurs'),(11,'creer'),(11,'calme'),
(12,'couleurs'),(12,'creer'),
(13,'couleurs'),(13,'creer'),
(14,'couleurs'),(14,'creer'),(14,'nature'),
(15,'couleurs'),(15,'calme'),
(16,'couleurs'),(16,'creer'),(16,'nature'),(16,'offrir'),
(17,'couleurs'),(17,'creer'),
(18,'couleurs'),(18,'creer'),(18,'recup'),
(19,'creer'),(19,'offrir'),
(20,'creer'),(20,'offrir'),
(21,'creer'),(21,'couleurs'),
(22,'creer'),(22,'calme'),
(23,'creer'),(23,'nature'),
(24,'creer'),(24,'couleurs'),
(25,'creer'),(25,'offrir'),
(26,'nature'),(26,'calme'),
(27,'nature'),(27,'calme'),
(28,'nature'),(28,'creer'),
(29,'nature'),(29,'calme'),
(30,'calme'),
(31,'nature'),(31,'calme'),(31,'offrir'),
(32,'couleurs'),(32,'creer'),(32,'calme'),
(33,'creer'),(33,'offrir'),
(34,'creer'),(34,'offrir'),
(35,'creer'),(35,'couleurs'),
(36,'couleurs'),(36,'creer'),(36,'offrir'),
(37,'creer'),(37,'couleurs'),
(38,'creer'),
(39,'creer'),
(40,'creer'),
(41,'creer'),(41,'calme'),
(42,'construire'),(42,'creer'),(42,'recup'),
(43,'recup'),(43,'creer'),(43,'couleurs'),
(44,'recup'),(44,'couleurs'),(44,'creer'),
(45,'recup'),(45,'creer'),(45,'couleurs'),
(46,'creer'),(46,'offrir'),
(47,'creer'),(47,'offrir'),
(48,'creer'),(48,'couleurs'),
(49,'creer'),(49,'calme'),
(50,'creer'),(50,'couleurs'),(50,'offrir'),
(51,'creer'),(51,'offrir'),
(52,'creer'),(52,'nature'),
(53,'creer'),(53,'nature'),(53,'offrir'),
(54,'calme'),(54,'creer'),
(55,'calme'),(55,'creer'),
(56,'creer'),(56,'couleurs'),
(57,'creer'),(57,'offrir'),
(58,'creer'),
(59,'calme'),
(60,'creer'),(60,'offrir'),
(61,'creer'),(61,'calme'),
(62,'creer'),
(63,'creer'),
(64,'creer'),(64,'couleurs'),
(65,'creer'),(65,'construire');


-- ============================================================
-- MOTRICITÉ
-- ============================================================
INSERT INTO activite_motric (activite_id, motric) VALUES
(1,'fine'),(1,'aide'),
(2,'fine'),(2,'aide'),
(3,'large'),(3,'fine'),(3,'aide'),
(4,'large'),(4,'aide'),
(5,'large'),(5,'aide'),
(6,'large'),(6,'aide'),
(7,'fine'),(7,'large'),(7,'aide'),
(8,'large'),(8,'aide'),
(9,'large'),(9,'fine'),
(10,'large'),(10,'aide'),
(11,'large'),(11,'aide'),
(12,'large'),(12,'aide'),
(13,'large'),(13,'aide'),
(14,'large'),(14,'aide'),
(15,'fine'),(15,'aide'),
(16,'fine'),(16,'aide'),
(17,'large'),(17,'aide'),
(18,'fine'),(18,'aide'),
(19,'fine'),(19,'aide'),
(20,'fine'),(20,'aide'),
(21,'fine'),(21,'aide'),
(22,'large'),(22,'aide'),
(23,'large'),(23,'aide'),
(24,'large'),(24,'fine'),
(25,'large'),(25,'aide'),
(26,'large'),(26,'aide'),
(27,'large'),(27,'fine'),
(28,'large'),(28,'aide'),
(29,'large'),(29,'fine'),
(30,'large'),(30,'aide'),
(31,'fine'),(31,'aide'),
(32,'large'),(32,'aide'),
(33,'fine'),(33,'aide'),
(34,'fine'),(34,'large'),
(35,'fine'),(35,'aide'),
(36,'fine'),(36,'aide'),
(37,'fine'),(37,'aide'),
(38,'fine'),(38,'aide'),
(39,'large'),(39,'aide'),
(40,'large'),(40,'aide'),
(41,'large'),(41,'aide'),
(42,'large'),(42,'aide'),
(43,'fine'),(43,'aide'),
(44,'large'),(44,'aide'),
(45,'large'),(45,'aide'),
(46,'fine'),(46,'aide'),
(47,'fine'),(47,'aide'),
(48,'fine'),(48,'large'),
(49,'fine'),(49,'aide'),
(50,'fine'),(50,'aide'),
(51,'fine'),(51,'aide'),
(52,'large'),(52,'aide'),
(53,'large'),(53,'aide'),
(54,'fine'),(54,'aide'),
(55,'large'),(55,'aide'),
(56,'fine'),(56,'aide'),(56,'sais_pas'),
(57,'fine'),(57,'aide'),(57,'sais_pas'),
(58,'fine'),(58,'aide'),(58,'sais_pas'),
(59,'fine'),(59,'aide'),(59,'sais_pas'),
(60,'fine'),(60,'aide'),(60,'sais_pas'),
(61,'fine'),(61,'aide'),(61,'sais_pas'),
(62,'fine'),(62,'aide'),(62,'sais_pas'),
(63,'fine'),(63,'aide'),(63,'sais_pas'),
(64,'fine'),(64,'aide'),(64,'sais_pas'),
(65,'fine'),(65,'aide'),(65,'sais_pas');


-- ============================================================
-- TAGS
-- ============================================================
INSERT INTO activite_tags (activite_id, tags) VALUES
(1,'Bijou'),(1,'Perles'),(1,'Offrir'),
(2,'Bijou'),(2,'Nature'),
(3,'Collage'),(3,'Couleurs'),
(4,'Argile'),(4,'Calme'),
(5,'Bois'),(5,'Nature'),
(6,'Bois'),(6,'Construction'),
(7,'Peinture'),(7,'Offrir'),
(8,'Bois'),(8,'Déco'),
(9,'Récup'),(9,'Couleurs'),
(10,'Peinture'),(10,'Sensoriel'),
(11,'Peinture'),(11,'Aquarelle'),
(12,'Peinture'),(12,'Sensoriel'),
(13,'Peinture'),(13,'Rouleau'),
(14,'Peinture'),(14,'Nature'),(14,'Sensoriel'),
(15,'Coloriage'),(15,'Calme'),(15,'Mandala'),
(16,'Peinture'),(16,'Nature'),(16,'Offrir'),
(17,'Peinture'),(17,'Texture'),
(18,'Collage'),(18,'Mosaïque'),
(19,'Collage'),(19,'Mémoire'),(19,'Offrir'),
(20,'Collage'),(20,'Offrir'),
(21,'Papier'),(21,'Déco'),
(22,'Argile'),(22,'Sensoriel'),
(23,'Argile'),(23,'Nature'),
(24,'Modelage'),(24,'Couleurs'),
(25,'Argile'),(25,'Sensoriel'),(25,'Offrir'),
(26,'Nature'),(26,'Jardinage'),
(27,'Nature'),(27,'Jardinage'),
(28,'Nature'),(28,'Déco'),
(29,'Nature'),(29,'Jardinage'),
(30,'Sensoriel'),(30,'Calme'),
(31,'Nature'),(31,'Sensoriel'),(31,'Offrir'),
(32,'Peinture'),(32,'Musique'),
(33,'Textile'),(33,'Offrir'),
(34,'Bois'),(34,'Déco'),(34,'Offrir'),
(35,'Textile'),(35,'Tissage'),
(36,'Textile'),(36,'Couleurs'),
(37,'Textile'),(37,'Récup'),
(38,'Textile'),(38,'Jeu'),
(39,'Musique'),(39,'Récup'),
(40,'Musique'),(40,'Récup'),
(41,'Musique'),(41,'Dessin'),
(42,'Récup'),(42,'Construction'),
(43,'Récup'),(43,'Déco'),
(44,'Récup'),(44,'Déco'),
(45,'Récup'),(45,'Déco'),
(46,'Photo'),(46,'Mémoire'),
(47,'Photo'),(47,'Calendrier'),
(48,'Dessin'),(48,'Portrait'),
(49,'Origami'),(49,'Papier'),
(50,'Papier'),(50,'Fleurs'),
(51,'Cuisine'),(51,'Offrir'),
(52,'Cuisine'),(52,'Nature'),
(53,'Cuisine'),(53,'Nature'),(53,'Offrir'),
(54,'Calme'),(54,'Émotions'),
(55,'Calme'),(55,'Sensoriel'),
(56,'Informatique'),(56,'Dessin'),(56,'Numérique'),
(57,'Informatique'),(57,'Offrir'),(57,'Numérique'),
(58,'Informatique'),(58,'Photo'),(58,'Numérique'),
(59,'Informatique'),(59,'Jeu'),(59,'Numérique'),
(60,'Informatique'),(60,'Photo'),(60,'Numérique'),
(61,'Informatique'),(61,'Musique'),(61,'Numérique'),
(62,'Informatique'),(62,'Expression'),(62,'Numérique'),
(63,'Informatique'),(63,'Écriture'),(63,'Numérique'),
(64,'Informatique'),(64,'Dessin'),(64,'Numérique'),
(65,'Informatique'),(65,'Vidéo'),(65,'Numérique');