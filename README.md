# 🏠 Digitální znalecký posudek – Moderní webová aplikace

Profesionální webová aplikace pro prezentaci a analýzu znaleckého posudku nemovitosti s moderním designem, interaktivními prvky a pokročilou kalkulačkou cen.

## 🌐 Live Demo / Nasazení

**📍 Repositář**: [github.com/MEVERIK-SOLUTION/a_final_hanka_odhad](https://github.com/MEVERIK-SOLUTION/a_final_hanka_odhad)

**🚀 Nasazení webu**: Podívejte se do souboru [DEPLOYMENT.md](DEPLOYMENT.md) pro kompletní instrukce, jak nasadit web na:
- Vercel (doporučeno) - `https://a-final-hanka-odhad.vercel.app`
- Netlify - `https://a-final-hanka-odhad.netlify.app`
- GitHub Pages - `https://meverik-solution.github.io/a-final-hanka-odhad`

> **Poznámka**: Web je připraven k okamžitému nasazení! Stačí vybrat platformu a kliknout na "Deploy".

## ✨ Hlavní funkce

- 📊 **Interaktivní kalkulačka** - Pokročilý výpočet ceny s více metodami, historií a exportem
- 📈 **Vizualizace dat** - Grafy a tabulky pro srovnání cen
- 🎨 **Moderní design** - Gradientní pozadí, animace a responzivní layout
- 📱 **Mobile-first** - Optimalizováno pro všechna zařízení
- 🌙 **Dark mode** - Podpora tmavého režimu pomocí CSS proměnných
- ♿ **Přístupnost** - ARIA labels a sémantické HTML
- 💾 **Local Storage** - Ukládání historie výpočtů
- 🖨️ **Print-friendly** - Optimalizované styly pro tisk

## 🗂 Struktura projektu

```
├── index.html          # Úvodní stránka s hero sekcí a feature cards
├── posudek.html        # Znalecký posudek s detailními specifikacemi
├── reakce.html         # Odborná reakce s komentáři expertů
├── kritika.html        # Kritika s vizuální analýzou cen
├── analyza.html        # Analýza lokality s pros/cons listy
├── report.html         # Souhrnný report ke stažení
├── kalkulacka.html     # Pokročilá kalkulačka s více scénáři
├── assets/
│   ├── style.css       # Kompletní CSS se všemi komponenty
│   └── script.js       # JavaScript pro kalkulačku a interaktivitu
├── vercel.json         # Konfigurace pro Vercel
├── .gitignore          # Ignorované soubory
└── README.md           # Dokumentace projektu
```

## 🚀 Rychlý start

### Lokální vývoj

1. **Klonujte repozitář**
   ```bash
   git clone https://github.com/MEVERIK-SOLUTION/a_final_hanka_odhad.git
   cd a_final_hanka_odhad
   ```

2. **Otevřete v prohlížeči**
   - Dvojklik na `index.html` nebo
   - Použijte lokální server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (pokud máte npx)
     npx serve
     ```
   - Otevřete `http://localhost:8000`

### Nasazení na Vercel

1. Přihlaste se na [Vercel.com](https://vercel.com)
2. Klikněte na **New Project**
3. Importujte tento GitHub repozitář
4. Vercel automaticky detekuje statický web a provede nasazení
5. Váš web bude dostupný na `https://nazev-projektu.vercel.app`

### Nasazení na Netlify

1. Přihlaste se na [Netlify.com](https://netlify.com)
2. Klikněte na **Add new site** → **Import from Git**
3. Vyberte tento GitHub repozitář
4. Netlify automaticky nasadí web
5. Váš web bude dostupný na `https://nazev-projektu.netlify.app`

### Nasazení na GitHub Pages

1. Přejděte do **Settings** → **Pages**
2. Zvolte branch (obvykle `main`) a složku `/ (root)`
3. Klikněte na **Save**
4. Web bude dostupný na `https://username.github.io/a_final_hanka_odhad`

## 🎨 Design systém

Aplikace používá profesionální design systém s CSS proměnnými:

- **Barevná paleta**: Moderní gradientní schéma s primárními a sekundárními barvami
- **Typografie**: Segoe UI / SF Pro s hierarchií nadpisů
- **Komponenty**: Cards, buttons, forms, tables s konzistentním stylem
- **Animace**: Smooth transitions a hover efekty
- **Layout**: Flexbox a CSS Grid pro responzivní uspořádání

## 💻 Použití kalkulačky

### Základní výpočet
1. Zadejte plochu nemovitosti v m²
2. Zadejte cenu za m²
3. Klikněte na **Spočítat**
4. Zobrazí se odhadovaná cena

### Pokročilé funkce
- **Historie výpočtů**: Automaticky se ukládá do local storage
- **Export dat**: Exportujte výsledky jako textový soubor
- **Více metod výpočtu**: Porovnávací metoda, nákladová metoda, výnosová metoda
- **Analýza cen**: Grafické znázornění rozložení ceny

## 🛠 Technologie

- **HTML5** - Sémantické značky, ARIA atributy
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** - Bez závislostí, čistý ES6+
- **Local Storage API** - Ukládání dat v prohlížeči
- **Responsive Design** - Mobile-first přístup

## ♿ Přístupnost

- Sémantické HTML5 elementy
- ARIA labels a role
- Klávesová navigace
- Vysoký kontrast textu
- Responzivní velikosti písma
- Alt texty pro obrázky

## 🔧 Přizpůsobení

### Změna barev
Upravte CSS proměnné v `:root` v souboru `assets/style.css`:

```css
:root {
  --primary-color: #2b5396;
  --secondary-color: #2c78a0;
  /* další proměnné... */
}
```

### Přidání nové stránky
1. Vytvořte nový HTML soubor v kořenovém adresáři
2. Zkopírujte strukturu z existující stránky
3. Přidejte odkaz do `<nav>` ve všech stránkách
4. Aktualizujte `script.js` pro active link detection

## 📄 Licence

Tento projekt je ukázkou pro demonstrační účely. Pro reálné použití nahraďte všechny ukázkové texty a data skutečnými informacemi.

## 👥 Autoři

MEVERIK SOLUTION © 2026

## 📞 Podpora

Pro dotazy a podporu kontaktujte autory projektu.

---

**Poznámka**: Tato aplikace je statická a nevyžaduje backend. Všechna data jsou uložena lokálně v prohlížeči pomocí Local Storage API.
