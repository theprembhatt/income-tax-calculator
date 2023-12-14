document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('deduction-form');
  const totalDeductionsSpan = document.getElementById('total-deductions');
  const taxSavingsSpan = document.getElementById('tax-savings');
  const resultContainer = document.getElementById('result-container');

  form.addEventListener('submit', function(event) {
      event.preventDefault();

      const age = parseInt(document.getElementById('age').value) || 0;
      const annualPremiumSelf = parseInt(document.getElementById('annual-premium-self').value) || 0;
      const annualPremiumParents = parseInt(document.getElementById('annual-premium-parents').value) || 0;
      const incomeBracket = document.getElementById('income-bracket').value;

      // Maximum deduction for "Annual Premium Paid for Self and Family" is 25000 for age less than or equal to 60, and 50000 for age greater than 60
      const maxDeductionSelf = age > 60 ? Math.min(50000, annualPremiumSelf) : Math.min(25000, annualPremiumSelf);

      // Maximum deduction for "Annual Premium Paid for Parents" is 50000
      const maxDeductionParents = Math.min(50000, annualPremiumParents);

      // Total maximum deduction is 50000
      const totalDeductions = maxDeductionSelf + maxDeductionParents;

      let taxSavingsPercentage;

      if (incomeBracket === '5-lakh-to-10-lakh') {
          taxSavingsPercentage = 20.8;
      } else if (incomeBracket === 'more-than-10-lakh') {
          taxSavingsPercentage = 31.2;
      } else {
          // Default tax savings percentage if the income bracket is not specified
          taxSavingsPercentage = 0;
      }

      const taxSavings = (totalDeductions * taxSavingsPercentage) / 100;

      totalDeductionsSpan.textContent = totalDeductions;
      taxSavingsSpan.textContent = taxSavings;

      // Display the results
      resultContainer.style.display = 'block';
  });
});
