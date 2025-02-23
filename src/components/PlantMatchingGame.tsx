import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { toast } from 'sonner';

interface PlantCard {
  id: string;
  commonName: string;
  scientificName: string;
  type: 'common' | 'scientific';
  position: { x: number; y: number };
  isShaking: boolean;
}

const plantPairs = [
  {
    commonName: 'Dandelion',
    scientificName: 'Taraxacum officinale',
  },
  {
    commonName: 'Red Maple',
    scientificName: 'Acer rubrum',
  },
  {
    commonName: 'Sunflower',
    scientificName: 'Helianthus annuus',
  },
  {
    commonName: 'White Oak',
    scientificName: 'Quercus alba',
  },
  {
    commonName: 'Black-Eyed Susan',
    scientificName: 'Rudbeckia hirta',
  },
  {
    commonName: 'Eastern Redbud',
    scientificName: 'Cercis canadensis',
  }
];

const generatePositions = (count: number) => {
  const positions = [];
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const spacing = 200;
  
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = (col - cols/2) * spacing + (Math.random() - 0.5) * 100;
    const y = (row - rows/2) * spacing + (Math.random() - 0.5) * 100;
    positions.push({ x, y });
  }
  
  return positions;
};

const PlantMatchingGame = () => {
  const createCards = () => {
    const cards: PlantCard[] = [];
    const positions = generatePositions(plantPairs.length * 2);
    let posIndex = 0;
    
    plantPairs.forEach((pair, index) => {
      cards.push({
        id: `common-${index}`,
        commonName: pair.commonName,
        scientificName: pair.scientificName,
        type: 'common',
        position: positions[posIndex++],
        isShaking: false
      });
      cards.push({
        id: `scientific-${index}`,
        commonName: pair.commonName,
        scientificName: pair.scientificName,
        type: 'scientific',
        position: positions[posIndex++],
        isShaking: false
      });
    });
    return cards.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<PlantCard[]>(createCards());
  const [draggedCard, setDraggedCard] = useState<PlantCard | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const handleDragStart = (e: React.DragEvent, card: PlantCard) => {
    e.dataTransfer.setData('cardId', card.id);
    setDraggedCard(card);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-emerald-400');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-emerald-400');
  };

  const handleDrop = (e: React.DragEvent, targetCard: PlantCard) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-emerald-400');
    
    const draggedCardId = e.dataTransfer.getData('cardId');
    const draggedCard = cards.find(c => c.id === draggedCardId);
    
    if (!draggedCard || draggedCard.id === targetCard.id) return;

    if (
      draggedCard.commonName === targetCard.commonName &&
      draggedCard.type !== targetCard.type
    ) {
      const newMatchedPairs = [...matchedPairs, draggedCard.commonName];
      setMatchedPairs(newMatchedPairs);
      setScore(score + 1);
      
      toast.success("Perfect match! 🌿", {
        description: `${draggedCard.commonName} = ${draggedCard.scientificName}`
      });

      if (newMatchedPairs.length === plantPairs.length) {
        toast.success("Congratulations! 🎉", {
          description: "You've matched all the plants!"
        });
      }
    } else {
      setCards(cards.map(card => 
        (card.id === draggedCard.id || card.id === targetCard.id)
          ? { ...card, isShaking: true }
          : card
      ));
      
      setTimeout(() => {
        setCards(cards.map(card => ({ ...card, isShaking: false })));
      }, 500);

      toast.error("Not quite right! Try again! 🌱");
    }

    setDraggedCard(null);
  };

  const handleMotionDragEnd = (card: PlantCard, info: any) => {
    const newCards = cards.map(c => {
      if (c.id === card.id) {
        return {
          ...c,
          position: {
            x: c.position.x + info.offset.x,
            y: c.position.y + info.offset.y
          }
        };
      }
      return c;
    });
    setCards(newCards);
  };

  const isCardMatched = (card: PlantCard) => matchedPairs.includes(card.commonName);

  const shakeAnimation = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      },
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <p className="text-emerald-600 text-lg font-semibold bg-white/80 px-4 py-2 rounded-full shadow-md">
          Score: {score} / {plantPairs.length}
        </p>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {cards.map(card => (
            !isCardMatched(card) && (
              <motion.div
                key={card.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: card.isShaking ? [0, -10, 10, -10, 10, 0] : 0,
                  transition: {
                    x: {
                      duration: card.isShaking ? 0.5 : 0,
                      ease: "easeInOut"
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${card.position.x}px)`,
                  top: `calc(50% + ${card.position.y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                drag
                dragMomentum={false}
                onDragEnd={(e, info) => handleMotionDragEnd(card, info)}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 1 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Card 
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, card)}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, card)}
                  className={`w-[150px] h-[150px] p-4 flex items-center justify-center 
                    ${card.isShaking ? 'bg-red-50 border-red-200' : 'bg-white border-emerald-100'} 
                    shadow-md hover:shadow-lg transition-all border-2
                    ${draggedCard && draggedCard.id !== card.id ? 'hover:border-emerald-400' : ''}`}
                >
                  <p className={`text-center font-medium ${card.type === 'scientific' ? 'italic' : ''}`}>
                    {card.type === 'common' ? card.commonName : card.scientificName}
                  </p>
                </Card>
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {matchedPairs.length === plantPairs.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-emerald-800 mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-emerald-600">
              You've successfully matched all the plants!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlantMatchingGame;
