# Dossier produits — Où déposer tes photos

Le site charge automatiquement les photos depuis ces dossiers. **Si une photo manque, un placeholder Unsplash s'affiche** — donc tu peux ajouter tes photos petit à petit, le site ne casse jamais.

## Convention de nommage

**Format préféré :** JPG, ≤ 200 KB, ratio 4:5 portrait (ex : 1200 × 1500 px) sur fond blanc/neutre. PNG accepté aussi (renomme l'extension dans le HTML si besoin).

```
site/assets/img/products/
├── medina/                    ← Sac à dos drawstring
│   ├── 1-main.jpg             ← photo principale (vue de face)
│   ├── 2-back.jpg             ← vue de dos / bretelles
│   ├── 3-detail.jpg           ← détail (couture, boucle, fermeture)
│   └── 4-worn.jpg             ← porté ou de côté
│
├── aicha/                     ← Mini sac à main barrel (rouge/bleu/cognac/noir)
│   ├── 1-main.jpg             ← cognac de face (photo héros)
│   ├── 2-back.jpg             ← vue de profil / sangle
│   ├── 3-detail.jpg           ← intérieur ou détail couture
│   └── 4-worn.jpg             ← la photo des 4 couleurs ensemble (rainbow shot)
│
└── atlas/                     ← Sac de voyage duffle (avec bandoulière)
    ├── 1-main.jpg             ← face avec bandoulière (la grande photo héros)
    ├── 2-back.jpg             ← profil ou autre angle
    ├── 3-detail.jpg           ← ouvert / intérieur
    └── 4-worn.jpg             ← le trio (3 sacs ensemble) ou porté
```

## Mapping recommandé à partir des photos que tu m'as envoyées

D'après tes 30+ photos je te suggère cette répartition :

### `medina/` — Sac à dos drawstring (les 3 photos avec rabat + sangles)
- `1-main.jpg` → la photo de face avec rabat fermé (sangle au centre)
- `2-back.jpg` → la photo arrière avec bretelles visibles
- `3-detail.jpg` → la photo 3/4 sur fond blanc qui montre la couture
- `4-worn.jpg` → une autre vue 3/4 ou ouverte si tu en as

### `aicha/` — Mini sac à main barrel (toutes les versions colorées)
- `1-main.jpg` → la version **cognac** de face, sangle bandoulière sortie
- `2-back.jpg` → vue de profil cognac ou rouge
- `3-detail.jpg` → photo de l'**intérieur ouvert** (montre la doublure)
- `4-worn.jpg` → la **photo "rainbow"** avec les 4 couleurs en arc-de-cercle (super pour la fiche produit + ads)

### `atlas/` — Sac de voyage duffle cognac
- `1-main.jpg` → la première photo avec bandoulière diagonale et boucle centrale (la plus iconique)
- `2-back.jpg` → vue de profil arrondi avec poche latérale
- `3-detail.jpg` → photo **ouverte** qui montre l'intérieur + zip
- `4-worn.jpg` → la photo du **trio** (3 sacs côte à côte) ou un autre angle premium

## Photos héros optionnelles

Tu peux aussi remplacer la photo du **hero principal** et la photo de la **tannerie Chouara** :

```
site/assets/img/
├── hero/
│   └── hero-bg.jpg            ← grande photo paysage cuir (1920×1080+) — utilisée en arrière-plan du hero
└── story/
    └── tannery-chouara.jpg    ← une photo verticale de la tannerie ou de l'atelier
```

Si elles manquent, on tombe sur les Unsplash actuelles.

## Comment uploader

- **Via Git** : `git add site/assets/img/products/medina/1-main.jpg && git commit -m "add medina main photo" && git push`
- **Via FTP/SFTP** sur ton hébergeur (Hostinger, OVH…) : dépose les fichiers au même chemin.
- **Via Netlify drop / Vercel** : refais un drag-and-drop du dossier `site/` complet.

## Bonus — optimisation

Avant d'uploader, passe chaque photo dans https://squoosh.app/ ou https://tinypng.com/ :
- Qualité JPG : 75-82
- Largeur max : 1500 px (page produit) / 900 px (cards collection)
- Cible : ≤ 200 KB par image (au-dessus tu pénalises ton ROAS sur mobile 3G).
