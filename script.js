// Lojistik fonksiyon
function logistic(r, x) {
    return r * x * (1 - x);
}

// Veri oluşturma fonksiyonu
function generateData(r, iterations) {
    let x = 0.5;
    let data = [];

    // İlk iterasyonları atlayarak sistemi dengeye getirme
    for (let i = 0; i < 100; i++) {
        x = logistic(r, x);
    }

    // Son iterasyonları kaydetme
    for (let i = 0; i < iterations; i++) {
        x = logistic(r, x);
        data.push({r: r, x: x});
    }
    return data;
}

// Çatallanma diyagramını çizme
function plotBifurcationDiagram() {
    const r = parseFloat(document.getElementById('rValue').value);
    const iterations = parseInt(document.getElementById('iterations').value);
    const data = generateData(r, iterations);

    const trace = {
        x: data.map(d => d.r),
        y: data.map(d => d.x),
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 2,
            color: '#00ff00',
            opacity: 0.6
        }
    };

    const layout = {
        title: {
            text: 'Lojistik Haritanın Çatallanma Diyagramı',
            font: {
                size: 24,
                color: '#00ff00',
                family: 'Courier New, monospace'
            }
        },
        xaxis: {
            title: 'r Değeri',
            range: [2.5, 4.0],
            color: '#00ff00',
            gridcolor: '#003300',
            zerolinecolor: '#004400',
            linecolor: '#004400'
        },
        yaxis: {
            title: 'Popülasyon',
            range: [0, 1],
            color: '#00ff00',
            gridcolor: '#003300',
            zerolinecolor: '#004400',
            linecolor: '#004400'
        },
        plot_bgcolor: '#000000',
        paper_bgcolor: '#000000',
        hovermode: 'closest',
        margin: {
            l: 50,
            r: 50,
            t: 50,
            b: 50
        }
    };

    Plotly.newPlot('logisticMap', [trace], layout);
}

// Sayfa yüklendiğinde ilk diyagramı çiz
document.addEventListener('DOMContentLoaded', plotBifurcationDiagram);

// Kontrollerin değişimini dinle
document.getElementById('rValue').addEventListener('input', function() {
    document.getElementById('rDisplay').textContent = this.value;
    plotBifurcationDiagram();
});

document.getElementById('iterations').addEventListener('change', plotBifurcationDiagram);
