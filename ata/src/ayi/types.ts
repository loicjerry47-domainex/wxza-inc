export type MessageRole = 'user' | 'model';

export type GenerationStatus = 'pending' | 'generating' | 'generating-video' | 'done' | 'error';


export interface BaseSource {
  title: string;
  uri: string;
}

export interface WebSource extends BaseSource {
  type: 'web';
}
export interface MapSource extends BaseSource {
  type: 'map';
}
export interface WxzaSource {
  type: 'wxza';
  title: string;
}

export type Source = WebSource | MapSource | WxzaSource;


export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  fileName?: string;
  fileType?: string;
  isStreaming?: boolean;
  sources?: Source[];
  generationStatus?: GenerationStatus;
  statusMessage?: string;
  isLeap?: boolean;
  followUpPrompts?: string[];
}