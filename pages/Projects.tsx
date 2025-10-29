


import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { useCmsData } from '../hooks/useCmsData';
import { Project } from '../types';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import FadeIn from '../components/FadeIn';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getProjects } = useCmsData();

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      const data = await getProjects();
      setProjects(data);
      setIsLoading(false);
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-100">Meus Projetos</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Da tecnologia à agricultura, estes são os negócios que estou construindo para gerar impacto e inovação em diferentes setores.
            </p>
          </div>
        </FadeIn>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <FadeIn key={project.name}>
                <Card
                  imageUrl={project.imageUrl}
                  title={project.name}
                  description={project.description}
                  linkTo={project.link}
                  linkText="Saiba mais"
                  icon={!project.imageUrl ? project.icon : undefined}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;