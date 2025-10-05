"use client"
import { useState, useRef } from 'react';
import { Upload, Video, Sparkles, Wand2, X, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Types for the backend response (structure ready for future use)
interface TranscriptWord {
  word: string;
  start: number;
  end: number;
}

interface ProcessingResult {
  transcript: TranscriptWord[];
  duration: number;
  videoUrl: string;
  // Add other fields as needed
}

export default function ReelForgeApp() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveVideo = () => {
    setUploadedFile(null);
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setVideoPreviewUrl(null);
    setProcessingResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleProcessVideo = async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    
    // TODO: Send video to backend for processing
    // const formData = new FormData();
    // formData.append('video', uploadedFile);
    // const response = await fetch('/api/process-video', {
    //   method: 'POST',
    //   body: formData
    // });
    // const result = await response.json();
    // setProcessingResult(result);
    
    // Simulate processing for now
    setTimeout(() => {
      setIsProcessing(false);
      // Mock result - replace with actual backend data
      // setProcessingResult({
      //   transcript: [],
      //   duration: 0,
      //   videoUrl: ''
      // });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Video className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">ReelForge</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="h-9 text-sm">
                My Projects
              </Button>
              <Button variant="ghost" className="h-9 text-sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
            Transform Your Videos
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Upload your raw video and let AI create scroll-stopping content
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="space-y-4">
            {!uploadedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  border-2 border-dashed rounded-lg p-12 text-center
                  transition-colors cursor-pointer
                  ${isDragging 
                    ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800' 
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                  }
                `}
                onClick={handleUploadClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                      Drop your video here
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      or click to browse files
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Supports MP4, MOV, AVI • Max 500MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Video className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">{uploadedFile.name}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveVideo}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {videoPreviewUrl && (
                  <div className="mb-4">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full rounded-md bg-black"
                    />
                  </div>
                )}

                <Button
                  onClick={handleProcessVideo}
                  disabled={isProcessing}
                  className="w-full h-9"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Transform Video
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Processing Results
            </h3>

            {!processingResult && !isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-zinc-400" />
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Upload and process a video to see results
                </p>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 text-zinc-900 dark:text-zinc-100 animate-spin mb-4" />
                <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Processing your video...</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Processing Complete!</span>
                </div>
                
                {/* Placeholder for processed data */}
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Transcript & Data</p>
                  <div className="text-xs text-zinc-500 font-mono">
                    {/* TODO: Display transcript, timestamps, etc. */}
                    Results will appear here...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Wand2, title: 'AI Captions', desc: 'Auto-generated, perfectly timed' },
            { icon: Video, title: 'B-Roll Overlay', desc: 'Engaging visual elements' },
            { icon: Sparkles, title: 'Cinematic Effects', desc: 'Professional polish' }
          ].map((feature, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
              <feature.icon className="h-8 w-8 text-zinc-900 dark:text-zinc-100 mb-3" />
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{feature.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}