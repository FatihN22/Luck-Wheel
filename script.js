
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const AddBtn = document.getElementById('add-btn');
const spinBtn = document.getElementById('spin');
const input = document.getElementById('input');
const clearBtn = document.getElementById('clear')


// Çarkın merkez koordinatları
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Çarkın yarıçapı
const radius = 250;

// Dilim sayısı ve açısı
let sliceCount = 0;

// Dilimlere ait değerleri tutacak dizi
const sliceValues = [];

const sliceColors = ['#3498db', '#e11f1f', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#d35400', '#f74d3c', '#e0f0af'];
context.fillStyle = '#e11f1f';
context.fillRect(0, 0, canvas.width, canvas.height);    
AddBtn.addEventListener('click', () => {
    if (sliceCount >= 10) {
        alert("Maksimum 10 katılımcı eklenebilir.");
        return;
    }

    const currentInputValue = input.value.trim();
    canvas.style.transition = '3235ms cubic-bezier(.18,-0.06,.16,.95)'
    if (currentInputValue) {
        sliceCount++;
        sliceValues.push(currentInputValue);

        const sliceAngle = (2 * Math.PI) / sliceCount;

        for (let i = 0; i < sliceCount; i++) {
            const startAngle = i * sliceAngle;
            const endAngle = (i + 1) * sliceAngle;
            const midAngle = (startAngle + endAngle) / 2;

            // Dilimin merkezi için koordinatlar
            const midX = centerX + radius * 0.6 * Math.cos(midAngle);
            const midY = centerY + radius * 0.6 * Math.sin(midAngle);

            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, i * sliceAngle, (i + 1) * sliceAngle);
            context.closePath();
            context.fillStyle = sliceColors[i];
            context.fill();
            context.fillStyle = 'black';
            context.font = "bold 28px Arial";
            context.textAlign = "center";
            context.textBaseline = "bottom";
            context.fillText(sliceValues[i], midX, midY);
        }
        clearBtn.addEventListener('click', ()=>{
            context.fillStyle = '#e11f1f';
            context.fillRect(0, 0, canvas.width, canvas.height);    
           sliceValues.length = 0; 
           sliceCount = 0; 
        })
        input.value = '';
    } else {
        alert("Lütfen bir değer girin.");
    }
});

spinBtn.addEventListener('click', () => {
    canvas.style.transform = `rotate(${Math.floor(Math.random() * (5000 - 23))}deg)`;
});
