/* Assainment 7-a
interface typeofComplex{
  name:string,
  age:number,
  isStudent: boolean,
  interests: string[],
  address: addresstype,
  grades: gradestype,
  contact: contacttype,
  tuple: [number, string, boolean],
  functionExample(): number
}



interface addresstype{
    street: string,
    city: string,
    postalCode: string
}

interface gradestype{
  math: {
    midterm: number,
    final: number
  },
  science: {
    midterm: number,
    final: number
  },
}

interface contacttype{
  emailAddress : string,
  phone: string  
}



const complexObject = {
  name: "John Doe",
  age: 30,
  isStudent: false,
  interests: ["programming", "music", "hiking"],
  address: {
    street: "123 Main St",
    city: "Exampleville",
    postalCode: "12345",
  },
  grades: {
    math: {
      midterm: 85,
      final: 92,
    },
    science: {
      midterm: 78,
      final: 88,
    },
  },
  contact: {
    email: "john.doe@example.com",
    phone: "+1234567890",
  },
  tuple: [1, "two", true],
  functionExample: function (x) {
    return x * 2;
  },
};
*/




// Assainment 7-b
// Develop a TS program that show the working of an ATM machine such

//  - User should login by entering his/her unique account number and a secret PIN
//  - User can check account balance 
//  - User can withdraw money 
//  - User can check his/her previous transections in the current login
//  - User should be asked at the end of each function that if he/she wants to end 
//  transections or perform any other transections if the user choose more transections
//  he/she must be shown all the options again and he / she can perform any transections.

import inquirer from 'inquirer'

const enum OPTION{
    CHECK_ACCOUNT_BALANCE = "Check Account Balance",
    WITHDRAW_MONEY = "Withdraw money",
    TRANSACTION_HISTORY = "TRANSACTION HISTORY",
}
const enum REPEAT{
  YES="Yes", NO="No"
}
const users = [
    {
        username: "ali1",
        pin: "1234",
        balance: 628752,
        tsHistory: "26762 deducted, 282 credited, 8582 credited, 586 tax deductiopn",
    },
    {
        username: "ali2",
        pin: "1235",
        balance: 62834532,
        tsHistory: "2762 deducted, 272 credited, 9582 credited, 586 tax deductiopn",
    },
    {
        username: "ali3",
        pin: "1236",
        balance: 6223752,
        tsHistory: "2762 deducted, 882 credited, 2582 credited, 586 tax deductiopn",
    },
    {
        username: "ali4",
        pin: "1237",
        balance: 978752,
        tsHistory: "2672 deducted, 289 credited, 8584 credited, 586 tax deductiopn",
    },
    {
        username: "ali5",
        pin: "1238",
        balance: 632752,
        tsHistory: "6762 deducted, 280 credited, 8589 credited, 586 tax deductiopn",
    },
]


const loginData = await inquirer.prompt([
    {
        name:"username",
        type:"input",
        message:'Please enter your username'
    },
    {
        name:"pin",
        type:"password",
        message:'please Enter 4 digit pin',
        mask:"*",
        validate(input){
            if(input.length === 4){
                return true;
            }
            return false;
        },
    },
]);
const loggedInUser = users.find(
    (user)=>user.username === loginData.username && user.pin === loginData.pin
)
let repeat:any;
if (loggedInUser){
    console.log(`welcome back ${loginData.username}!`);
    do{
    const options = await inquirer.prompt([{
        type:"list",
        name: "option",
        message:"chose what u want to do",
        choices: [OPTION.CHECK_ACCOUNT_BALANCE,OPTION.WITHDRAW_MONEY, OPTION.TRANSACTION_HISTORY],
    }]);
    if(options.option === OPTION.CHECK_ACCOUNT_BALANCE){
        console.log(`yor account balance is = ${loggedInUser.balance}`);
        
    } else if(options.option === OPTION.WITHDRAW_MONEY){
        const withdrawAmount = await inquirer.prompt({
          name:"withdrawal_amount",
          type:"number",
          message:`Enter amount you wanna withdraw`,
          });
        loggedInUser.balance -= withdrawAmount.withdrawal_amount;
    } else if (options.option === OPTION.TRANSACTION_HISTORY){
        console.log(loggedInUser.tsHistory);  
    }
    repeat = await inquirer.prompt({
      name: "more_transaction",
      type: "list",
      message: `Do You Want To Do More Transaction? `,
      choices:[REPEAT.YES,REPEAT.NO],
    });
  } while(repeat.more_transaction === REPEAT.YES)    
} else {
    console.error("wrong credentials");
}
 