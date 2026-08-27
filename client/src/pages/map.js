import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import GISMap from '../components/Map/GISMap';

export default function MapPage() {
  return (
    <ProtectedRoute>
      <div className="h-[calc(100vh-6rem)] w-full">
        <GISMap />
      </div>
    </ProtectedRoute>
  );
}
