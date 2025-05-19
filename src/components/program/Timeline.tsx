
import React from 'react';

interface TimelineItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink via-peach to-mandarin transform md:-translate-x-px"></div>
      
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`relative opacity-0 animate-fade-in`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Circle on the line */}
            <div className={`absolute left-5 md:left-1/2 top-5 transform -translate-x-2.5 md:-translate-x-3 w-5 h-5 rounded-full border-2 z-10 ${
              item.highlight 
                ? 'bg-mandarin border-mandarin' 
                : 'bg-white dark:bg-gray-800 border-peach'
            }`}>
            </div>
            
            {/* Content */}
            <div className={`ml-16 md:ml-0 relative md:grid md:grid-cols-2 md:gap-8 ${
              index % 2 === 0 ? 'md:text-right' : ''
            }`}>
              {/* Time */}
              <div className={`text-lg font-bold text-gray-700 dark:text-gray-300 mb-1 md:mb-0 ${
                index % 2 === 0 
                  ? 'md:col-start-1' 
                  : 'md:col-start-2'
              }`}>
                {item.time}
              </div>
              
              {/* Content Box */}
              <div className={`glass rounded-2xl p-5 transition-all hover:shadow-lg ${
                index % 2 === 0 
                  ? 'md:col-start-2' 
                  : 'md:col-start-1'
              } ${
                item.highlight 
                  ? 'border-l-4 border-mandarin shadow-lg' 
                  : ''
              }`}>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
