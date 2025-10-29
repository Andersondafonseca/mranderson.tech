import React, { useState, useEffect } from 'react';
import YouTubeEmbed from '../../components/YouTubeEmbed';
import { useCmsData } from '../../hooks/useCmsData';
import { ExclusiveVideo } from '../../types';

const ExclusiveVideoteca: React.FC = () => {
  const [videos, setVideos] = useState<ExclusiveVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getExclusiveVideos } = useCmsData();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string>('');

  useEffect(() => {
    const fetchVideos = async () => {
        setIsLoading(true);
        const data = await getExclusiveVideos();
        setVideos(data);
        setIsLoading(false);
    };
    fetchVideos();
  }, [getExclusiveVideos]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const openVideoModal = (videoId: string, title: string) => {
    setSelectedVideoId(videoId);
    setSelectedVideoTitle(title);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId(null);
    setSelectedVideoTitle('');
  };

  return (
    <>
      <section className="py-12 md:py-16">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Videoteca Exclusiva</h2>
        <p className="text-slate-400 mb-8">Aulas, bastidores e pílulas de dúvida para aprofundar os conceitos do livro.</p>
        
        {isLoading ? (
            <p className="text-center text-slate-400">Carregando vídeos...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
                <div
                key={video.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                onClick={() => openVideoModal(video.youtubeVideoId, video.title)}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openVideoModal(video.youtubeVideoId, video.title); }}
                >
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white text-3xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <i className="fas fa-play"></i>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <h3 className="font-bold text-slate-100 text-lg">{video.title}</h3>
                    <p className="text-slate-300 text-sm mt-1" dangerouslySetInnerHTML={{ __html: video.description }}></p>
                </div>
                </div>
            ))}
            </div>
        )}
      </section>

      {isModalOpen && selectedVideoId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeVideoModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl shadow-amber-500/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-4 text-white text-4xl hover:text-amber-400 transition-colors z-10"
              aria-label="Fechar vídeo"
            >
              &times;
            </button>
            <YouTubeEmbed videoId={selectedVideoId} title={selectedVideoTitle} />
          </div>
        </div>
      )}
    </>
  );
};

export default ExclusiveVideoteca;