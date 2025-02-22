
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface DataCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DataCard = ({ title, description, icon, onClick }: DataCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="relative p-6 cursor-pointer overflow-hidden group bg-white/90 backdrop-blur-sm 
                   border border-gray-200 hover:border-gray-300 transition-all duration-300"
        onClick={onClick}
      >
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-gray-500 text-center">{description}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
      </Card>
    </motion.div>
  );
};

export default DataCard;
