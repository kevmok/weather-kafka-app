'use client';
import React from 'react';
import { UserProvider } from '@/components/UserContext';
import { WeatherDataProvider } from '@/components/WeatherDataContext';
import { PageBackground } from '@/components/PageBackground';
import { Stats } from '@/components/stats';

export default function Page() {
  return (
    <UserProvider>
      <WeatherDataProvider>
        {/* <PageBackground>some text</PageBackground> */}
        <Stats />
      </WeatherDataProvider>
    </UserProvider>
  );
}
