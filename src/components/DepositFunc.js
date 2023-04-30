import { useState } from "react"

export default function Deposit() {
    const [deposit, setDeposit] = useState({
        month: '',
        amount: '',
    });

    const [calculator, setCalculator] = useState({
        rate: '',
        finalAmount: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const { rate, finalAmount } = calculated(deposit);

        setCalculator({ rate, finalAmount })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === 'month' ? setDeposit(((prevDeposit) => ({...prevDeposit, month: value}))) : setDeposit(((prevDeposit) => ({...prevDeposit, amount: value})))
    };

    const calculated = (data) => {
        const { month, amount } = data;
        let rate;
        if (amount < 100000) {
            rate = 0.015
        }
        if (amount > 100000 && amount < 1000000) {
            if (month <= 5) {
                rate = 0.04
            }
            if (month > 5 && month <= 12) {
                rate = 0.045
            }
            if (month > 12) {
                rate = 0.015
            }
        }
        if (amount >= 1000000) {
            if (month <= 5) {
                rate = 0.045
            }
            if (month > 5 && month <= 12) {
                rate = 0.055
            }
            if (month > 12) {
                rate = 0.015
            }
        }
        return { rate, finalAmount: Number(amount) + Number(rate * month * amount) }
    }

    return (
        <div className="container-deposit">
            <form className="form-deposit" onSubmit={handleSubmit}>
                <label className='label-deposit'>
                    <span>Сумма</span>
                    <input className="input-amount" name='amount' pattern="^[1-9]\d*$" required onChange={handleChange}></input>
                </label>
                <label className='label-deposit'>
                    <span>Срок (в месяцах)</span>
                    <input className="input-month" name='month' pattern="^[1-9]\d*$" required onChange={handleChange}></input>
                </label>
                <button className='form-btn'>OK</button>
            </form>
            <div className="container-result">
                <div className="rate">
                    <p className="title">
                        Ваша процентная ставка: 
                    </p>
                    <span className="result-rate">
                        {' ' + calculator.rate * 100 + '%'}
                    </span>
                </div>
                <div className="final-amount">
                    <p className="title">
                        Сумма к окончанию срока:
                    </p>
                    <span className="result-final-amount">
                        {' ' + calculator.finalAmount + ' руб.'}
                    </span>
                </div>
            </div>
        </div>
    )
}