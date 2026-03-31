'use client';

import Head from 'next/head';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Services from '@/components/Services';
import DoctorsSection from '@/components/DoctorsSection';
// import HospitalsSection from '@/components/HospitalsSection';
// import AppDownload from '@/components/AppDownload';
import Footer from '@/components/Footer';
import NearbyClinicsPage from '@/components/NearbyClinics';
import Articles from '@/components/Articles';
import PatientHistoryPage from './patient-history/page';
import PatientHistoryCTA from '@/components/PatienHistory';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Practo Clone | Book Doctor Appointments</title>
        <meta name="description" content="Book doctor appointments, Order medicine, Health checkups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <HeroSection />
        <Services />
        <DoctorsSection />
        <NearbyClinicsPage/>

        <Articles/>
       
       
        {/* <HospitalsSection /> */}
        {/* <AppDownload /> */}
      </main>
      <Footer />
    </div>
  );
}