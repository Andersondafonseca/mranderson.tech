
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useCmsData } from '../hooks/useCmsData';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { getProjects } = useCmsData();

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Meus Projetos</h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Da tecnologia à agricultura, estes são os negócios que estou construindo para gerar impacto e inovação em diferentes setores.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Card
                key={project.name}
                title={project.name}
                description={project.description}
                linkTo={project.link}
                linkText="Saiba mais"
                icon={project.icon}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">Carregando projetos...</p>
        )}
      </div>
    </div>
  );
};

export default Projects;