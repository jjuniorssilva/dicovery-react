import React, {useEffect, useState} from 'react'
import './styles.css'
import {Card, CardProps} from '../../components/cards'

export function Home() {
  type ProfileReponse ={
    name:string,
    avatar_url:string
  }

  useEffect(()=>{
   async function fetchData(){
    const data = await (await fetch('https://api.github.com/users/jjuniorssilva')).json() as ProfileReponse;
    setUser({name:data.name, avatar_url:data.avatar_url})
  }
  fetchData().catch(err=>console.log(err));

    // fetch('https://api.github.com/users/jjuniorssilva')
    // .then(resp => resp.json())
    // .then(body=> {
    //   setUser({name:body.name, avatar:body.avatar_url})
    // })
    // .catch(err=>console.log(err))
  },[])


  // estados ão utilizadso pq as mudanças são refletidas na dom
  const [studentName, setstudentName] = useState('');
  const [students, setstudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<ProfileReponse>({} as ProfileReponse)
  
  function handleAddStudent(){ 
    let newStudent: CardProps = {
      name:studentName,
      time: new Date().toLocaleTimeString('pt-br',{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setstudents(prevState => [...prevState, newStudent]); // recuperar o vetor antigo
  }

  return (
    <div className="container">
      <header>
        <h1>Lista de presença:</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar_url} alt='Fotode perfil'/>
        </div>
      </header>
      <input 
        placeholder='Digite algo...'
        type="text"
        onChange={e => setstudentName(e.target.value)}
      />

     <button onClick={handleAddStudent}>Adicionar</button>

     {students.map((student) => (
        <Card 
          key={student.time}
          name={student.name} 
          time={student.time} />
      ))}
  
   
    </div>
    
  )
}


// deve reTORNAR APENAS UM ELEMNTO
// podemos usar uma div ou um fragment 