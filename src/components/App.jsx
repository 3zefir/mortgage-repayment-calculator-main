import { useState } from 'react'
import './style.css'
import calculator from '../images/icon-calculator.svg'
import emptyImage from '../images/illustration-empty.svg'
import {useForm} from "react-hook-form";
function App() {
  const [complete, setComplete] = useState(false);

  //amount
  const [amountValue, setAmountValue] = useState(0);
  const [amountInputStyle, setAmountInputStyle] = useState({})
  const [amountInputSign, setAmountInputSign] = useState({})

  //term
  const [termValue, setTermValue] = useState(0)
  const [termInputStyle, setTermInputStyle] = useState({})
  const [termInputSign, setTermInputSign] = useState({})

  //rate
  const [rateValue, setRateValue] = useState(0)
  const [rateInputStyle, setRateInputStyle] = useState({})
  const [rateInputSign, setRateInputSign] = useState({})

  //type buttons
  const [repayment, setRepayment] = useState(false);
  const [interest, setInterest] = useState(false);



  //input hook form
  const {handleSubmit, register, setValue, reset, formState: {errors} } = useForm({})

  const submit = (data) => {
    console.log(data)
    setAmountValue(data.amount);
    setTermValue(data.term);
    setRateValue(data.rate)
    if (data.amount < 0) {
      setValue('amount', 0)
    }
  }
  const error = (data) => {
    console.log('errorSRDSRSDR', data)

  }
  console.log('AMOUNT VALUE: ', amountValue);
  console.log('TERM VALUE: ', termValue);
  console.log('RATE VALUE: ', rateValue);
  console.log('rendered');


  //amount hover/blur for input
  const amountStyle = () => {
    setAmountInputStyle({border: '1px solid hsl(61, 70%, 52%)'})
    setAmountInputSign({backgroundColor: 'hsl(61, 70%, 52%)'})
  }

  const clearAmountStyle = () => {
    setAmountInputStyle({})
    setAmountInputSign({})
  }

  //term hover/blur for input
  const termStyle = () => {
    setTermInputStyle({border: '1px solid hsl(61, 70%, 52%)'})
    setTermInputSign({backgroundColor: 'hsl(61, 70%, 52%)'})
  }

  const clearTermStyle = () => {
    setTermInputStyle({})
    setTermInputSign({})
  }

  //rate hover/blur for input
  const rateStyle = () => {
    setRateInputStyle({border: '1px solid hsl(61, 70%, 52%)'})
    setRateInputSign({backgroundColor: 'hsl(61, 70%, 52%)'})
  }

  const clearRateStyle = () => {
    setRateInputStyle({})
    setRateInputSign({})
  }

  const repaymentFunc = () => {
    setInterest(false);
    setRepayment(!repayment);
  }

  const interestFunc = () => {
    setRepayment(false);
    setInterest(!interest);
  }

  const checkErrorFunc = () => {
    if (errors.amount || errors.term || errors.rate || errors.interests) return true;
    return false;
  }

  const isError = checkErrorFunc();

  const completeFunc = () => {
    if (!errors.amount && !errors.term && !errors.rate && !errors.interests) setComplete(true);
  }
  let num = 1123123.12;
  const result = num.toLocaleString('en-US');
  const calculateMonths = () => {
    const percents = (rateValue / 100);
    const payment = (amountValue * (percents * Math.pow(1 + percents / 12, termValue * 12))) / (Math.pow(1 + percents / 12, termValue * 12) - 1)
    const result = (payment * termValue / 12).toFixed(2);
    return result;
  }
  const calculateYears = () => {
    const percents = (rateValue / 100);
    const payment = (amountValue * (percents * Math.pow(1 + percents / 12, termValue * 12))) / (Math.pow(1 + percents / 12, termValue * 12) - 1)
    const result = (payment * termValue).toFixed(2);
    return result;
  }
  const monthResult = calculateMonths().toLocaleString('en-US')
  const yearResult = calculateYears().toLocaleString('en-US')
  return (
    <>
      <main className="main" style={isError ? {height: '44.2em', top: '150px'} : {}}>

        <h1 className="main__title">Mortgage Calculator</h1>
        <a className="main__button-clear" href='#' onClick={() => reset()}>Clear All</a>
        <form action="" className="main__form" onSubmit={handleSubmit(submit, error)}>
          <label htmlFor='' className="form__amount-label">Mortgage Amount</label>

          <div className="form__amount" style={errors.amount ? {border: '1px solid hsl(4, 69%, 50%)'} : amountInputStyle}>
            <label htmlFor='amount-input' className="form__amount-label--sign" style={errors.amount ? {backgroundColor: 'hsl(4, 69%, 50%)', color: 'white'} : amountInputSign} >£</label>
            <input type="number" className="form__amount-input" id='amount-input' min='1' max='1000000000' onBlurCapture={clearAmountStyle} onFocusCapture={amountStyle} {...register('amount', {required: true})} />
            <br/>
            {errors.amount && <label htmlFor="amount-input" className="amount__error">This field is required</label>}
          </div>


          <label htmlFor="term-input" className="form__term-label" style={isError ? {top: '100px'} : {}}>Mortgage Term</label>

          <br/>

          <div className="form__term" style={errors.term ? {border: '1px solid hsl(4, 69%, 50%)', top: '113px'} : isError ? {top: '113px'} : termInputStyle}>
            <input type="number" className="form__term-input" id="term-input" min='1' max='100' onBlurCapture={clearTermStyle} onFocusCapture={termStyle} {...register('term', {required: true})}/>
            <label htmlFor="term-input" className="form__term-label--sign" style={errors.term ? {backgroundColor: 'hsl(4, 69%, 50%)', color: 'white'} : termInputSign}>years</label>
            <br/>
            {errors.term && <label htmlFor="term-input" className="term__error">This field is required</label>}
          </div>

          <label htmlFor="rate-input" className="form__rate-label"  style={isError ? {top: '30px'} : {}}>Interest Rate</label>

          <br/>

          <div className="form__rate" style={errors.rate ? {border: '1px solid hsl(4, 69%, 50%', top: '42px'} : isError ? {top: '42px'} : termInputStyle}>
            <input type="number" className="form__rate-input" id="rate-input" min='1' max='10000' onBlurCapture={clearRateStyle} onFocusCapture={rateStyle} {...register('rate', {required: true})}/>
            <label htmlFor="rate-input" className="form__rate-label--sing" style={errors.rate ? {backgroundColor: 'hsl(4, 69%, 50%)', color: 'white'} : rateInputSign}>%</label>
            <br/>
            {errors.rate && <label htmlFor="rate-input" className="rate__error">This field is required</label>}
          </div>

          <div className="form__type"  {...register('interests',interest || repayment ? { required: false} : {required: true})}>
            <h4 className="type__title" style={isError ? {top: '78px'} : {}}>Mortgage Type</h4>
            <button className="type__button-repayment" type='button' onClick={repaymentFunc} style={isError ? {top: '68px'} : {}}><span className="repayment__circle" style={interest ? {} : repayment ? {boxShadow: '0 0 0 2px white, 0 0 0 3px hsl(61, 70%, 52%)', backgroundColor: 'hsl(61, 70%, 52%)', border: 'none'} : {}} ></span>Repayment</button>
            <br/>
            <button className="type__button-interest"  type='button' onClick={interestFunc} style={isError ? {top: '79px'} : {}}><span className="interest__circle" style={repayment ? {} : interest ? {boxShadow: '0 0 0 2px white, 0 0 0 3px hsl(61, 70%, 52%)', backgroundColor: 'hsl(61, 70%, 52%)', border: 'none'} : {}}></span>Interest Only</button>
            <br/>
            {errors.interests ? <label htmlFor="" className="type__error">This field is required</label> : null}
          </div>
          <button className="form__button" type='submit' onClick={completeFunc} style={isError ? {top: '148px'} : {}}><img src={calculator} alt="" className="button-image"/>Calculate Repayments</button>
        </form>

        {!complete || errors.amount || errors.term || errors.rate || errors.interests ?
            <div className="main__empty-result">
              <img src={emptyImage} alt="" className="empty-result__image" style={isError ? {top: '200px'} : {}}/>
              <h1 className="empty-result__title" style={isError ? {top: '215px'} : {}}>Results shown here</h1>
              <p className="empty-result__info" style={isError ? {top: '231px'} : {}}>Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.</p>
            </div> : <div className="main__result">
              <h1 className="result__title">Your results</h1>
              <p className="result__info">Your results are shown below based on the information you provided.
                To adjust the results, edit the form and click “calculate repayments” again.</p>
              <div className="result__card">
                <h3 className="card__title--month">Your monthly repayments</h3>
                <h1 className="card__value--month">£{monthResult}</h1>
                <div className="card">
                  <h3 className="card__title">Total you'll repay over the term</h3>
                  <h1 className="card__value">£{yearResult}</h1>
                </div>
              </div>
            </div>}
      </main>

    </>
  )
}

export default App
/*







  <!-- Empty results start -->





  <!-- Empty results end -->

  <!-- Completed results start -->









  <!-- Completed results end -->
 */