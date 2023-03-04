import { useEffect, useMemo, useState } from 'react'
import { useGeolocated } from "react-geolocated";
import styled from 'styled-components';
import { defaultVelocities } from './defaultVelocities';
import NoSleep from 'nosleep.js';

const StyledApp = styled.div<{
  overSpeedMps?: number
}>`
  background-color: hsl(${p => 120 + Math.min(Math.max((p.overSpeedMps ?? 0) / 3, -1), 1) * 120}, 96%, 79%);
  transition: background-color 0.2s ease-in-out;
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .desiredSpeed {
    font-size: 5em;
  }
  pre {
    /* display: none; */
  }
`

function App() {
  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 15000,
  });

  useEffect(() => {
    const noSleep = new NoSleep();
    noSleep.enable();
  }, []);
  const speedkmph = useMemo(() => coords?.speed && (coords?.speed * 3.6), [coords?.speed])

  const estimatedDesiredSpeedMps = useMemo(() => {
    const currentSpeed = coords?.speed ?? 0;
    // Find closest defaultVelocity
    return defaultVelocities.map((velocity) => {
      return {
        diff: Math.abs(currentSpeed - velocity),
        velocity,
      }
    }).sort((a, b) => a.diff - b.diff)[0].velocity;
  }, [coords?.speed])

  return (
    <StyledApp overSpeedMps={coords?.speed ? (estimatedDesiredSpeedMps - coords?.speed) : 0}>
      <pre>
        {JSON.stringify({ isGeolocationAvailable, isGeolocationEnabled, speedkmph: Math.round(speedkmph ?? 0), estimatedDesiredSpeed: Math.round(estimatedDesiredSpeedMps * 3.6) }, null, 2)}
      </pre>
      <div className="desiredSpeed">
        {Math.round(estimatedDesiredSpeedMps * 3.6)}
      </div>
    </StyledApp>
  )
}

export default App
