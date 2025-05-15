import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project } from '../../types';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  website: string;
  github: string;
  twitter: string;
  linkedin: string;
  skills: string[];
  projects: Project[];
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (data: Partial<Profile>) => void;
}

const defaultProfile: Profile = {
  name: '',
  title: '',
  bio: '',
  avatar: '',
  location: '',
  email: '',
  website: '',
  github: '',
  twitter: '',
  linkedin: '',
  skills: [],
  projects: []
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile);

  const updateProfile = (data: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
