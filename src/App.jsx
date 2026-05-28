import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AuthModal from './components/AuthModal';
import { FavoritesProvider } from './context/FavoritesContext';
import { ComparisonProvider } from './context/ComparisonContext';

// Pages
import Home from './pages/Home';
import Listings from './pages/Listings';
import Details from './pages/Details';
import Compare from './pages/Compare';
import AIRecommendation from './pages/AIRecommendation';
import Sell from './pages/Sell';
import DealerDashboard from './pages/DealerDashboard';
import UserProfile from './pages/UserProfile';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Mock Database Initial
import { carsData } from './data/cars';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCarId, setSelectedCarId] = useState('car-1');
  const [localCars, setLocalCars] = useState(carsData);

  // Authentication State
  const [authOpen, setAuthOpen] = useState(false);
  const [userState, setUserState] = useState({
    name: '',
    email: '',
    isLoggedIn: false
  });

  const handleAddCar = (newCar) => {
    setLocalCars(prev => [newCar, ...prev]);
  };

  const handleDeleteCar = (carId) => {
    setLocalCars(prev => prev.filter(c => c.id !== carId));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
      case 'listings':
        return <Listings setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
      case 'details':
        return <Details currentCarId={selectedCarId} setCurrentPage={setCurrentPage} />;
      case 'compare':
        return <Compare setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
      case 'ai-recommendation':
        return <AIRecommendation setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
      case 'sell':
        return <Sell onAddCar={handleAddCar} setCurrentPage={setCurrentPage} />;
      case 'dealer-dashboard':
        return <DealerDashboard localCars={localCars} onDeleteCar={handleDeleteCar} />;
      case 'user-profile':
        return <UserProfile setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />;
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col relative selection:bg-accent-cyan selection:text-black">
      {/* Viewport-Locked Still Background Photo for the Entire App */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div 
          className="w-full h-full bg-cover bg-center filter brightness-[0.8]"
          style={{ backgroundImage: "url('/assets/hero_car_new.jpg')" }}
        />
        {/* Enhanced rich color overlays & gradients */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-green/10 mix-blend-color-dodge opacity-80" />
        <div className="absolute inset-0 bg-accent-cyan/3 mix-blend-overlay" />
      </div>

      {/* Main App Content Flow (relative layout, scrolls on top of fixed background) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Nav */}
        <Header 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          userState={userState}
          onOpenAuth={() => setAuthOpen(true)}
        />

        {/* Main Page Render Slot */}
        <main className="flex-grow">
          {renderPage()}
        </main>

        {/* Footer Details */}
        <Footer setCurrentPage={setCurrentPage} />
      </div>

      {/* Floating chatbot assistant */}
      <Chatbot setCurrentPage={setCurrentPage} setSelectedCarId={setSelectedCarId} />

      {/* Authentication Modal Overlay */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onAuthSuccess={setUserState}
      />
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <ComparisonProvider>
        <MainApp />
      </ComparisonProvider>
    </FavoritesProvider>
  );
}
