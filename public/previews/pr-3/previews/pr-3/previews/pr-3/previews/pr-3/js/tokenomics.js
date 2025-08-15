// Pi Easter Egg logic
document.addEventListener('DOMContentLoaded', function() {
  var pi = document.getElementById('pi-easter-egg');
  var modal = document.getElementById('pi-modal');
  var close = document.getElementById('pi-modal-close');
  var content = document.getElementById('pi-modal-content');
  if (pi && modal && close && content) {
    pi.addEventListener('click', function() {
      fetch('docs/knowledge_base/about.txt')
        .then(res => res.text())
        .then(text => {
          content.textContent = text;
          modal.style.display = 'block';
        });
    });
    close.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
});
// Tokenomics table and pie chart logic
// Tokenomics categories object
let tokenomicsCategories = {
  total_supply: { label: "Total Supply", value: null, percent: null },
  user_locked: { label: "User Locked", value: null, percent: null },
  sub_daos: { label: "Sub DAOs", value: null, percent: null },
  matching_funds: { label: "Matching Funds", value: null, percent: null },
  user_unlocked: { label: "User Unlocked", value: null, percent: null },
  burned: { label: "Burned", value: null, percent: null }
};
let pieChartInstance = null;

function updateTokenomicsTable() {
  for (const key in tokenomicsCategories) {
    const cat = tokenomicsCategories[key];
    const labelEl = document.getElementById(`${key}_label`);
    const valueEl = document.getElementById(`${key}_value`);
    const percentEl = document.getElementById(`${key}_percent`);
    if (labelEl) labelEl.textContent = cat.label;
    if (valueEl) valueEl.textContent = cat.value !== null ? cat.value.toLocaleString() : '–';
    if (percentEl) percentEl.textContent = cat.percent !== null ? cat.percent + '%' : '–';
  }
}

function fetchAndDisplayTokenomicsStats() {

  fetch('https://rpc.scan.openlibra.io/v1/view', {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      function: '0x1::supply::get_stats',
      type_arguments: [],
      arguments: []
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(data => {

      if (Array.isArray(data)) {
        // Calculate scaled values and total supply
        const scaledData = data.map(val => Math.floor(Number(val) / 1_000_000));
        const totalSupply = scaledData[0];
        const maxSupplyAtomic = 100_000_000_000 * 1_000_000;
        const totalSupplyAtomic = Number(data[0]);
        const burnedScaled = Math.floor((maxSupplyAtomic - totalSupplyAtomic) / 1_000_000);
        // Populate tokenomicsCategories object
        tokenomicsCategories.total_supply.value = totalSupply;
        tokenomicsCategories.total_supply.percent = totalSupply > 0 ? ((totalSupply / totalSupply) * 100).toFixed(2) : '–';
        tokenomicsCategories.user_locked.value = scaledData[1];
        tokenomicsCategories.user_locked.percent = totalSupply > 0 ? ((scaledData[1] / totalSupply) * 100).toFixed(2) : '–';
        tokenomicsCategories.sub_daos.value = scaledData[2];
        tokenomicsCategories.sub_daos.percent = totalSupply > 0 ? ((scaledData[2] / totalSupply) * 100).toFixed(2) : '–';
        tokenomicsCategories.matching_funds.value = scaledData[3];
        tokenomicsCategories.matching_funds.percent = totalSupply > 0 ? ((scaledData[3] / totalSupply) * 100).toFixed(2) : '–';
        tokenomicsCategories.user_unlocked.value = Math.floor(Number(data[4]) / 1_000_000);
        tokenomicsCategories.user_unlocked.percent = totalSupply > 0 ? ((tokenomicsCategories.user_unlocked.value / totalSupply) * 100).toFixed(2) : '–';
        tokenomicsCategories.burned.value = burnedScaled;
        tokenomicsCategories.burned.percent = totalSupply > 0 ? ((burnedScaled / totalSupply) * 100).toFixed(2) : '–';

        // Update table cells in HTML
        updateTokenomicsTable();

        // Table rows removed; HTML will handle rendering using tokenomicsCategories
        // Pie chart data (exclude total supply, include burned)
        const pieData = [
          tokenomicsCategories.user_locked.value,
          tokenomicsCategories.sub_daos.value,
          tokenomicsCategories.matching_funds.value,
          tokenomicsCategories.user_unlocked.value,
          tokenomicsCategories.burned.value
        ];
        // Draw pie chart
        if (pieChartCanvas) {
          if (window.pieChartInstance) {
            window.pieChartInstance.destroy();
            window.pieChartInstance = null;
          }
          window.pieChartInstance = new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
              labels: [
                'User Locked',
                'Sub DAOs',
                'Matching Funds',
                'User Unlocked',
                'Burned'
              ],
              datasets: [{
                data: pieData,
                backgroundColor: [
                  '#E75A5C', // brand-red
                  '#FAF3E7', // brand-cream
                  '#4A3B3C', // brand-charcoal
                  '#60A5FA', // brand-blue
                  '#A78BFA'  // brand-purple
                ],
                borderColor: '#FAF3E7',
                borderWidth: 2
              }]
            },
            options: {
              plugins: {
                legend: {
                  display: true,
                  position: 'bottom',
                  labels: {
                    color: '#FAF3E7', // brand-cream
                    font: { size: 14 }
                  }
                }
              }
            }
          });
        }
        // Pie chart data (exclude total supply, include burned)
        // Pie chart logic removed; only table is rendered.
      }
    })
    .catch(err => {
      console.log(`Error fetching stats: ${err.message}`);
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', fetchAndDisplayTokenomicsStats);
} else {
  fetchAndDisplayTokenomicsStats();
}
