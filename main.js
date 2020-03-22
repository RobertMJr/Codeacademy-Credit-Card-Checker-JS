// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];
const invalid6 = [0, 1, 1, 1, 1, 1, 1, 1, 2];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];
const batch2 = [invalid1, invalid2, invalid3, invalid4, invalid5, invalid6];


// The purpose of validateCred() is to return true when an array contains digits of a valid credit card number and false when it is invalid. 
// This function should NOT mutate the values of the original array.
function validateCred(creditCard) {
  let checkSum = 0;
  let doubleBol = true;
  const checkDigit = creditCard[creditCard.length-1];
  checkSum += checkDigit;
  for (let i = creditCard.length - 2; i >= 0; i--){
    if (doubleBol){
      let doubleValue = creditCard[i] * 2;
      if (doubleValue > 9){
        doubleValue -= 9;
      }
      checkSum += doubleValue;
      doubleBol = false;
    }
    else if (!doubleBol){
      checkSum += creditCard[i];
      doubleBol = true;
    }    
  }
  return checkSum % 10 === 0;
}

// Testing 
console.log(validateCred(valid5));
console.log(validateCred(invalid6));


//The role of findInvalidCards() is to check through the nested array for which numbers are invalid, and return another nested array of invalid cards.
function findInvalidCards(creditCardsArr){
  let invalidArr = [];
  for (let i = 0; i < creditCardsArr.length; i++){
    if (validateCred(creditCardsArr[i]) === false){
      invalidArr.push(creditCardsArr[i]);
    }
  }
  return invalidArr;
}


// idInvalidCardCompanies() should return an array of companies that have mailed out cards with invalid numbers. 
// This array should NOT contain duplicates, i.e. even if there are two invalid.
function idInvalidCardCompanies(invalidCCArr){
    let issuingCompaniesArr = [];
    const validFirstDigits = [3, 4, 5, 6];
    for (let i = 0; i < invalidCCArr.length; i++){
      if (invalidCCArr[i][0] === 3 && issuingCompaniesArr.indexOf('Amex (American Expres)') === -1){
        issuingCompaniesArr.push('Amex (American Expres)');
      }
      else if (invalidCCArr[i][0] === 4 && issuingCompaniesArr.indexOf('Visa') === -1){
        issuingCompaniesArr.push('Visa');
      }
      else if (invalidCCArr[i][0] === 5 && issuingCompaniesArr.indexOf('Mastercard') === -1){
        issuingCompaniesArr.push('Mastercard');
      }
      else if (invalidCCArr[i][0] === 6 && issuingCompaniesArr.indexOf('Discover') === -1){
        issuingCompaniesArr.push('Discover');
      }
      else if (!validFirstDigits.includes(invalidCCArr[i][0])){
        console.log("Company not found");
      }
    }
    return issuingCompaniesArr;
  }
  
  // Testing of idInvalidCardCompanies
  console.log(idInvalidCardCompanies(findInvalidCards(batch)));
  console.log(idInvalidCardCompanies(findInvalidCards(batch2)));


  // strToArr() accepts a string and converts it into an array of numbers like the initially provided arrays
  function strToArr(someStr) {
    const myArr = [];
    for (let i = 0; i < someStr.length; i++){
      myArr.push(parseInt(someStr[i]));
    }
    return myArr;
  }
  
  // Testing the strToArr() function
  console.log(strToArr(valid3));
  const myStrToArrCC = strToArr(valid3);
  console.log(validateCred(myStrToArrCC));
