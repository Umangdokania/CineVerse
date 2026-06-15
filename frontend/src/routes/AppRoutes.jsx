import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import ChatBotButton from '../components/chatbot/ChatBotButton';

// Pages
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MovieCatalog from '../pages/MovieCatalog';
import MovieDetails from '../pages/MovieDetails';
import Watchlist from '../pages/Watchlist';
import Booking from '../pages/Booking'; // Virtual Movie Room
import MoodRecommendation from '../pages/MoodRecommendation';
import Profile from '../pages/Profile';
import AdminDashboard from '../pages/AdminDashboard';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Container */}
      <div className="flex flex-1">
        {/* Collapsible Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main Content Area */}
        <div 
          className={`flex-1 flex flex-col min-h-[calc(100vh-4rem)] transition-all duration-300 md:pb-0 pb-16 ${
            isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
          }`}
        >
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/catalog" element={<MovieCatalog />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/room" element={<Booking />} />
              <Route path="/mood" element={<MoodRecommendation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Footer inside content flow */}
          <Footer />
        </div>
      </div>

      {/* Floating Interactive Chatbot Panel */}
      <ChatBotButton />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
