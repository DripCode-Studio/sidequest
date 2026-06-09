import type { Quest, Category, Rarity } from "./types"

// Helper to build a quest with derived xp from rarity + difficulty
const rarityBaseXp: Record<Rarity, number> = {
  COMMON: 50,
  RARE: 120,
  EPIC: 220,
  LEGENDARY: 350,
  MYTHIC: 500,
}

function q(
  id: number,
  title: string,
  description: string,
  category: Category,
  rarity: Rarity,
  difficulty: number,
): Quest {
  return {
    id,
    title,
    description,
    category,
    rarity,
    difficulty,
    xp: rarityBaseXp[rarity] + difficulty * 20,
  }
}

export const QUESTS: Quest[] = [
  // Fitness (1-10)
  q(1, "Walk for 10 minutes", "Get outside and walk for ten minutes.", "Fitness", "COMMON", 1),
  q(2, "Walk for 20 minutes", "A longer stroll to clear your mind.", "Fitness", "COMMON", 2),
  q(3, "Do 10 pushups", "Drop and give yourself ten.", "Fitness", "RARE", 2),
  q(4, "Do 20 squats", "Feel the burn with twenty squats.", "Fitness", "RARE", 3),
  q(5, "Stretch for 5 minutes", "Loosen up those muscles.", "Fitness", "COMMON", 1),
  q(6, "Stretch for 10 minutes", "A full stretch routine.", "Fitness", "RARE", 2),
  q(7, "Climb stairs for 5 minutes", "Take the stairs instead of the elevator.", "Fitness", "RARE", 3),
  q(8, "Drink 1 liter of water", "Hydrate like a hero.", "Fitness", "COMMON", 1),
  q(9, "Go for a bike ride", "Pedal your way to adventure.", "Fitness", "EPIC", 4),
  q(10, "Do a 15-minute workout", "A focused fifteen minute session.", "Fitness", "EPIC", 4),

  // Productivity (11-20)
  q(11, "Clean your desk", "A clear desk, a clear mind.", "Productivity", "COMMON", 1),
  q(12, "Organize downloads folder", "Tame the digital chaos.", "Productivity", "RARE", 2),
  q(13, "Reply to one important email", "Clear that nagging message.", "Productivity", "COMMON", 1),
  q(14, "Study for 20 minutes", "Focused study, no distractions.", "Productivity", "RARE", 3),
  q(15, "Read 10 pages", "Ten pages of any book.", "Productivity", "COMMON", 2),
  q(16, "Finish one pending task", "Slay that lingering to-do.", "Productivity", "RARE", 3),
  q(17, "Write tomorrow's plan", "Plan your next day tonight.", "Productivity", "COMMON", 1),
  q(18, "Close unused browser tabs", "Free up your mind and RAM.", "Productivity", "COMMON", 1),
  q(19, "Clear desktop clutter", "A pristine desktop awaits.", "Productivity", "RARE", 2),
  q(20, "Review your goals", "Reflect on where you're headed.", "Productivity", "EPIC", 3),

  // Social (21-30)
  q(21, "Call a family member", "Reach out to someone who loves you.", "Social", "RARE", 2),
  q(22, "Text a friend", "Send a quick hello.", "Social", "COMMON", 1),
  q(23, "Thank someone", "Express genuine gratitude.", "Social", "COMMON", 1),
  q(24, "Compliment someone", "Brighten another person's day.", "Social", "COMMON", 1),
  q(25, "Start a conversation", "Talk to someone new.", "Social", "RARE", 3),
  q(26, "Check in on someone", "Ask a friend how they're really doing.", "Social", "RARE", 2),
  q(27, "Reconnect with an old friend", "Revive a faded connection.", "Social", "EPIC", 4),
  q(28, "Send a positive message", "Spread some good energy.", "Social", "COMMON", 1),
  q(29, "Ask someone how they are doing", "Show you care.", "Social", "COMMON", 1),
  q(30, "Have a phone-free conversation", "Be fully present with someone.", "Social", "EPIC", 3),

  // Mindfulness (31-40)
  q(31, "Meditate for 5 minutes", "Find a moment of stillness.", "Mindfulness", "COMMON", 1),
  q(32, "Meditate for 10 minutes", "Deepen your practice.", "Mindfulness", "RARE", 2),
  q(33, "Sit quietly for 10 minutes", "Just be, with no agenda.", "Mindfulness", "RARE", 2),
  q(34, "Watch the sunset", "Witness the day's end.", "Mindfulness", "RARE", 2),
  q(35, "Watch the sunrise", "Greet the new day.", "Mindfulness", "EPIC", 3),
  q(36, "Practice gratitude", "Name three things you're thankful for.", "Mindfulness", "COMMON", 1),
  q(37, "Journal for 10 minutes", "Put your thoughts on paper.", "Mindfulness", "RARE", 2),
  q(38, "Deep breathing exercise", "Breathe in calm, breathe out stress.", "Mindfulness", "COMMON", 1),
  q(39, "Spend 15 minutes offline", "Disconnect to reconnect.", "Mindfulness", "RARE", 2),
  q(40, "Reflect on your day", "Review your wins and lessons.", "Mindfulness", "COMMON", 1),

  // Adventure (41-50)
  q(41, "Explore a new street", "Wander somewhere unfamiliar.", "Adventure", "RARE", 2),
  q(42, "Visit a new coffee shop", "Discover a new favorite spot.", "Adventure", "RARE", 2),
  q(43, "Take a different route home", "Break your routine.", "Adventure", "COMMON", 1),
  q(44, "Spend time in a park", "Reconnect with nature.", "Adventure", "COMMON", 2),
  q(45, "Walk without headphones", "Listen to the world around you.", "Adventure", "COMMON", 1),
  q(46, "Visit a new place", "Go somewhere you've never been.", "Adventure", "EPIC", 4),
  q(47, "Photograph something interesting", "Capture a moment of beauty.", "Adventure", "RARE", 2),
  q(48, "Watch people in a public space", "Observe the world unfold.", "Adventure", "COMMON", 1),
  q(49, "Explore your neighborhood", "Find something new nearby.", "Adventure", "RARE", 3),
  q(50, "Try a new activity", "Step outside your comfort zone.", "Adventure", "LEGENDARY", 5),

  // Dopamine Detox (51-60)
  q(51, "No phone for 30 minutes", "Put the device down.", "Dopamine Detox", "RARE", 2),
  q(52, "No social media for 1 hour", "Reclaim an hour of your life.", "Dopamine Detox", "EPIC", 3),
  q(53, "Eat without screens", "Savor your meal mindfully.", "Dopamine Detox", "COMMON", 1),
  q(54, "Disable notifications for an hour", "Silence the noise.", "Dopamine Detox", "RARE", 2),
  q(55, "Leave phone in another room", "Out of sight, out of mind.", "Dopamine Detox", "RARE", 2),
  q(56, "No YouTube for 2 hours", "Resist the autoplay.", "Dopamine Detox", "EPIC", 3),
  q(57, "No TikTok for 2 hours", "Break the scroll cycle.", "Dopamine Detox", "EPIC", 3),
  q(58, "No Instagram for 2 hours", "Step away from the feed.", "Dopamine Detox", "EPIC", 3),
  q(59, "Read instead of scrolling", "Trade the feed for a book.", "Dopamine Detox", "RARE", 2),
  q(60, "Spend one hour screen-free", "A full hour, no screens.", "Dopamine Detox", "LEGENDARY", 4),

  // Learning (61-70)
  q(61, "Learn a new word", "Expand your vocabulary.", "Learning", "COMMON", 1),
  q(62, "Watch an educational video", "Feed your curiosity.", "Learning", "COMMON", 2),
  q(63, "Read an article", "Learn something new today.", "Learning", "COMMON", 1),
  q(64, "Solve a coding challenge", "Sharpen your problem solving.", "Learning", "EPIC", 4),
  q(65, "Learn a keyboard shortcut", "Work a little faster.", "Learning", "COMMON", 1),
  q(66, "Practice a language", "Say something in a new tongue.", "Learning", "RARE", 3),
  q(67, "Review your notes", "Reinforce what you've learned.", "Learning", "COMMON", 2),
  q(68, "Learn a new concept", "Grasp something unfamiliar.", "Learning", "RARE", 3),
  q(69, "Study for 30 minutes", "A solid focused session.", "Learning", "EPIC", 4),
  q(70, "Teach someone something", "Knowledge shared is knowledge doubled.", "Learning", "LEGENDARY", 4),

  // Home (71-80)
  q(71, "Wash dishes", "Leave the sink sparkling.", "Home", "COMMON", 1),
  q(72, "Make your bed", "Start the day with a small win.", "Home", "COMMON", 1),
  q(73, "Vacuum one room", "Banish the dust.", "Home", "RARE", 2),
  q(74, "Organize a drawer", "Bring order to chaos.", "Home", "RARE", 2),
  q(75, "Clean your workspace", "A tidy space to create.", "Home", "RARE", 2),
  q(76, "Take out the trash", "A simple but satisfying chore.", "Home", "COMMON", 1),
  q(77, "Fold clothes", "Conquer the laundry pile.", "Home", "COMMON", 2),
  q(78, "Clean a mirror", "See yourself clearly.", "Home", "COMMON", 1),
  q(79, "Wipe surfaces", "Freshen up your space.", "Home", "COMMON", 1),
  q(80, "Tidy your room", "Reset your sanctuary.", "Home", "RARE", 3),

  // Creativity (81-90)
  q(81, "Draw for 10 minutes", "Let your pencil wander.", "Creativity", "RARE", 2),
  q(82, "Write a short story", "Spin a tale, any tale.", "Creativity", "EPIC", 4),
  q(83, "Brainstorm 10 ideas", "Quantity breeds quality.", "Creativity", "RARE", 2),
  q(84, "Take a creative photo", "Frame the world your way.", "Creativity", "RARE", 2),
  q(85, "Design something", "Make something beautiful.", "Creativity", "EPIC", 3),
  q(86, "Sketch an object", "Draw what you see.", "Creativity", "COMMON", 1),
  q(87, "Create a mood board", "Collect your inspiration.", "Creativity", "RARE", 3),
  q(88, "Write in a journal", "Free-write whatever comes.", "Creativity", "COMMON", 1),
  q(89, "Invent a product idea", "Dream up the next big thing.", "Creativity", "LEGENDARY", 5),
  q(90, "Create a logo concept", "Design a mark for an idea.", "Creativity", "EPIC", 4),

  // Finance (91-100)
  q(91, "Track today's expenses", "Know where your money goes.", "Finance", "COMMON", 1),
  q(92, "Review subscriptions", "Cancel what you don't use.", "Finance", "RARE", 2),
  q(93, "Save $5", "Small savings add up.", "Finance", "COMMON", 1),
  q(94, "Update budget", "Keep your plan current.", "Finance", "RARE", 2),
  q(95, "Review bank account", "Check in on your finances.", "Finance", "COMMON", 1),
  q(96, "Compare prices", "Find the better deal.", "Finance", "COMMON", 2),
  q(97, "Plan a financial goal", "Set a target worth saving for.", "Finance", "EPIC", 3),
  q(98, "Watch a finance video", "Level up your money knowledge.", "Finance", "COMMON", 2),
  q(99, "Read about investing", "Plant seeds for the future.", "Finance", "RARE", 3),
  q(100, "Calculate monthly expenses", "Know your true cost of living.", "Finance", "EPIC", 3),
]

export const CATEGORIES: Category[] = [
  "Fitness",
  "Productivity",
  "Social",
  "Mindfulness",
  "Adventure",
  "Dopamine Detox",
  "Learning",
  "Home",
  "Creativity",
  "Finance",
]

export const MODE_TO_CATEGORY: Record<string, Category | null> = {
  ALL: null,
  FITNESS: "Fitness",
  PRODUCTIVITY: "Productivity",
  SOCIAL: "Social",
  MINDFULNESS: "Mindfulness",
  ADVENTURE: "Adventure",
  DETOX: "Dopamine Detox",
  LEARNING: "Learning",
  HOME: "Home",
  CREATIVITY: "Creativity",
  FINANCE: "Finance",
}
