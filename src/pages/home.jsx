import './home.css'
import { useState, useEffect, useRef } from 'react';
import Logo from '../assets/images/logo.png'


function Home() {
    const [company, setCompany] = useState([])
    const [complex, setComplex] = useState()
    const [room, setRoom] = useState([])
    const [calc, setCalc] = useState([])
    const [bank, setBank] = useState([])

    const [infoCompany, setInfoCompany] = useState('')
    const [infoComplex, setInfoComplex] = useState('')
    const [infoRoom, setInfoRoom] = useState('')
    const [infoCalc, setInfoCalc] = useState('')
    const [infoBank, setInfoBank] = useState('')


    const complex_id = useRef()
    const yearRef = useRef()
    ////company
    useEffect(() => {
        fetch('https://credit-house.herokuapp.com/')
            .then((res) => res.json())
            .then((data) => setCompany(data))
    }, []);

    const handlCompany = (e) => {
        setInfoCompany(company.find(com => com.building_company_id == e.target.value))
        fetch(`https://credit-house.herokuapp.com/${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                setComplex(data.complexes)
            })
    }

    // /complex
    const handlComlex = (e) => {
        setInfoComplex(complex.find(cop => cop.complexes_id == e.target.value));
        fetch(`https://credit-house.herokuapp.com/${e.target.value}/${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                setRoom(data.complexes_room)
        
        })
    }
    //complex room
    
    const handlComplexRoom = (e) => {
        setInfoRoom(room.find(cr => cr.room_id == e.target.value));
        fetch(`https://credit-house.herokuapp.com/${e.target.value}/${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
            setBank(data)
        })
    }

   
    
    ///calculate with duration in banks
    const handleBank = (e) => {
        const year = yearRef.current.value
        const id = complex_id.current.value  
        fetch(`https://credit-house.herokuapp.com/bank/${id}/${year}`)
        .then((res) => res.json())
        .then((data) => {
          setCalc(data)
        })
    } 

    


    return (
        <>
            <div className="container">
                <header className='header'>
                    <img src={Logo} className='logo' alt="logo" style={{ width: '160px', height: '80px', display: 'block' }} />
                    <a className='links' href="">Home</a>
                    <a className='links' href="">About us</a>
                    <a className='links' href="">Products</a>

                    <a className='links'>Contact us</a>
                    <div>
                        <select className='select_lang' name="lang" id="">
                            <option value="eng">En</option>
                            <option value="ru">Ru</option>
                        </select>
                    </div>
                </header>

                <main className='main'>
                    <h1 className="heading">Get your house on credit</h1>
                    <p className="desc">This app helps you to find worthy bank which is proper from your region for house you want to get on credit. And while this process
                    it calculates how much does this house cost and how much you should pay with bank services according to duration you choose! </p>
                    <div className="select_home">
                        <form className='form' action="">
                            <div>
                                <label htmlFor="company">Company:</label>
                                <select className='select' id='company' onChange={handlCompany}>
                                    <option value="" disabled>Choose</option>
                                    {
                                        company.map((e, i) => {
                                            return (
                                                <option className='option' value={e.building_company_id} key={i} id={i}>{e.building_company_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="complex">Complex:</label>
                                <select className='select' id='complex' onChange={handlComlex}>
                                    <option value=""  disabled>Choose</option>
                                    {
                                        complex?.map((e, i) => {
                                            return (
                                                <option value={e.complexes_id} key={i} id={i}>{e.complexes_name}</option>
                                            )   
                                        })
                                    }
                                </select>
                            </div>

                            
                            <div>
                                <label htmlFor="room">Count room:</label>
                                <select className='select' id='room' ref={complex_id} onChange={handlComplexRoom}>
                                    <option value=""  disabled>Choose</option>
                                    {
                                        room?.map((e, i) => {
                                            return (
                                                <option value={e.room_id} key={i} id={i}>{e.room_count}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label htmlFor="year">Year:</label>
                                <select className='select' ref={yearRef} onChange={handleBank}>
                                    <option value="" disabled>Choose</option>
                                    <option value="10">10 years</option>
                                    <option value="10">10 years</option>
                                    <option value="15">15 years</option>
                                    <option value="20">20 years</option>
                                </select>

                           </div>


                        </form>

                        <div className='data'>
                            <div className="context">
                                <p className='contex_item'>Company: <span>{infoCompany.building_company_name}</span></p>
                                <p className='contex_item'>Complex: <span>{infoComplex.complexes_name}</span></p>
                                <p className='contex_item'>Price per a square: <span>{infoRoom.room_price}</span> sum</p>
                                <p className='contex_item'>Size: <span>{infoRoom.room_size}</span> square</p>
                                <p className='contex_item'>Count room: <span>{infoRoom.room_count}</span> square</p>
                            </div>
                            <div className="bank">
                                {
                                    calc?.map((e, i) => {
                                        return <div key={i} className="info">
                                            <p className='bank_info'>Bank name: <span>{e.bankname}</span></p>
                                            <p className='bank_info'>Cost of house: <span>{e.house_price}</span> sum</p>
                                            <p className='bank_info'>Bank gives up to: <span>{e.bankupto}</span> sum</p>
                                            <p className='bank_info'>Percent: <span>{e.startingpayment}</span> %</p>
                                            <p className='bank_info'>Starting payment: <span>{e.bank_startingpayment}</span> sum</p>
                                            <p className='bank_info'>Monthly payment: <span>{e.monthly_payment}</span> sum</p>
                                            <p className='bank_info'>Bank service: <span>{e.bankservice} sum</span></p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Home;