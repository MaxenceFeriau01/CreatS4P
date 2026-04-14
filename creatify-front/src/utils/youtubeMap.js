// ─── Map YouTube pour les 65 activités CreatS4pY ───────────────────────────
// Chaque entrée = { id: activite_id, query: "terme de recherche YouTube" }
// Le composant YoutubeSection utilise ces termes pour générer l'URL embed de recherche.

export const YOUTUBE_MAP = {
  // ── BIJOUX & PERLES ──────────────────────────────────────────────
  1:  "tuto bracelet perles elastique enfant facile",
  2:  "tuto collier perles bois naturel DIY",

  // ── COLLAGE & PAPIER ─────────────────────────────────────────────
  3:  "tuto collage nature magazine fleurs séchées enfant",
  18: "tuto mosaïque papier coloré colle enfant",
  19: "tuto livre album souvenirs photos enfant",
  20: "tuto carte relief papier froissé tissu",
  21: "tuto mobile papier suspendu DIY enfant",
  49: "tuto origami facile enfant débutant grenouille bateau",
  50: "tuto fleurs papier crépon facile",

  // ── ARGILE & MODELAGE ────────────────────────────────────────────
  4:  "tuto bougeoir argile autodurcissante facile",
  22: "tuto bol argile pincé technique débutant",
  23: "tuto plaque argile empreinte feuilles",
  24: "tuto figurine pâte à modeler personnage animal enfant",
  25: "tuto empreinte mains plâtre souvenir enfant",

  // ── BOIS & CONSTRUCTION ──────────────────────────────────────────
  5:  "tuto jardinière bois simple bricolage débutant",
  6:  "tuto banc bois simple planches vis",
  7:  "tuto cadre photo bois décoré peinture",
  8:  "tuto porte manteau bois crochets DIY",

  // ── PEINTURE ─────────────────────────────────────────────────────
  10: "tuto peinture doigts enfant activité sensorielle",
  11: "tuto aquarelle sel effet magique enfant",
  12: "tuto peinture soufflée paille encre enfant",
  13: "tuto peinture rouleau mousse enfant facile",
  14: "tuto tampons légumes peinture pomme enfant",
  15: "tuto coloriage mandala adulte apaisant",
  16: "tuto peinture galet acrylique décoratif",
  17: "tuto peinture éponge texture tableau enfant",
  32: "tuto peinture musique libre expression créative",
  48: "tuto autoportrait miroir peinture couleur enfant",

  // ── NATURE & JARDINAGE ───────────────────────────────────────────
  9:  "tuto vase bocal récup ficelle peinture DIY",
  26: "tuto semis pot graines aromatiques enfant",
  27: "tuto herbier plantes pressées cahier",
  28: "tuto attrape soleil feuilles fleurs séchées plastique",
  29: "tuto terrarium bocal plantes grasses succulent",

  // ── SENSORIEL & BIEN-ÊTRE ────────────────────────────────────────
  30: "tuto bac sensoriel textures enfant activité calme",
  31: "tuto bouquet fleurs séchées assembler",
  33: "tuto pochette tissu feutres décoration",
  34: "tuto boite bois décorée peinte acrylique",
  54: "tuto carnet émotions art thérapie enfant",
  55: "tuto jardin zen miniature sable galets râteau",

  // ── TEXTILE & COUTURE ────────────────────────────────────────────
  35: "tuto tissage cadre carton laine enfant débutant",
  36: "tuto décoration tshirt feutres tissu",
  37: "tuto tapis nouettes tissu canevas facile",
  38: "tuto marionnette chaussette boutons enfant",

  // ── MUSIQUE & RYTHME ─────────────────────────────────────────────
  39: "tuto tambourin assiette carton grelots enfant",
  40: "tuto maracas bouteille riz enfant instrument",
  41: "tuto illustration dessin musique écoute",

  // ── RÉCUPÉRATION & RECYCLAGE ─────────────────────────────────────
  42: "tuto robot carton boîtes enfant recyclage",
  43: "tuto mobile bouchons liège peints suspendu",
  44: "tuto lampion bocal papier soie bougie LED",
  45: "tuto tableau capsules café capsules peinture",

  // ── PHOTOGRAPHIE & EXPRESSION ────────────────────────────────────
  46: "tuto album photo commenté souvenirs légendes",
  47: "tuto calendrier personnalisé photos dessins",

  // ── CUISINE CRÉATIVE ─────────────────────────────────────────────
  51: "tuto décoration biscuits glaçage coloré facile",
  52: "tuto smoothie coloré fruits légumes enfant",
  53: "tuto sel aromatisé coloré bocal offrir",

  // ── INFORMATIQUE & NUMÉRIQUE ─────────────────────────────────────
  56: "tuto dessin numérique logiciel Paint débutant enfant",
  57: "tuto carte voeux numérique Canva facile",
  58: "tuto diaporama photos Google Slides PowerPoint facile",
  59: "jeux mémoire en ligne gratuit enfant stimulation",
  60: "tuto collage photo numérique Canva facile",
  61: "tuto Incredibox composer musique facile",
  62: "tuto enregistrement vocal téléphone histoire chanson",
  63: "tuto histoire illustrée numérique enfant texte images",
  64: "tuto pixel art débutant piskelapp facile",
  65: "tuto stop motion animation facile téléphone enfant",
}

// ─── Génère l'URL embed YouTube Search pour une query ──────────────────────
export function getYoutubeEmbedUrl(activiteId) {
  const query = YOUTUBE_MAP[activiteId]
  if (!query) return null
  return `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(query)}&rel=0&modestbranding=1`
}

// ─── Génère l'URL de recherche YouTube (lien externe) ──────────────────────
export function getYoutubeSearchUrl(activiteId, titreFallback = '') {
  const query = YOUTUBE_MAP[activiteId] || `tuto activité créative ${titreFallback}`
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}