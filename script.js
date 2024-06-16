document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const carTypeInput = document.getElementById('car-type');
    const leasePeriodInput = document.getElementById('lease-period');
    const carValueInput = document.getElementById('car-value');
    const downPaymentInput = document.getElementById('down-payment');
    const carValueSlider = document.getElementById('car-value-slider');
    const downPaymentSlider = document.getElementById('down-payment-slider');
    const leasingCost = document.getElementById('total-cost');
    const payment = document.getElementById('payment');
    const installmentEl = document.getElementById('monthly-installment');
    const interestRateEl = document.getElementById('interest-rate');

    const interestRates = {
        'brand-new': 2.99,
        'used': 3.7
    };

    carValueInput.addEventListener('input', () => {
        carValueSlider.value = carValueInput.value;
    });

    carValueSlider.addEventListener('input', () => {
        carValueInput.value = carValueSlider.value;
        calculateLeasingDetails();
    });

    downPaymentInput.addEventListener('input', () => {
        downPaymentSlider.value = downPaymentInput.value;
    });

    downPaymentSlider.addEventListener('input', () => {
        downPaymentInput.value = downPaymentSlider.value;
        calculateLeasingDetails();
    });

    carTypeInput.addEventListener('input', calculateLeasingDetails);
    leasePeriodInput.addEventListener('input', calculateLeasingDetails);
    carValueInput.addEventListener('input', calculateLeasingDetails);
    downPaymentInput.addEventListener('input', calculateLeasingDetails);

    function calculateLeasingDetails() {
        const carType = carTypeInput.value;
        const interestRate = interestRates[carType];
        const carValue = parseFloat(carValueInput.value);
        const downPayment = parseFloat(downPaymentInput.value);
        const leasePeriodValue = parseInt(leasePeriodInput.value);
        const errorMessageElement = document.getElementById('error-message');

        errorMessageElement.textContent = '';

        if (isNaN(carValue) || isNaN(downPayment) || carValue < 10000 || carValue > 200000 || downPayment < 10 || downPayment > 50) {
            errorMessageElement.textContent = `Please enter valid numeric values in the given range for Car Value, Down Payment`;
            return;
        }
        const downPaymentvalue = carValue * (downPayment / 100);
        const loanAmount = carValue - downPaymentvalue;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const totalInterest = loanAmount * monthlyInterestRate * leasePeriodValue;
        const totalCostValue = carValue + totalInterest;

        const monthlyInstallmentValue = (totalCostValue - downPaymentvalue) / leasePeriodValue;


        leasingCost.textContent = `$${totalCostValue.toFixed(2)}`;
        interestRateEl.textContent = `${interestRate}%`;
        payment.textContent = `$${downPaymentvalue.toFixed(2)}`;
        installmentEl.textContent = `$${monthlyInstallmentValue.toFixed(2)}`;
    }

}