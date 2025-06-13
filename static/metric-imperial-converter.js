// Metric ↔ Imperial Converter Logic

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('converterForm');
  const conversionType = document.getElementById('conversionType');
  const inputValue = document.getElementById('inputValue');
  const inputLabel = document.getElementById('inputLabel');
  const resultDiv = document.getElementById('result');
  const friendlyMessage = document.getElementById('friendlyMessage');
  const direction = document.getElementById('direction');

  // Conversion formulas
  function convert(value, type, direction) {
    switch (type) {
      case 'temperature':
        if (direction === 'metricToImperial') {
          return {
            label: `${value} °C = ${(value * 9/5 + 32).toFixed(2)} °F`,
            value: (value * 9/5 + 32).toFixed(2)
          };
        } else {
          return {
            label: `${value} °F = ${((value - 32) * 5/9).toFixed(2)} °C`,
            value: ((value - 32) * 5/9).toFixed(2)
          };
        }
      case 'distance':
        if (direction === 'metricToImperial') {
          return {
            label: `${value} km = ${(value * 0.621371).toFixed(4)} miles`,
            value: (value * 0.621371).toFixed(4)
          };
        } else {
          return {
            label: `${value} miles = ${(value / 0.621371).toFixed(4)} km`,
            value: (value / 0.621371).toFixed(4)
          };
        }
      case 'height':
        if (direction === 'metricToImperial') {
          return {
            label: `${value} cm = ${(value / 2.54).toFixed(2)} inches`,
            value: (value / 2.54).toFixed(2)
          };
        } else {
          return {
            label: `${value} inches = ${(value * 2.54).toFixed(2)} cm`,
            value: (value * 2.54).toFixed(2)
          };
        }
      case 'weight':
        if (direction === 'metricToImperial') {
          return {
            label: `${value} kg = ${(value * 2.20462).toFixed(2)} lbs`,
            value: (value * 2.20462).toFixed(2)
          };
        } else {
          return {
            label: `${value} lbs = ${(value / 2.20462).toFixed(2)} kg`,
            value: (value / 2.20462).toFixed(2)
          };
        }
      default:
        return { label: '', value: '' };
    }
  }

  // Update input label based on conversion type and direction
  function updateInputLabel() {
    switch (conversionType.value) {
      case 'temperature':
        if (direction.value === 'metricToImperial') {
          inputLabel.textContent = 'Value (°C)';
          inputValue.placeholder = 'Enter temperature in °C';
        } else {
          inputLabel.textContent = 'Value (°F)';
          inputValue.placeholder = 'Enter temperature in °F';
        }
        break;
      case 'distance':
        if (direction.value === 'metricToImperial') {
          inputLabel.textContent = 'Value (km)';
          inputValue.placeholder = 'Enter distance in kilometers';
        } else {
          inputLabel.textContent = 'Value (miles)';
          inputValue.placeholder = 'Enter distance in miles';
        }
        break;
      case 'height':
        if (direction.value === 'metricToImperial') {
          inputLabel.textContent = 'Value (cm)';
          inputValue.placeholder = 'Enter height in centimeters';
        } else {
          inputLabel.textContent = 'Value (inches)';
          inputValue.placeholder = 'Enter height in inches';
        }
        break;
      case 'weight':
        if (direction.value === 'metricToImperial') {
          inputLabel.textContent = 'Value (kg)';
          inputValue.placeholder = 'Enter weight in kilograms';
        } else {
          inputLabel.textContent = 'Value (lbs)';
          inputValue.placeholder = 'Enter weight in pounds';
        }
        break;
      default:
        inputLabel.textContent = 'Value';
        inputValue.placeholder = 'Enter value';
    }
    resultDiv.textContent = '';
    friendlyMessage.textContent = '';
    inputValue.value = '';
  }

  conversionType.addEventListener('change', updateInputLabel);
  direction.addEventListener('change', updateInputLabel);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) {
      resultDiv.textContent = 'Please enter a valid number.';
      friendlyMessage.textContent = '';
      return;
    }
    const type = conversionType.value;
    const dir = direction.value;
    const result = convert(value, type, dir);
    resultDiv.textContent = result.label;
    friendlyMessage.textContent = 'Quick conversion for daily life in Canada 🇨🇦.';
  });

  // Initialize label on page load
  updateInputLabel();
}); 