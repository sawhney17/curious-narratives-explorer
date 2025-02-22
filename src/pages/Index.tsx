import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DataCard from '@/components/DataCard';
import { BookOpen, Globe, Database, Archive, Video } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const datasets = [
    {
      id: 'archives',
      title: 'University Archives',
      description: 'Explore historical documents and records from the university collection',
      icon: <Archive className="text-indigo-500" />
    },
    {
      id: 'herbaria',
      title: 'Digital Herbaria',
      description: 'Discover botanical specimens and their stories',
      icon: <Globe className="text-emerald-500" />
    },
    {
      id: 'custom',
      title: 'Upload Dataset',
      description: 'Analyze and explore your own data',
      icon: <Database className="text-blue-500" />
    },
    {
      id: 'library',
      title: 'Digital Library',
      description: 'Access curated collections and rare manuscripts',
      icon: <BookOpen className="text-amber-500" />
    },
    {
      id: 'video-chat',
      title: 'AI Video Chat',
      description: 'Have an interactive conversation with an AI assistant',
      icon: <Video className="text-purple-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mb-4">
            Welcome to the Archive
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Explore Data Stories
          </h1>
          <p className="text-lg text-gray-600">
            Discover and interact with our digital collections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <motion.div
              key={dataset.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (dataset.id === 'video-chat') {
                  navigate('/video-chat');
                } else {
                  navigate(`/dataset/${dataset.id}`);
                }
              }}
            >
              <DataCard
                title={dataset.title}
                description={dataset.description}
                icon={dataset.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
