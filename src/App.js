import React from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";
import { useState } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const baseURLProject = '/repository';

  useEffect(()=>{
    const getProjects = async ()=>{
      const { data } = await api.get(baseURLProject);
      setProjects(data);
    }

    getProjects();
  }, []);

  async function handleAddRepository() {
    const {data: project} = await api.post(baseURLProject, {
      title: `Teste ${new Date().toJSON()}`,
      owner: 'Teste ahahaha',
      url: 'url',
      techs: [],
    });

    setProjects([ ...projects, project ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(baseURLProject + `/${id}`);
    setProjects(projects.filter(p => p.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project, index) => (
          <li key={index}>
            { project.title }

            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
