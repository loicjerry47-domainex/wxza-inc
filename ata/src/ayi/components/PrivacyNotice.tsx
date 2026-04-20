import React from 'react';
import { LockClosedIcon } from './icons';

export const PrivacyNotice: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pb-3">
      <LockClosedIcon className="w-3 h-3" />
      <span>Your conversation is private and is not saved.</span>
    </div>
  );
};