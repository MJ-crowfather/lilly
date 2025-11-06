'use client';

import * as React from 'react';

export const DoneStatusIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="8" height="8" rx="1.5" className="fill-green-100 dark:fill-green-900/50 stroke-green-500 dark:stroke-green-400" strokeWidth="1"/>
    </svg>
);
