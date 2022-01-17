import {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useGetCryptosQuery } from '../../services/cryptoApi'
import { Loader } from '../index'


const Cryptocurrencies = ( { simplified }) => {
    const count = simplified?10:100
    const {data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setcryptos] = useState([]);
    const [searchTerm, setsearchTerm] = useState('')

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter(coin => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setcryptos(filteredData)
    }, [searchTerm, cryptosList])
    const inputOnChangeHandler = (event)=>{
        setsearchTerm(event.target.value)
    }
    if (isFetching){
        return <Loader />
    }
    return (
        <>
            {!simplified && <div className='search-crypto'>
                <Input placeholder='Search Cryptocurrency' onChange={inputOnChangeHandler} />
            </div>}
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((currency)=>
                    (
                      <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card 
                                title={`${currency.rank} ${currency.name}`}
                                extra={<img className='crypto-image' src={currency.iconUrl}/>}
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                      </Col>  
                    )
                )}
            </Row>
        </>
    )
}

export default Cryptocurrencies


// const Crypcard = (props) => {
//  return (
//     <Card style={{ margin: "4px", width: 300, height: 400 }}
//     cover={ <img alt="example" src={props.data.iconUrl}/>} hoverable={true} title={props.data.name}/>
//  )
// }

// const Altcard = (props) =>{
//     const { Meta } = Card
//     return (
//         <Card
//         hoverable
//         style={{margin: '0.4rem', height:350, padding: '10% 5%'}}
//         cover={<img alt="example" src={props.data.iconUrl} />}
//       >
//         <Meta title={props.data.name} description="www.instagram.com" />
//       </Card>
//     )
// }
// const Cryptocurrencies = () => { 
//     const [topList, setTopList] = useState([])

//     const [showMore, setShowMore] = useState(false)
//     useEffect(() => {
//         filterLogic()     
//     }, [])

//     const { data ,isFetching } = useGetCryptosQuery()

//     const coinsData = data?.data?.coins
//     if (isFetching){
//         return <p>Fetching data from Api</p>
//     }
//     const filterLogic = ()=>{
//         const filteredList = coinsData.filter(cd => cd.rank < 11)
//         setTopList(filteredList)
//     }


//     const onClickHandler = () =>{
//         setShowMore(prev=>!prev)
//         filterLogic()
//     }
    
//     console.log(topList)

//     console.log(data?.data)
    
//     return (
//         <div>
//             <button onClick={onClickHandler}>click me</button>
//             <Row>
//             {showMore && coinsData.map((cData)=><Col span={6}><Altcard data={cData}/></Col>)}
//             {!showMore && topList.map((cData)=><Col span={6}><Altcard data={cData}/></Col>)}
//             </Row>
//         </div>
//     )
// }

// export default Cryptocurrencies
