
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DataCard from '@/components/DataCard';
import { BookOpen, Globe, Database, Archive, Video, Clock, MessageCircleQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';

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
      icon: <Video className="text-purple-500" />,
      route: '/video-chat'
    },
    {
      id: 'timeline',
      title: 'Interactive Timeline',
      description: 'Explore key events with an interactive timeline',
      icon: <Clock className="text-orange-500" />,
      route: '/timeline'
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
          <p className="text-lg text-gray-600 mb-8">
            Discover and interact with our digital collections
          </p>

          {/* New AI Assistant Introduction Card */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="mx-auto max-w-2xl p-6 cursor-pointer hover:bg-gray-50 transition-colors border-amber-200 mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-amber-100">
                    <MessageCircleQuestion className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-amber-800">Meet Your AI Historian & Botanist</h3>
                    <p className="text-amber-600">I'm here to guide you through the archives and help you discover fascinating stories!</p>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Welcome to Your Personal Archive Guide!</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 pt-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <video
                        src="https://example.com/welcome-video.mp4"
                        className="w-full h-full object-cover"
                        controls
                        poster="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p className="text-gray-600">
                      I'm your AI assistant, specializing in historical archives and botanical specimens. 
                      I can help you explore the collections, understand complex documents, and discover 
                      fascinating connections between different artifacts.
                    </p>
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => navigate('/video-chat')}
                        className="flex-1 bg-amber-500 hover:bg-amber-600"
                      >
                        Chat with Me
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/timeline')}
                        className="flex-1"
                      >
                        Explore Timeline
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <motion.div
              key={dataset.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (dataset.route) {
                  navigate(dataset.route);
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
