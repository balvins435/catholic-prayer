// Fallback prayer data when Gemini API is not available
export const fallbackPrayers = {
  morning: `Lord God Almighty,
  as I begin this day,
  I place myself in your presence.
  Guide my thoughts, words, and actions.
  May your Holy Spirit be with me.
  Through Christ our Lord. Amen.`,
  
  evening: `Heavenly Father,
  as this day ends,
  I thank you for your blessings.
  Forgive my shortcomings.
  Watch over me through the night.
  In Jesus' name. Amen.`,
  
  rosary: {
    joyful: `The Joyful Mysteries remind us of Christ's incarnation...`,
    sorrowful: `The Sorrowful Mysteries contemplate Jesus' passion...`,
    glorious: `The Glorious Mysteries celebrate Christ's resurrection...`,
    luminous: `The Luminous Mysteries reveal Christ's public ministry...`
  }
};

export const dailyReadings = {
  // Sample readings - you would update these daily
  firstReading: {
    citation: "1 John 4:7-10",
    text: "Beloved, let us love one another, because love is of God..."
  },
  psalm: {
    antiphon: "The Lord has made known his salvation.",
    text: "Sing to the Lord a new song, for he has done wondrous deeds..."
  },
  gospel: {
    citation: "Mark 6:34-44",
    text: "When Jesus saw the vast crowd, his heart was moved with pity..."
  }
};
