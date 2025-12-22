import React from 'react';

export interface Paper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  link?: string;
  pdfLink?: string;
  image: string;
  tags: string[];
}

export interface Member {
  name: string;
  role: string;
  description: string;
  avatar: string;
}

export interface DemoTrack {
  id: string;
  title: string;
  url: string; // URL to the mp3/wav
  language: 'Chinese' | 'English';
}

export interface InnovationPoint {
  title: string;
  description: string;
  icon?: React.ReactNode;
}