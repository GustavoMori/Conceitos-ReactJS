import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      id: "123",
      url: "xablau",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)
    //const updatedresponse = await api.get('repositories')
    setRepositories(repositories.filter(repository => (repository.id != id)))
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => {
            //return <li key={repository.id}>{repository.title}</li>
            //})
            return (
              <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
              
            )})
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
