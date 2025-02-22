
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const DatasetViewer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'overview' | 'details' | 'visualize'>('overview');

  // Sample data - replace with API calls later
  const datasetInfo = {
    archives: {
      title: 'University Archives',
      description: 'Historical documents and records from the university collection',
      totalItems: 1234,
      lastUpdated: '2024-03-20',
      color: 'indigo'
    },
    herbaria: {
      title: 'Digital Herbaria',
      description: 'Botanical specimens and their stories',
      totalItems: 5678,
      lastUpdated: '2024-03-19',
      color: 'emerald'
    },
    custom: {
      title: 'Custom Dataset',
      description: 'Your uploaded data analysis',
      totalItems: 0,
      lastUpdated: 'N/A',
      color: 'blue'
    },
    library: {
      title: 'Digital Library',
      description: 'Curated collections and rare manuscripts',
      totalItems: 9012,
      lastUpdated: '2024-03-18',
      color: 'amber'
    }
  }[type as keyof typeof datasetInfo] || {
    title: 'Unknown Dataset',
    description: 'Dataset not found',
    totalItems: 0,
    lastUpdated: 'N/A',
    color: 'gray'
  };

  const handleShare = () => {
    // Sample share functionality
    toast.success('Share link copied to clipboard!');
  };

  const handleDownload = () => {
    // Sample download functionality
    toast.success('Download started!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collections
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => toast.info('Filters coming soon!')}>
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Dataset Info */}
          <Card className="p-6 mb-8 bg-white/90 backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-2">{datasetInfo.title}</h1>
            <p className="text-gray-600 mb-4">{datasetInfo.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{datasetInfo.totalItems.toLocaleString()} items</span>
              <span>•</span>
              <span>Last updated: {datasetInfo.lastUpdated}</span>
            </div>
          </Card>

          {/* View Selector */}
          <div className="flex gap-2 mb-6">
            {(['overview', 'details', 'visualize'] as const).map((view) => (
              <Button
                key={view}
                variant={activeView === view ? 'default' : 'outline'}
                onClick={() => setActiveView(view)}
                className="capitalize"
              >
                {view}
              </Button>
            ))}
          </div>

          {/* Content Area */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Placeholder content - replace with actual visualizations */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 h-64 flex items-center justify-center bg-white/90">
                <p className="text-gray-400">Content Panel {i}</p>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DatasetViewer;
