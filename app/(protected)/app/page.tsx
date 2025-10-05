"use client"
import { useState, useRef } from 'react';
import { Upload, Video, X, Settings, Type, Palette, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

interface VideoUploadResult {
  filename: string;
  message: string;
  result: {
    data: any[];
    original_name: string;
    status: string;
  };
}

export default function ReelForgeApp() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState<VideoUploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreviewUrl(url);
      // Reset previous results
      setUploadResult(null);
      // Auto-upload after selection
      uploadVideoToBackend(file);
    }
  };

  const uploadVideoToBackend = async (file: File) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/video/uploadVideo`,
        formData,
        {
          headers: {
            'accept': 'application/json',
          },
          withCredentials: true
        }
      );

      console.log('Upload successful:', response.data);
      setUploadResult(response.data);
      toast.success('Video processed successfully!');

    } catch (err: any) {
      console.error('Upload error:', err);

      if (err.response) {
        const errorMessage = err.response.data.detail || err.response.data.message;
        toast.error(errorMessage || 'Video upload failed. Please try again.');
      } else if (err.request) {
        toast.error('Unable to connect to server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsProcessing(false);
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
    setUploadResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-[calc(100vh-73px)] bg-zinc-50 dark:bg-zinc-950 flex overflow-hidden">
      {/* Left Side - Video Upload */}
      <div className="w-1/2 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col overflow-hidden">
        <div className="mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Upload Video</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Upload your video to start editing</p>
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          {!uploadedFile ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                flex-1 border-2 border-dashed rounded-lg p-8 text-center
                transition-colors cursor-pointer flex items-center justify-center
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
              
              <div className="flex flex-col items-center gap-3">
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
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                    <Video className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{uploadedFile.name}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveVideo}
                  className="h-7 w-7"
                  disabled={isProcessing}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {videoPreviewUrl && (
                <div className="flex-1 bg-black rounded-lg overflow-hidden min-h-0">
                  <video
                    src={videoPreviewUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Results/Editor */}
      <div className={`w-1/2 p-6 flex flex-col overflow-hidden ${!uploadedFile ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {isProcessing ? 'Processing Video' : 'Transcript Results'}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {isProcessing ? 'Extracting audio and generating transcript...' : 'Video transcript and timing data'}
          </p>
        </div>

        {!uploadedFile ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-zinc-400" />
              </div>
              <p className="text-base font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                Upload a video to get started
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Once uploaded, you'll be able to edit subtitles and customize styling
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Type className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Text Controls</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Edit subtitle text, timing, and placement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Palette className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Style Options</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Customize fonts, colors, and effects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Advanced Settings</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">Fine-tune animations and transitions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isProcessing ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-zinc-900 dark:text-zinc-100 animate-spin mx-auto mb-4" />
              <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">Processing your video...</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Extracting audio and generating transcript</p>
            </div>
          </div>
        ) : uploadResult ? (
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 overflow-auto min-h-0">
            <div className="mb-4">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">Status: {uploadResult.result.status}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">{uploadResult.message}</p>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
              <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mb-2">Transcript Data:</p>
              <pre className="text-xs text-zinc-600 dark:text-zinc-400 overflow-auto">
                {JSON.stringify(uploadResult.result.data, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Waiting for processing results...</p>
          </div>
        )}
      </div>
    </div>
  );
}