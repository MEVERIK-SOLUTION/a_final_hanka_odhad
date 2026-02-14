/*
 * Skript pro jednoduchou kalkulačku odhadu ceny nemovitosti.
 * Funkce calculatePrice() je volána při odeslání formuláře na stránce kalkulacka.html
 * a vypočítá celkovou cenu podle zadané plochy a jednotkové ceny.
 */

function calculatePrice() {
  // načtení vstupních hodnot
  const area = parseFloat(document.getElementById('area').value);
  const pricePerSqm = parseFloat(document.getElementById('pricePerSqm').value);

  // validace vstupů
  if (isNaN(area) || area <= 0 || isNaN(pricePerSqm) || pricePerSqm <= 0) {
    alert('Prosím zadejte platná kladná čísla pro plochu i cenu za m².');
    return;
  }

  // výpočet výsledné ceny
  const total = area * pricePerSqm;

  // zobrazení výsledku ve formátu českého čísla
  const formatted = total.toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
  document.getElementById('result').textContent = `Odhadovaná cena nemovitosti: ${formatted} Kč`;
}