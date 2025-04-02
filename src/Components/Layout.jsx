import React, { useState } from 'react';
import './Layout.css';

const Layout = () => {
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const[transactions,setTransaction] = useState([]);
    const[type,setType] = useState("expense")
    const[name,setName] = useState("")
    const[amount,setAmount] = useState("")

    // add transactions
    const addTransaction = () =>{
        if(!name || !amount || amount<=0){
            alert("Entered Invalid details")
        }
        const amountVal = parseFloat(amount);
        const newTransaction = {id: Date.now(),name,amount:amountVal,type};

        setTransaction([...transactions,newTransaction]);

        if(type == 'income'){
            setIncome(income+amountVal);
            setBalance(balance+amountVal);
        }else{
            setExpense(expense+amountVal);
            setBalance(balance-amountVal);
        }

        setName("")
        setAmount("")
    };

    // delete transactions
    const deleteTransaction = (id,amountVal,type) =>{
        setTransaction(transactions.filter((item)=>item.id !== id));
        
        if(type==="income"){
            setIncome(income-amountVal);
            setBalance(balance-amountVal)
        }else{
            setExpense(expense-amountVal)
            setBalance(balance+amountVal)
        }
        
    }

    return (
        <div className='container'>
            <h1>Expense Tracker 💸</h1>
           
                {/* Displaying the balance,income and expense */}
                <div className="present-display">
                    <div className='balance'>
                        <h2>Balance: ₹{balance}</h2>
                    </div>
                    <div className='lf-rt_boxes'>
                        <div className='income'>
                            <h3>Income: ₹{income}</h3>
                        </div>
                        <div className='expense'>
                            <h3>Expense: ₹{expense}</h3>
                        </div>
                    </div>
                </div>

                {/* Add New Entry Section */}
                <div className='operations'>
                    <h3>Add New</h3>
                    <div className='select_type'>
                        <label>Entry type: </label>
                        <select  value={type} onChange={(e)=> setType(e.target.value)}>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div className='text_input'>
                        <label>Name: </label>
                        <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>

                    <div className='amount_input'>
                        <label>Amount: </label>
                        <input type="number" placeholder='Amount' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
                        <br />
                        <button className='add_inp' onClick={addTransaction}>Add</button>
                    </div>
                </div>


                {/* History Section */}
                <div className='History'>
                    <h3>History</h3>
                    {transactions.length ==0 ? <p>No transactions</p> : (
                        transactions.map((item)=>(
                            <div key={item.id} className='transaction-item'>
                                
                                <p>{item.name} - ₹{item.amount.toFixed(2)} ({item.type})</p>
                                <button className='item-del' onClick={()=> deleteTransaction(item.id,item.amount,item.type)}>X</button>
                            </div>
                        ))
                    )}
                   
                    
                </div>
            </div>
      
    );
};

export default Layout;
