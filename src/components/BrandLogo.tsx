/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'custom';
}

export default function BrandLogo({ className = '', showText = true, size = 'md' }: BrandLogoProps) {
  // Determine dimensions based on size
  const dimensionsMap = {
    sm: { width: '130px', height: 'auto' },
    md: { width: '180px', height: 'auto' },
    lg: { width: '240px', height: 'auto' },
    custom: { width: '100%', height: '100%' }
  };

  const dims = dimensionsMap[size];

  return (
    <div className={`flex items-center space-x-3 select-none ${className}`} id="brand-logo-container">
      {/* Dynamic, crisp vector graphic of the modern AD monogram with red-and-blue paths */}
      <svg
        viewBox="0 0 250 180"
        style={{ width: showText ? dims.width : '48px', height: '100%', minWidth: '40px' }}
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        id="brand-logo-svg"
      >
        {/* Slanted blue leg of capital A */}
        <path 
          d="M 33,135 L 115,30 H 127 L 45,135 Z" 
          fill="#0035AD" 
          id="logo-path-a-left"
        />

        {/* Vertical blue stem shared by A & D */}
        <path 
          d="M 115,30 H 127 V 135 H 115 Z" 
          fill="#0035AD" 
          id="logo-path-a-stem"
        />

        {/* Dynamic Red right leg of capital A curving down-right gracefully */}
        <path 
          d="M 94,75 Q 106,100 111,135 H 101 Q 96,105 88,83 Z" 
          fill="#E21111" 
          id="logo-path-a-red-leg"
        />

        {/* Outer and inner path of modern capital D loop */}
        <path 
          d="M 127,30 H 160 C 195,30 215,55 215,82.5 C 215,110 195,135 160,135 H 127 V 123 H 160 C 185,123 201,105 201,82.5 C 201,60 185,42 160,42 H 127 Z" 
          fill="#0035AD" 
          id="logo-path-d-loop"
        />

        {/* Serif logotype tag "Aiming good health" underneath */}
        {showText && (
          <text
            x="125"
            y="168"
            textAnchor="middle"
            fontFamily="Georgia, Cambria, 'Times New Roman', Times, serif"
            fontSize="18.5"
            fontWeight="bold"
            fill="#0E2353"
            letterSpacing="-0.2"
            id="logo-text-aiming"
          >
            Aiming good health
          </text>
        )}
      </svg>
    </div>
  );
}
