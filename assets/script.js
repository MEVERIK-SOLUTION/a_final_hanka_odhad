/*
 * Digitální znalecký posudek - Interaktivní funkce
 * Pokročilá kalkulačka, vizualizace dat, local storage a navigace
 */

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================
const CONFIG = {
  STORAGE_KEY: 'kalkulacka_history',
  MAX_HISTORY_ITEMS: 10,
  ANIMATION_DURATION: 300,
  CALCULATION_METHODS: {
    COMPARISON: 'porovnavaci',
    COST: 'nakladova',
    INCOME: 'vynosova'
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format number as Czech currency
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Format number with thousand separators
 */
function formatNumber(value) {
  return new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format date as Czech format
 */
function formatDate(date) {
  return new Intl.DateTimeFormat('cs-CZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Validate numeric input
 */
function validateNumber(value, min = 0, max = Infinity) {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Show error message
 */
function showError(message) {
  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.className = 'alert alert-error';
    resultDiv.textContent = message;
    resultDiv.classList.remove('hidden');
  }
}

/**
 * Show success message
 */
function showSuccess(message) {
  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.className = 'result';
    resultDiv.innerHTML = message;
    resultDiv.classList.remove('hidden', 'empty');
  }
}

// ============================================
// LOCAL STORAGE MANAGEMENT
// ============================================

const Storage = {
  /**
   * Get calculation history from local storage
   */
  getHistory() {
    try {
      const data = localStorage.getItem(CONFIG.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return [];
    }
  },

  /**
   * Save calculation to history
   */
  saveToHistory(calculation) {
    try {
      const history = this.getHistory();
      history.unshift({
        ...calculation,
        timestamp: new Date().toISOString()
      });
      
      // Keep only latest items
      const trimmedHistory = history.slice(0, CONFIG.MAX_HISTORY_ITEMS);
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(trimmedHistory));
      
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  },

  /**
   * Clear all history
   */
  clearHistory() {
    try {
      localStorage.removeItem(CONFIG.STORAGE_KEY);
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  },

  /**
   * Delete specific history item
   */
  deleteHistoryItem(index) {
    try {
      const history = this.getHistory();
      history.splice(index, 1);
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(history));
      return true;
    } catch (e) {
      console.error('Error deleting from localStorage:', e);
      return false;
    }
  }
};

// ============================================
// CALCULATION ENGINE
// ============================================

const Calculator = {
  /**
   * Basic calculation - Comparison method
   */
  calculateComparison(area, pricePerSqm) {
    const total = area * pricePerSqm;
    return {
      method: 'Porovnávací metoda',
      area,
      pricePerSqm,
      total,
      breakdown: {
        'Základní cena': total,
        'Rezerva (5%)': total * 0.05,
        'Celkem': total * 1.05
      }
    };
  },

  /**
   * Cost method calculation
   */
  calculateCost(area, pricePerSqm, buildingAge = 0) {
    const baseCost = area * pricePerSqm;
    const depreciation = Math.min(buildingAge * 0.02, 0.5); // Max 50% depreciation
    const depreciatedCost = baseCost * (1 - depreciation);
    
    return {
      method: 'Nákladová metoda',
      area,
      pricePerSqm,
      buildingAge,
      total: depreciatedCost,
      breakdown: {
        'Základní náklady': baseCost,
        'Opotřebení': -(baseCost * depreciation),
        'Po odečtu opotřebení': depreciatedCost,
        'Pozemek (20%)': depreciatedCost * 0.2,
        'Celkem': depreciatedCost * 1.2
      }
    };
  },

  /**
   * Income method calculation
   */
  calculateIncome(monthlyRent, yield_rate = 0.05) {
    const annualRent = monthlyRent * 12;
    const propertyValue = annualRent / yield_rate;
    
    return {
      method: 'Výnosová metoda',
      monthlyRent,
      yield_rate: yield_rate * 100,
      total: propertyValue,
      breakdown: {
        'Měsíční nájem': monthlyRent,
        'Roční nájem': annualRent,
        'Výnosnost': `${(yield_rate * 100).toFixed(1)}%`,
        'Celková hodnota': propertyValue
      }
    };
  }
};

// ============================================
// MAIN CALCULATOR FUNCTION
// ============================================

function calculatePrice() {
  // Get input values
  const area = parseFloat(document.getElementById('area')?.value);
  const pricePerSqm = parseFloat(document.getElementById('pricePerSqm')?.value);
  
  // Validate inputs
  if (!validateNumber(area, 1)) {
    showError('Prosím zadejte platnou plochu větší než 0 m².');
    return;
  }
  
  if (!validateNumber(pricePerSqm, 1)) {
    showError('Prosím zadejte platnou cenu za m² větší než 0 Kč.');
    return;
  }
  
  // Calculate using comparison method (default)
  const result = Calculator.calculateComparison(area, pricePerSqm);
  
  // Display result
  displayResult(result);
  
  // Save to history
  Storage.saveToHistory(result);
  
  // Update history display if present
  displayHistory();
}

/**
 * Display calculation result
 */
function displayResult(result) {
  const resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  
  const finalValue = result.breakdown['Celkem'] || result.total;
  
  let html = `
    <div style="margin-bottom: 1rem;">
      <strong>${result.method}</strong>
    </div>
    <div style="font-size: 2rem; margin-bottom: 1rem;">
      ${formatCurrency(finalValue)}
    </div>
  `;
  
  showSuccess(html);
  
  // Display breakdown if container exists
  displayBreakdown(result);
}

/**
 * Display price breakdown
 */
function displayBreakdown(result) {
  const breakdownDiv = document.getElementById('breakdown');
  if (!breakdownDiv) return;
  
  let html = '<div class="result-breakdown">';
  html += '<h3>Rozpis ceny</h3>';
  
  for (const [label, value] of Object.entries(result.breakdown)) {
    const formattedValue = typeof value === 'number' ? formatCurrency(value) : value;
    html += `
      <div class="result-item">
        <span>${label}</span>
        <span>${formattedValue}</span>
      </div>
    `;
  }
  
  html += '</div>';
  breakdownDiv.innerHTML = html;
}

/**
 * Display calculation history
 */
function displayHistory() {
  const historyDiv = document.getElementById('history');
  if (!historyDiv) return;
  
  const history = Storage.getHistory();
  
  if (history.length === 0) {
    historyDiv.innerHTML = '<p class="text-muted">Zatím nemáte žádnou historii výpočtů.</p>';
    return;
  }
  
  let html = '<div class="history-container">';
  html += '<h3>Historie výpočtů</h3>';
  
  history.forEach((item, index) => {
    const finalValue = item.breakdown?.['Celkem'] || item.total;
    const date = new Date(item.timestamp);
    
    html += `
      <div class="history-item">
        <div class="history-details">
          <div><strong>${item.method}</strong></div>
          <div style="font-size: 0.875rem; color: var(--text-muted);">
            ${formatDate(date)}
          </div>
          <div style="margin-top: 0.5rem;">
            ${item.area ? `Plocha: ${formatNumber(item.area)} m²` : ''}
            ${item.pricePerSqm ? ` | Cena: ${formatCurrency(item.pricePerSqm)}/m²` : ''}
          </div>
          <div style="font-weight: 600; color: var(--primary-700); margin-top: 0.5rem;">
            ${formatCurrency(finalValue)}
          </div>
        </div>
        <div class="history-actions">
          <button class="btn btn-sm btn-secondary" onclick="deleteHistory(${index})">
            Smazat
          </button>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  html += '<button class="btn btn-secondary mt-3" onclick="clearAllHistory()">Vymazat vše</button>';
  
  historyDiv.innerHTML = html;
}

/**
 * Delete single history item
 */
function deleteHistory(index) {
  if (Storage.deleteHistoryItem(index)) {
    displayHistory();
  }
}

/**
 * Clear all history
 */
function clearAllHistory() {
  if (confirm('Opravdu chcete vymazat celou historii výpočtů?')) {
    if (Storage.clearHistory()) {
      displayHistory();
    }
  }
}

/**
 * Export calculation data as text
 */
function exportData() {
  const history = Storage.getHistory();
  
  if (history.length === 0) {
    alert('Nejsou k dispozici žádná data pro export.');
    return;
  }
  
  let text = 'HISTORIE VÝPOČTŮ - DIGITÁLNÍ ZNALECKÝ POSUDEK\n';
  text += '='.repeat(50) + '\n\n';
  
  history.forEach((item, index) => {
    const finalValue = item.breakdown?.['Celkem'] || item.total;
    const date = new Date(item.timestamp);
    
    text += `${index + 1}. ${item.method}\n`;
    text += `   Datum: ${formatDate(date)}\n`;
    if (item.area) text += `   Plocha: ${formatNumber(item.area)} m²\n`;
    if (item.pricePerSqm) text += `   Cena za m²: ${formatCurrency(item.pricePerSqm)}\n`;
    text += `   Výsledná cena: ${formatCurrency(finalValue)}\n`;
    text += '\n';
  });
  
  // Create and download file
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `vysledky_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================
// CHART/VISUALIZATION
// ============================================

/**
 * Create simple bar chart for price comparison
 */
function createPriceChart(data) {
  const chartDiv = document.getElementById('priceChart');
  if (!chartDiv) return;
  
  const maxValue = Math.max(...data.map(item => item.value));
  
  let html = '<div class="chart-container">';
  html += '<h3>Srovnání cen</h3>';
  
  data.forEach(item => {
    const percentage = (item.value / maxValue) * 100;
    html += `
      <div class="chart-bar">
        <div class="chart-label">
          <span>${item.label}</span>
          <span>${formatCurrency(item.value)}</span>
        </div>
        <div class="chart-bar-fill" style="width: ${percentage}%">
          ${item.value.toLocaleString('cs-CZ')} Kč
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  chartDiv.innerHTML = html;
}

// ============================================
// NAVIGATION & PAGE DETECTION
// ============================================

/**
 * Highlight active navigation link
 */
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize app when DOM is ready
 */
function initApp() {
  // Highlight active navigation
  highlightActiveNav();
  
  // Display history on calculator page
  if (window.location.pathname.includes('kalkulacka')) {
    displayHistory();
  }
  
  // Initialize chart if data is present
  const chartData = window.chartData;
  if (chartData) {
    createPriceChart(chartData);
  }
  
  // Add export button handler if present
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportData);
  }
  
  console.log('App initialized successfully');
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ============================================
// ADVANCED CALCULATOR METHODS
// ============================================

/**
 * Calculate with cost method
 */
function calculateCostMethod() {
  const area = parseFloat(document.getElementById('area')?.value);
  const pricePerSqm = parseFloat(document.getElementById('pricePerSqm')?.value);
  const buildingAge = parseFloat(document.getElementById('buildingAge')?.value) || 0;
  
  if (!validateNumber(area, 1) || !validateNumber(pricePerSqm, 1)) {
    showError('Prosím zadejte platné hodnoty.');
    return;
  }
  
  const result = Calculator.calculateCost(area, pricePerSqm, buildingAge);
  displayResult(result);
  Storage.saveToHistory(result);
  displayHistory();
}

/**
 * Calculate with income method
 */
function calculateIncomeMethod() {
  const monthlyRent = parseFloat(document.getElementById('monthlyRent')?.value);
  const yieldRate = parseFloat(document.getElementById('yieldRate')?.value) / 100 || 0.05;
  
  if (!validateNumber(monthlyRent, 1)) {
    showError('Prosím zadejte platný měsíční nájem.');
    return;
  }
  
  const result = Calculator.calculateIncome(monthlyRent, yieldRate);
  displayResult(result);
  Storage.saveToHistory(result);
  displayHistory();
}

// ============================================
// STATISTICS & ANALYTICS
// ============================================

const Analytics = {
  /**
   * Calculate statistics from history
   */
  getStatistics() {
    const history = Storage.getHistory();
    if (history.length === 0) return null;
    
    const values = history.map(item => item.breakdown?.['Celkem'] || item.total);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    return {
      count: history.length,
      average: avg,
      max,
      min,
      total: sum
    };
  },
  
  /**
   * Display statistics
   */
  displayStatistics() {
    const statsDiv = document.getElementById('statistics');
    if (!statsDiv) return;
    
    const stats = this.getStatistics();
    if (!stats) {
      statsDiv.innerHTML = '<p class="text-muted">Zatím nejsou k dispozici statistiky.</p>';
      return;
    }
    
    statsDiv.innerHTML = `
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Statistiky výpočtů</h3>
        </div>
        <div class="result-breakdown">
          <div class="result-item">
            <span>Počet výpočtů</span>
            <span>${stats.count}</span>
          </div>
          <div class="result-item">
            <span>Průměrná cena</span>
            <span>${formatCurrency(stats.average)}</span>
          </div>
          <div class="result-item">
            <span>Nejvyšší cena</span>
            <span>${formatCurrency(stats.max)}</span>
          </div>
          <div class="result-item">
            <span>Nejnižší cena</span>
            <span>${formatCurrency(stats.min)}</span>
          </div>
        </div>
      </div>
    `;
  }
};

// Export functions for global use
window.calculatePrice = calculatePrice;
window.calculateCostMethod = calculateCostMethod;
window.calculateIncomeMethod = calculateIncomeMethod;
window.exportData = exportData;
window.deleteHistory = deleteHistory;
window.clearAllHistory = clearAllHistory;
window.smoothScrollTo = smoothScrollTo;
