
import { useState } from 'react';
import { motion } from 'framer-motion';
import DataCard from '@/components/DataCard';
import { BookOpen, Globe, Database, Archive } from 'lucide-react';

const Index = () => {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Embark on an interactive journey through our collections. Each dataset tells a unique story waiting to be discovered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {datasets.map((dataset, index) => (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DataCard
                title={dataset.title}
                description={dataset.description}
                icon={dataset.icon}
                onClick={() => setSelectedDataset(dataset.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500">
            Click on any collection to begin your exploration
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
