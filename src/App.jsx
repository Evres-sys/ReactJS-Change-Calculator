import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { useState, useEffect } from 'react'

function App() {
  const [amountDue, setAmountDue] = useState('');
  const [amountReceived, setAmountReceived] = useState('');
  const [alert, setAlert] = useState({message: '', type: 'success'});
  const [twenties, setTwenties] = useState(0);
  const [tens, setTens] = useState(0);
  const [fives, setFives] = useState(0);
  const [ones, setOnes] = useState(0);
  const [quarters, setQuarters] = useState(0);
  const [dimes, setDimes] = useState(0);
  const [nickels, setNickels] = useState(0);
  const [pennies, setPennies] = useState(0);

  function calculate(due, received) {
    let total = (received - due).toFixed(2);
    let dollarOutput = Math.floor(total);
    let cents = ((total - dollarOutput) * 100);

    //Dollar Values
    let dollar20Output = 0;
    let dollar10Output = 0;
    let dollar5Output = 0;
    let dollar1Output = 0;

    //Dollar Calculation
    dollar20Output = Math.floor(dollarOutput / 20);
    dollarOutput %= 20;

    dollar10Output = Math.floor(dollarOutput / 10);
    dollarOutput %= 10;

    dollar5Output = Math.floor(dollarOutput / 5);
    dollarOutput %= 5;

    dollar1Output = Math.round(dollarOutput);

    //Coin Values
    let quarterOutput = 0;
    let dimeOutput = 0;
    let nickelOutput = 0;
    let penniesOutput = 0;

    //Change Calculation
    quarterOutput = Math.floor(cents / 25);
    cents %= 25;

    dimeOutput = Math.floor(cents / 10);
    cents %= 10;

    nickelOutput = Math.floor(cents / 5);
    cents %= 5;

    penniesOutput = Math.round(cents);
    return {
      total,
      dollar20Output,
      dollar10Output,
      dollar5Output,
      dollar1Output,
      quarterOutput,
      dimeOutput,
      nickelOutput,
      penniesOutput,
    }
  }

  const handleCalculate = () => {
    if (!amountDue || !amountReceived) {
      setAlert({message: 'Please enter values into all boxes.', type: 'danger'});
    } else if (amountDue > amountReceived) {
      setAlert({message:`Additional money owed is $${(amountDue - amountReceived).toFixed(2)}.`, type: 'danger'})
    } else {
      const result = calculate(amountDue, amountReceived);
      setAlert({message:`The total change due is $${result.total}.`, type: 'success'})
      setTwenties(result.dollar20Output);
      setTens(result.dollar10Output);
      setFives(result.dollar5Output);
      setOnes(result.dollar1Output);
      setQuarters(result.quarterOutput);
      setDimes(result.dimeOutput);
      setNickels(result.nickelOutput);
      setPennies(result.penniesOutput);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({message: '', type: 'success'});
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      <div id='page-wrapper'>
        <h1 className='title'>Change Calculator</h1>
        <p className='title'>Calculate exact change!</p>
        <div style={{border: '2px solid black', padding: '0px'}}></div>
        <div id='input-group'>
          <div className='container mt-3'>
            <div className='row'>
              <div className='col-5'>
                <div className='card'>
                  <div className='card-header'>
                    Enter Information
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>How much is due?</p>
                    <input data-testid='amountDue' id='amountDue' type='number' value={amountDue} onChange={(e) => setAmountDue(Number(e.target.value))} placeholder='Amount Due' />
                  </div>
                  <div className='card-body'>
                    <p className='card-title'>How much was received?</p>
                    <input data-testid='amountReceived' id='amountReceived' type='number' value={amountReceived} onChange={(e) => setAmountReceived(Number(e.target.value))} placeholder='Amount Received' />
                  </div>
                  <div className='card-body'>
                    <button className='btn btn-primary' data-testid='calculate' id='calculate' onClick={handleCalculate}>Calculate!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container mt-3'>
          <div className='row'>
              <div className='col-8'>
                {alert.message && (
                  <div id='total' className={`alert alert-${alert.type} alert-dismissible fade show`} role='alert'>
                    {alert.message}
                  </div>
                )}
              </div>
            </div>
            <div className='row text-center'>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Twenties</h2>
                  <div data-testid='twenties' id='twenties'>{twenties}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Tens</h2>
                  <div data-testid='tens' id='tens'>{tens}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Fives</h2>
                  <div data-testid='fives' id='fives'>{fives}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Ones</h2>
                  <div data-testid='ones' id='ones'>{ones}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Quarters</h2>
                  <div data-testid='quarters' id='quarters'>{quarters}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Dimes</h2>
                  <div data-testid='dimes' id='dimes'>{dimes}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Nickels</h2>
                  <div data-testid='nickels' id='nickels'>{nickels}</div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='p-3 border bg-light'>
                  <h2>Pennies</h2>
                  <div data-testid='pennies' id='pennies'>{pennies}</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default App
