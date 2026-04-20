import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { GenesisTimeline } from '../genesis-timeline';
import { useConsciousness } from '../consciousness';

export function GenesisChamber() {
  const { visitChamber } = useConsciousness();
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

  useEffect(() => {
    visitChamber('genesis');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}