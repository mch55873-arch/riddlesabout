// Master Semantic Database for RiddlesAbout.com
// Koray Tuğberk Gübür Entity Hierarchy & Content Vectors

const riddlesData = {
  stats: {
    totalRiddles: "2,500+",
    activeCategories: 8,
    monthlyVisitors: "150k+",
    satisfactionRate: "99.4%"
  },
  
  categories: [
    {
      id: "animals",
      name: "Animals & Wildlife",
      icon: "🐾",
      desc: "Clever riddles about dogs, cats, lions, birds, sea creatures, and wildlife.",
      count: 450
    },
    {
      id: "food",
      name: "Food & Beverages",
      icon: "🍕",
      desc: "Tasty brain teasers about fruits, vegetables, coffee, pizza, and desserts.",
      count: 320
    },
    {
      id: "nature",
      name: "Nature & Seasons",
      icon: "🌸",
      desc: "Seasonal riddles for springtime, summer, autumn leaves, snow, and space.",
      count: 500
    },
    {
      id: "objects",
      name: "Everyday Objects",
      icon: "⏰",
      desc: "Household object riddles covering clocks, keys, mirrors, doors, and books.",
      count: 380
    },
    {
      id: "kids-math",
      name: "Kids & Math Logic",
      icon: "🧮",
      desc: "Educational logic puzzles, number challenges, and classroom riddles for kids.",
      count: 420
    },
    {
      id: "professions",
      name: "Jobs & Professions",
      icon: "👮",
      desc: "Riddles about doctors, firefighters, teachers, pilots, and chefs.",
      count: 180
    },
    {
      id: "holidays",
      name: "Holidays & Parties",
      icon: "🎃",
      desc: "Scavenger hunt clues for Halloween, Christmas, birthdays, and Easter.",
      count: 260
    },
    {
      id: "concepts",
      name: "Abstract Concepts",
      icon: "💡",
      desc: "Mind-bending logic riddles about time, shadows, secrets, and silence.",
      count: 240
    }
  ],

  topics: [
    {
      slug: "dogs",
      title: "75+ Best Riddles About Dogs (With Hints & Answers)",
      category: "animals",
      readTime: "12 min read",
      author: "Aki H.",
      date: "July 25, 2026",
      wordCount: 2500,
      description: "Explore 75+ clever, funny, and tricky riddles about dogs. Categorized by difficulty from easy puppy brain teasers to hard canine logic puzzles for adults.",
      riddles: [
        {
          id: "dog-1",
          difficulty: "Easy",
          question: "I walk on four legs, wag my tail when happy, and love playing fetch in the park. What am I?",
          hint: "Man's best friend!",
          answer: "A Dog"
        },
        {
          id: "dog-2",
          difficulty: "Easy",
          question: "I have a wet nose, sharp teeth, and soft ears. I bark at strangers and guard your house. What am I?",
          hint: "Common household pet.",
          answer: "A Watchdog"
        },
        {
          id: "dog-3",
          difficulty: "Medium",
          question: "I am a golden retriever that loves water, but I never get wet when I swim. How is this possible?",
          hint: "Think about what is swimming!",
          answer: "A reflection of a dog in the water"
        },
        {
          id: "dog-4",
          difficulty: "Medium",
          question: "What kind of dog keeps the best track of time?",
          hint: "Tick-tock!",
          answer: "A Watchdog"
        },
        {
          id: "dog-5",
          difficulty: "Hard",
          question: "I have four legs, a tail, and ears, but I can never run, bark, or eat a bone. What am I?",
          hint: "You see me in a toy box.",
          answer: "A Stuffed Toy Dog"
        }
      ]
    },
    {
      slug: "spring",
      title: "105+ Best Springtime Riddles to Bloom Your Brain (with Answers)",
      category: "nature",
      readTime: "15 min read",
      author: "Aki H.",
      date: "July 25, 2026",
      wordCount: 2800,
      description: "Bloom your mind with 105+ springtime riddles about blooming flowers, April rain, honeybees, and sunshine. Perfect for classrooms, teachers, and kids.",
      riddles: [
        {
          id: "spring-1",
          difficulty: "Easy",
          question: "April showers bring May flowers, but what do May flowers bring?",
          hint: "Think of early settlers!",
          answer: "Pilgrims (The Mayflower ship!)"
        },
        {
          id: "spring-2",
          difficulty: "Easy",
          question: "I fall from the sky in April to help green grass grow, but I am not snow. What am I?",
          hint: "You need an umbrella for me.",
          answer: "Rain"
        },
        {
          id: "spring-3",
          difficulty: "Medium",
          question: "I have colorful petals, open up in the morning sun, and attract buzzing bees. What am I?",
          hint: "Planted in gardens.",
          answer: "A Flower"
        },
        {
          id: "spring-4",
          difficulty: "Medium",
          question: "I am yellow and warm, appearing after a long cold winter to melt the snow away. What am I?",
          hint: "Look up at the sky!",
          answer: "The Spring Sunshine"
        },
        {
          id: "spring-5",
          difficulty: "Hard",
          question: "I buzz around gardens in spring, building wax castles and making sweet gold without a kitchen. What am I?",
          hint: "Makers of honey.",
          answer: "A Honeybee"
        }
      ]
    },
    {
      slug: "apples",
      title: "45+ Fun Riddles About Apples & Fruits (With Answers)",
      category: "food",
      readTime: "8 min read",
      author: "Aki H.",
      date: "July 25, 2026",
      wordCount: 1400,
      description: "Crisp and juicy riddles about apples, orchards, pie, and fruit trivia. Perfect for family game nights and classroom nutrition activities.",
      riddles: [
        {
          id: "apple-1",
          difficulty: "Easy",
          question: "I am crisp, red or green, grow on trees in an orchard, and keep the doctor away. What am I?",
          hint: "An apple a day!",
          answer: "An Apple"
        },
        {
          id: "apple-2",
          difficulty: "Medium",
          question: "What has a core but no heart, a skin but no bones, and seeds inside?",
          hint: "A delicious autumn fruit.",
          answer: "An Apple"
        },
        {
          id: "apple-3",
          difficulty: "Hard",
          question: "If you take away my skin, I stay white. If you leave me exposed to air, I turn brown. What am I?",
          hint: "Oxidation in fruit!",
          answer: "A Sliced Apple"
        }
      ]
    },
    {
      slug: "clocks",
      title: "35+ Clever Riddles About Clocks & Time (With Answers)",
      category: "objects",
      readTime: "7 min read",
      author: "Aki H.",
      date: "July 25, 2026",
      wordCount: 1300,
      description: "Tick-tock! Challenge your mind with 35+ clever riddles about clocks, watches, time, and hours.",
      riddles: [
        {
          id: "clock-1",
          difficulty: "Easy",
          question: "I have a face and two hands, but no arms or legs. What am I?",
          hint: "I hang on the wall.",
          answer: "A Clock"
        },
        {
          id: "clock-2",
          difficulty: "Medium",
          question: "What moves constantly forward but never takes a step?",
          hint: "It waits for no man.",
          answer: "Time"
        },
        {
          id: "clock-3",
          difficulty: "Hard",
          question: "I strike without hands, ring without a phone, and tell you when to wake up. What am I?",
          hint: "Set me for 7:00 AM!",
          answer: "An Alarm Clock"
        }
      ]
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = riddlesData;
}
