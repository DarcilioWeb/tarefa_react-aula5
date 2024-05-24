import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import PostData from './components/PostData'

const url = "http://localhost:3000/Aluno"

const App = () => {

  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await fetch(url)
      const data = await res.json()
      setAlunos(data)
    }
    getData()
  }, [])

  
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [curso, setCurso] = useState("")

  const handleSubmit = async (e) => {
      e.preventDefault()

      const alunoToAdd = {
          nome: nome,
          email: email,
          curso: curso
      }

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(alunoToAdd)
      })

      const addedAlunos = await response.json()

      setAlunos((prevAlunos) => [...prevAlunos, addedAlunos])

      setNome("")
      setEmail("")
      setCurso("")
  }
  
  return (
    <div>
    <table border = "1px">
      <thead>
        <tr>
          <th>Nome:</th>
          <th>Email:</th>
          <th>Curso:</th>
        </tr>
      </thead>
      <tbody>
        {
          alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email}</td>
              <td>{aluno.curso}</td>
            </tr>
          ))
        }
      </tbody>
    </table>

    <div>
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input type='text' nome='nome' value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <br/>
            <label>
                Email:
                <input type='text' nome='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br/>
            <label>
                Curso:
                <input type='text' nome='curso' value={curso} onChange={(e) => setCurso(e.target.value)} />
            </label>
            <br/>
            <input type='submit' value='Salvar' />
            
        </form>
    </div>
  </div>
  )
}

export default App