// Master Programmatic Data for RiddlesAbout.com
const riddlesData = {
  stats: {
    totalRiddles: "2,500+",
    activeCategories: "8 Clusters",
    monthlyVisitors: "150k+",
    satisfactionRate: "99.4%"
  },
  categories: [
    { id: "animals", name: "Animals & Wildlife", icon: "🐶", count: 240, color: "from-blue-500 to-indigo-600", desc: "Clever puzzles about dogs, cats, lions, elephants, and wild creatures." },
    { id: "food", name: "Food & Beverages", icon: "🍕", count: 180, color: "from-emerald-500 to-teal-600", desc: "Tasty brain teasers about fruits, vegetables, snacks, and treats." },
    { id: "objects", name: "Everyday Objects", icon: "⏰", count: 320, color: "from-amber-500 to-orange-600", desc: "Mind benders about clocks, mirrors, keys, doors, and household items." },
    { id: "nature", name: "Nature & Space", icon: "🚀", count: 210, color: "from-cyan-500 to-blue-600", desc: "Cosmic and atmospheric riddles about stars, weather, rain, and sun." },
    { id: "kids-math", name: "Kids & Math Logic", icon: "🧠", count: 290, color: "from-purple-500 to-violet-600", desc: "Fun educational number games and logic puzzles for students." },
    { id: "professions", name: "Professions & Jobs", icon: "👨‍⚕️", count: 150, color: "from-pink-500 to-rose-600", desc: "Career-themed riddles about doctors, pilots, chefs, and teachers." },
    { id: "holidays", name: "Holidays & Parties", icon: "🎃", count: 130, color: "from-red-500 to-orange-600", desc: "Festive teasers for Christmas, Halloween, Birthdays, and Easter." },
    { id: "concepts", name: "Abstract & Mind Puzzles", icon: "💡", count: 310, color: "from-indigo-500 to-purple-600", desc: "Deep philosophical and lateral thinking riddles about time, shadows, and words." }
  ],
  topics: [
    // ANIMALS
    {
      slug: "dogs",
      title: "Riddles About Dogs",
      category: "animals",
      description: "Test your wits with 45+ clever riddles about man's best friend! Perfect for kids, dog lovers, and pet enthusiasts.",
      views: "24.2k",
      author: "Aki H.",
      date: "May 27, 2026",
      readTime: "4 min read",
      riddles: [
        {
          id: "dog-1",
          question: "I have four legs, a wagging tail, and love to fetch a tennis ball in the yard. What am I?",
          answer: "A Dog! 🐕",
          hint: "I am a faithful household pet that loves walks on a leash.",
          difficulty: "Easy",
          tags: ["Pet", "Animals", "Kids"]
        },
        {
          id: "dog-2",
          question: "I bark when excited, I love a good scratch, throw me a stick and I'll sprint for a fetch. What am I?",
          answer: "A Dog!",
          hint: "My favorite sound is hearing the word 'Walk!'",
          difficulty: "Easy",
          tags: ["Cute", "Pet"]
        },
        {
          id: "dog-3",
          question: "Every dog has me, but every tree has me too! I sound identical, but mean two completely different things. What am I?",
          answer: "BARK!",
          hint: "A sound a canine makes AND the outer layer of a tree trunk.",
          difficulty: "Medium",
          tags: ["Wordplay", "Logic"]
        },
        {
          id: "dog-4",
          question: "I can hear sounds humans miss, smell a treat hidden three rooms away, and guard your house night and day. What am I?",
          answer: "A Watchdog / Guard Dog!",
          hint: "I am a trained working canine.",
          difficulty: "Hard",
          tags: ["Working Breed", "Logic"]
        }
      ]
    },
    {
      slug: "cats",
      title: "Riddles About Cats",
      category: "animals",
      description: "Whimsical and sneaky riddles about feline friends, purrs, whiskers, and nine lives.",
      views: "18.9k",
      author: "Aki H.",
      date: "June 02, 2026",
      readTime: "3 min read",
      riddles: [
        {
          id: "cat-1",
          question: "I have nine lives, sharp whiskers, and love sleeping in sunbeams all day. What am I?",
          answer: "A Cat! 🐱",
          hint: "I purr when you pet me.",
          difficulty: "Easy",
          tags: ["Pet", "Feline"]
        },
        {
          id: "cat-2",
          question: "I walk silently on padded paws, love chasing mice, and always land on my feet. What am I?",
          answer: "A Cat!",
          hint: "I drink milk and love playing with yarn.",
          difficulty: "Easy",
          tags: ["Pet", "Fun"]
        }
      ]
    },

    // NATURE & SEASONS
    {
      slug: "spring",
      title: "100+ Best Springtime Riddles to Bloom Your Brain",
      category: "nature",
      description: "Celebrate blooming flowers, spring showers, Easter bunnies, and fresh green leaves with 100+ seasonal riddles!",
      views: "48.6k",
      author: "Aki H.",
      date: "July 12, 2026",
      readTime: "8 min read",
      riddles: [
        {
          id: "spr-1",
          question: "April showers bring May flowers, but what do May flowers bring?",
          answer: "Pilgrims! 🌸",
          hint: "A classic seasonal pun.",
          difficulty: "Easy",
          tags: ["Seasonal", "Pun"]
        },
        {
          id: "spr-2",
          question: "I appear in the sky after a spring rainstorm, showing seven beautiful colors in a big arch. What am I?",
          answer: "A Rainbow! 🌈",
          hint: "Red, orange, yellow, green, blue, indigo, violet.",
          difficulty: "Easy",
          tags: ["Weather", "Colors"]
        },
        {
          id: "spr-3",
          question: "I am an invisible thermal draft that carries dandelion seeds for miles across green fields. What am I?",
          answer: "A Spring Wind / Breeze!",
          hint: "You feel me blowing through your hair.",
          difficulty: "Medium",
          tags: ["Nature", "Science"]
        },
        {
          id: "spr-4",
          question: "I am a botanical process where plants turn spring sunshine, water, and carbon dioxide into fresh oxygen. What am I?",
          answer: "Photosynthesis! 🌿",
          hint: "Chlorophyll makes leaves green for this process.",
          difficulty: "Hard",
          tags: ["Botany", "Science"]
        }
      ]
    },

    // FOOD
    {
      slug: "apples",
      title: "Riddles About Apples",
      category: "food",
      description: "Juicy, crisp, and fun riddles about red, green, and golden apples.",
      views: "22.1k",
      author: "Aki H.",
      date: "April 18, 2026",
      readTime: "3 min read",
      riddles: [
        {
          id: "app-1",
          question: "I can be red, green, or yellow. An apple a day keeps the doctor away! What am I?",
          answer: "An Apple! 🍎",
          hint: "Snow White ate a poisoned one.",
          difficulty: "Easy",
          tags: ["Fruit", "Health"]
        },
        {
          id: "app-2",
          question: "I have a skin, a core, and seeds inside, but no heart. What fruit am I?",
          answer: "An Apple!",
          hint: "Think of Apple Pie.",
          difficulty: "Medium",
          tags: ["Food", "Logic"]
        }
      ]
    },

    // OBJECTS
    {
      slug: "clocks",
      title: "Riddles About Clocks",
      category: "objects",
      description: "Timeless brain teasers about hands that never clap and faces that never smile.",
      views: "45.8k",
      author: "Aki H.",
      date: "March 10, 2026",
      readTime: "4 min read",
      riddles: [
        {
          id: "clk-1",
          question: "I have a face and two hands, but no arms or legs. What am I?",
          answer: "A Clock! ⏰",
          hint: "I tick and tell time.",
          difficulty: "Easy",
          tags: ["Classic", "Objects"]
        },
        {
          id: "clk-2",
          question: "I run continuously without moving a single inch. What am I?",
          answer: "Time / A Clock!",
          hint: "Don't let me run out!",
          difficulty: "Medium",
          tags: ["Mind Bender"]
        }
      ]
    },

    // MATH & KIDS
    {
      slug: "math",
      title: "Riddles About Math & Numbers",
      category: "kids-math",
      description: "Tricky math logic puzzles to challenge students and sharpen problem solving.",
      views: "52.3k",
      author: "Aki H.",
      date: "Feb 14, 2026",
      readTime: "5 min read",
      riddles: [
        {
          id: "mth-1",
          question: "What 3 positive numbers give the same answer whether they are added or multiplied together?",
          answer: "1, 2, and 3! (1+2+3=6 and 1x2x3=6)",
          hint: "Start counting from one.",
          difficulty: "Hard",
          tags: ["Numbers", "Math"]
        },
        {
          id: "mth-2",
          question: "If you have 5 apples and you take away 3, how many apples do you have?",
          answer: "You have 3 apples! (The ones you took away)",
          hint: "Read the question carefully!",
          difficulty: "Medium",
          tags: ["Trick", "Logic"]
        }
      ]
    }
  ]
};
