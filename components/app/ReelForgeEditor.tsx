import React, { useState, useRef, useEffect } from 'react';
import { Plus, Play, Pause, Trash2, ChevronDown } from 'lucide-react';

// Types
interface Word {
  startTime: string;
  endTime: string;
  word: string;
}

interface Alternative {
  transcript: string;
  confidence: number;
  words: Word[];
}

interface TranscriptItem {
  alternatives: Alternative[];
  resultEndTime: string;
  languageCode: string;
}

interface TextSegment {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  style: {
    fontSize: number;
    fontFamily: string;
    color: string;
    backgroundColor: string;
    position: { x: number; y: number };
    textAlign: 'left' | 'center' | 'right';
    bold: boolean;
    italic: boolean;
  };
  animation: {
    enter: 'none' | 'fade' | 'slide-up' | 'slide-down';
    exit: 'none' | 'fade' | 'slide-up' | 'slide-down';
  };
}

interface ReelForgeEditorProps {
  transcriptData: TranscriptItem[];
  videoUrl: string;
}

// Utility Functions
const parseTime = (timeStr: string): number => {
  return parseFloat(timeStr.replace('s', ''));
};

const transformTranscriptData = (apiData: TranscriptItem[]): TextSegment[] => {
  return apiData.map((item, index) => {
    const alternative = item.alternatives[0];
    const words = alternative.words;
    
    return {
      id: `segment-${index}`,
      text: alternative.transcript.trim(),
      startTime: parseTime(words[0].startTime),
      endTime: parseTime(item.resultEndTime),
      style: {
        fontSize: 48,
        fontFamily: 'Inter',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: { x: 50, y: 85 },
        textAlign: 'center',
        bold: true,
        italic: false,
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
      },
    };
  });
};

// Sentence Card Component
const SentenceCard = ({ segment, onUpdate, onDelete, isActive }: {
  segment: TextSegment;
  onUpdate: (segment: TextSegment) => void;
  onDelete: () => void;
  isActive: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateSegment = (updates: Partial<TextSegment>) => {
    onUpdate({ ...segment, ...updates });
  };

  const updateStyle = (styleUpdates: Partial<TextSegment['style']>) => {
    onUpdate({ ...segment, style: { ...segment.style, ...styleUpdates } });
  };

  const updateAnimation = (animationUpdates: Partial<TextSegment['animation']>) => {
    onUpdate({ ...segment, animation: { ...segment.animation, ...animationUpdates } });
  };

  return (
    <div className={`border rounded-lg p-4 mb-3 transition-all ${
      isActive 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md' 
        : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <textarea
            value={segment.text}
            onChange={(e) => updateSegment({ text: e.target.value })}
            className="w-full text-sm font-medium resize-none border-0 p-0 focus:ring-0 bg-transparent text-zinc-900 dark:text-zinc-100"
            rows={2}
          />
          <div className="flex gap-4 mt-2 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={segment.startTime.toFixed(2)}
                onChange={(e) => updateSegment({ startTime: parseFloat(e.target.value) })}
                step="0.1"
                className="w-16 px-2 py-1 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
              <span>→</span>
              <input
                type="number"
                value={segment.endTime.toFixed(2)}
                onChange={(e) => updateSegment({ endTime: parseFloat(e.target.value) })}
                step="0.1"
                className="w-16 px-2 py-1 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              />
              <span>sec</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={onDelete}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Font Size</label>
              <input
                type="range"
                min="20"
                max="80"
                value={segment.style.fontSize}
                onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
                className="w-full"
              />
              <span className="text-xs text-zinc-500">{segment.style.fontSize}px</span>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Font Family</label>
              <select
                value={segment.style.fontFamily}
                onChange={(e) => updateStyle({ fontFamily: e.target.value })}
                className="w-full text-xs border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Impact">Impact</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Text Color</label>
              <input
                type="color"
                value={segment.style.color}
                onChange={(e) => updateStyle({ color: e.target.value })}
                className="w-full h-8 border border-zinc-200 dark:border-zinc-700 rounded"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Background</label>
              <input
                type="color"
                value={segment.style.backgroundColor.replace('rgba(0, 0, 0, 0.7)', '#000000')}
                onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                className="w-full h-8 border border-zinc-200 dark:border-zinc-700 rounded"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Text Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateStyle({ bold: !segment.style.bold })}
                className={`px-3 py-1 text-xs border rounded ${
                  segment.style.bold ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <strong>B</strong>
              </button>
              <button
                onClick={() => updateStyle({ italic: !segment.style.italic })}
                className={`px-3 py-1 text-xs border rounded ${
                  segment.style.italic ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <em>I</em>
              </button>
              <select
                value={segment.style.textAlign}
                onChange={(e) => updateStyle({ textAlign: e.target.value as any })}
                className="text-xs border border-zinc-200 dark:border-zinc-700 rounded px-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
              Position (X: {segment.style.position.x}%, Y: {segment.style.position.y}%)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Horizontal</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={segment.style.position.x}
                  onChange={(e) => updateStyle({ position: { ...segment.style.position, x: parseInt(e.target.value) } })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Vertical</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={segment.style.position.y}
                  onChange={(e) => updateStyle({ position: { ...segment.style.position, y: parseInt(e.target.value) } })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Enter Animation</label>
              <select
                value={segment.animation.enter}
                onChange={(e) => updateAnimation({ enter: e.target.value as any })}
                className="w-full text-xs border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <option value="none">None</option>
                <option value="fade">Fade</option>
                <option value="slide-up">Slide Up</option>
                <option value="slide-down">Slide Down</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1">Exit Animation</label>
              <select
                value={segment.animation.exit}
                onChange={(e) => updateAnimation({ exit: e.target.value as any })}
                className="w-full text-xs border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <option value="none">None</option>
                <option value="fade">Fade</option>
                <option value="slide-up">Slide Up</option>
                <option value="slide-down">Slide Down</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Video Canvas Component
const VideoCanvas = ({ videoRef, segments, currentTime }: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  segments: TextSegment[];
  currentTime: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activeSegment = segments.find(
      seg => currentTime >= seg.startTime && currentTime <= seg.endTime
    );

    if (activeSegment) {
      const { text, style } = activeSegment;
      
      ctx.font = `${style.bold ? 'bold' : 'normal'} ${style.italic ? 'italic' : 'normal'} ${style.fontSize}px ${style.fontFamily}`;
      
      const x = (canvas.width * style.position.x) / 100;
      const y = (canvas.height * style.position.y) / 100;
      
      const metrics = ctx.measureText(text);
      const textWidth = metrics.width;
      const textHeight = style.fontSize;
      const padding = 20;
      
      // Draw background
      ctx.fillStyle = style.backgroundColor;
      ctx.fillRect(
        x - textWidth / 2 - padding,
        y - textHeight / 2 - padding / 2,
        textWidth + padding * 2,
        textHeight + padding
      );
      
      // Draw text
      ctx.fillStyle = style.color;
      ctx.textAlign = style.textAlign;
      ctx.textBaseline = 'middle';
      ctx.fillText(text, x, y);
    }
  }, [segments, currentTime]);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
};

// Timeline Component
const Timeline = ({ segments, duration, currentTime, onSeek }: {
  segments: TextSegment[];
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4">
      <div className="mb-2 flex justify-between text-xs text-zinc-600 dark:text-zinc-400">
        <span>{currentTime.toFixed(2)}s</span>
        <span>{duration.toFixed(2)}s</span>
      </div>
      
      <div 
        ref={timelineRef}
        onClick={handleTimelineClick}
        className="relative h-12 bg-zinc-100 dark:bg-zinc-800 rounded mb-2 cursor-pointer"
      >
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
        
        <div className="h-full flex items-center px-2">
          <div className="w-full h-8 bg-blue-200 dark:bg-blue-900 rounded flex items-center justify-center text-xs font-medium text-blue-900 dark:text-blue-100">
            Original Video
          </div>
        </div>
      </div>

      <div className="relative h-16 bg-zinc-100 dark:bg-zinc-800 rounded">
        {segments.map((segment) => {
          const left = (segment.startTime / duration) * 100;
          const width = ((segment.endTime - segment.startTime) / duration) * 100;
          
          return (
            <div
              key={segment.id}
              className="absolute top-2 h-12 bg-green-400 dark:bg-green-600 rounded border-2 border-green-600 dark:border-green-400 flex items-center justify-center text-xs font-medium text-green-900 dark:text-green-100 overflow-hidden px-2"
              style={{
                left: `${left}%`,
                width: `${width}%`,
              }}
              title={segment.text}
            >
              <span className="truncate">{segment.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main Editor Component
export default function ReelForgeEditor({ transcriptData, videoUrl }: ReelForgeEditorProps) {
  const [segments, setSegments] = useState<TextSegment[]>(() => transformTranscriptData(transcriptData));
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(10);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.src = videoUrl;
      
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
      };
      
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [videoUrl]);

  const updateSegment = (updatedSegment: TextSegment) => {
    setSegments(segments.map(seg => 
      seg.id === updatedSegment.id ? updatedSegment : seg
    ));
  };

  const deleteSegment = (id: string) => {
    setSegments(segments.filter(seg => seg.id !== id));
  };

  const addNewSegment = () => {
    const newSegment: TextSegment = {
      id: `segment-${Date.now()}`,
      text: 'New text segment',
      startTime: currentTime,
      endTime: currentTime + 2,
      style: {
        fontSize: 48,
        fontFamily: 'Inter',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: { x: 50, y: 85 },
        textAlign: 'center',
        bold: true,
        italic: false,
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
      },
    };
    setSegments([...segments, newSegment]);
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const activeSegment = segments.find(
    seg => currentTime >= seg.startTime && currentTime <= seg.endTime
  );

  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Video Preview */}
        <div className="w-1/2 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Video Preview</h2>
            <button
              onClick={togglePlayback}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex-1">
            <VideoCanvas
              videoRef={videoRef}
              segments={segments}
              currentTime={currentTime}
            />
          </div>
        </div>

        {/* Right: Transcript Editor */}
        <div className="w-1/2 p-6 flex flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Text Segments</h2>
              <p className="text-xs text-zinc-500">{segments.length} segments</p>
            </div>
            <button
              onClick={addNewSegment}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600"
            >
              <Plus className="h-3 w-3" />
              Add Segment
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            {segments.map((segment) => (
              <SentenceCard
                key={segment.id}
                segment={segment}
                onUpdate={updateSegment}
                onDelete={() => deleteSegment(segment.id)}
                isActive={activeSegment?.id === segment.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Timeline
        segments={segments}
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />
    </div>
  );
}