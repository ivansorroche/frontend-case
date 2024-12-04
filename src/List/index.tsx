import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listService } from "../service/list";
import moment from "moment";
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import 'moment/dist/locale/pt-br'

moment.locale("pt-br");


import "./index.css";

function List() {
  const [list, setList] = useState<any[]>([])
  const [balance, setBalance] = useState(170000)
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] =  useState<any[]>([])
  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
      if (!token) navigate('/Login')

      getList()
  },[])

  async function getList() {

    const response = await listService.getList()

    if(response.data.results) {
      setList(response.data.results)
    }
  }

  const handleSearch = (event:any) => {
    event.preventDefault();

    const filtered = list.flatMap((group:any, index) =>
      group.items.filter((item:any) => item.entry === filter)
    );

    setFilteredList(filtered)
    console.log(filtered, 'filtered')
  };

  return (
    <div className="list">
          <form className="list__buttoms" onSubmit={handleSearch}>
            <button onClick={() => setFilter('DEBIT')} className="list__buttomDebit">Débito</button>
            <button onClick={() => setFilter('CREDIT')} className="list__buttomCredit">Crédito</button>
            {filter.length > 0 &&
              <button disabled={filter.length <= 0} onClick={() => setFilter('')} className="list__buttomClear">Limpar filtro</button> 
            } 
          </form>
      <br></br>
          {list.length === 0 && (
                  <span>
                    <strong>Ops!!!</strong> Nenhum resultado foi encontrado
                    &#128533;
                  </span>
          )}

          {filter.length <= 0 && list.map((item:any, index) => {
            return (
              <>
                <div className="list__dateAndBalance" key={index}>
                  <span>
                    {moment(item.date).locale("pt-br").format("DD [de] MMMM")}
                  </span>
                  <span>
                    Saldo do dia {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      }).format(balance)} 
                  </span>
                </div>
                  {item.items.map((i:any) => (
                    <div className="list__container">
                      <span>
                        {i.entry === 'DEBIT' ?
                         <RemoveCircle sx={{width: '15px', paddingTop: '10px', marginRight: '10px', color: 'red'}}/> :
                         <AddCircleIcon sx={{width: '15px', paddingTop: '10px', marginRight: '10px', color: 'green'}}/>
                         }
                        {i.name} 
                      </span>
                      <span>{i.label}</span>
                      <span>
                        {moment(i.dateEvent).format("DD/MM/YYYY HH:mm")}
                      </span>
                      <span className={`${i.entry === 'DEBIT' ? 'list__debit' : 'list__credit'}`}>
                      {i.entry === 'DEBIT' ?'-' : '+'}
                        {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        }).format(i.amount)} 
                      </span>
                    </div>          
                  ))}
              </>
            )
          })}

          {filter.length > 0 && filteredList.map((i:any) => (
                  <div className="list__container">
                    <span>
                      {i.entry === 'DEBIT' ?
                        <RemoveCircle sx={{width: '15px', paddingTop: '10px', marginRight: '10px', color: 'red'}}/> :
                        <AddCircleIcon sx={{width: '15px', paddingTop: '10px', marginRight: '10px', color: 'green'}}/>
                        }
                      {i.name} 
                    </span>
                    <span>{i.label}</span>
                    <span>
                      {moment(i.dateEvent).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <span className={`${i.entry === 'DEBIT' ? 'list__debit' : 'list__credit'}`}>
                    {i.entry === 'DEBIT' ?'-' : '+'}
                      {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      }).format(i.amount)} 
                    </span>
                  </div>          
          ))}
    </div>
    )
}

export default List;
