// PreviewMap.tsx
import React from 'react';

export default function PreviewMap() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src="https://nsbe2026.expofp.com/"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="NSBE 2026 Expo Floorplan"
      />
    </div>
  );
}