# Digitální znalecký posudek – statická webová aplikace

Tento repozitář obsahuje jednoduchou demonstrační aplikaci pro prezentaci
znaleckého posudku nemovitosti. Strukturovaná složka `webapp/` zahrnuje
několik statických HTML stránek, sdílené styly a skript pro kalkulačku.
Projekt je postaven tak, aby bylo možné jej snadno hostovat na
platformách jako **Vercel**, **Netlify** nebo **GitHub Pages**.

## 🗂 Struktura projektu

- `index.html` – úvodní stránka s přehledem všech částí aplikace.
- `posudek.html` – vstupní znalecký posudek s popisem nemovitosti.
- `reakce.html` – naše odborná reakce na původní posudek.
- `kritika.html` – kritika posudku a nový cenový odhad.
- `analyza.html` – analýza lokality a okolí nemovitosti.
- `report.html` – souhrnný report shrnující veškeré výstupy.
- `kalkulacka.html` – interaktivní kalkulačka pro výpočet ceny.
- `assets/style.css` – sdílené styly pro všechny stránky.
- `assets/script.js` – JavaScript pro kalkulačku.
- `vercel.json` – jednoduchá konfigurace pro Vercel (volitelné).

### Konfigurace pro Vercel

Soubor `vercel.json` říká Vercelu, že se jedná o statický web bez build
příkazu. Platforma automaticky servíruje všechny soubory z kořene
projektu. Pokud budete přejmenovávat složky či přidávat build proces,
nezapomeňte náležitě upravit `vercel.json`.

## 🚀 Nasazení na Netlify (alternativa k Vercelu)

1. Přihlaste se na [Netlify](https://netlify.com/) a klikněte na **Add new site**.
2. Zvolte **Deploy manually**.
3. Nahrajte **veškerý obsah** tohoto adresáře (včetně všech HTML, složky `assets` a `vercel.json`) –
   nikoli celé adresáře jako ZIP, ale jeho rozbalený obsah.
4. Netlify automaticky nasadí web a poskytne vám URL adresu.

## 📦 Jak připravit repozitář pro Vercel

1. Vytvořte nový repozitář na GitHubu.
2. Nahrajte obsah složky `webapp/` do kořenové úrovně repozitáře (tzn. `index.html`,
   podstránkové HTML soubory, složku `assets/` a `vercel.json`).
3. Na [Vercel.com/import/git](https://vercel.com/import/git) připojte svůj repozitář.
4. Vercel rozpozná, že se jedná o statický web, a provede nasazení.

Po úspěšném nasazení bude vaše aplikace dostupná na doméně ve tvaru
`https://nazev-projektu.vercel.app` nebo `https://nazev-projektu.netlify.app`.

---

🔧 Tento projekt slouží jako ukázka. Pro reálné použití rozšiřte obsah
jednotlivých stránek, nahraďte demonstrační texty skutečnými údaji a
případně doplňte další funkce.