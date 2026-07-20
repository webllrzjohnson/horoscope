export type TarotSeedCard = {
  slug: string;
  name: string;
  number: number;
  arcana: "major";
  romanNumeral: string;
  element: string;
  keywordsUpright: string;
  keywordsReversed: string;
  uprightGeneral: string;
  reversedGeneral: string;
  uprightLove: string;
  reversedLove: string;
  uprightCareer: string;
  reversedCareer: string;
  uprightAdvice: string;
  reversedAdvice: string;
  symbolism: string;
};

/**
 * Major Arcana meanings distilled from traditional Rider–Waite–Smith
 * interpretations (Labyrinthos / Biddy Tarot / classic RWS teaching sources).
 * Paraphrased for this product — not copied verbatim.
 */
export const MAJOR_ARCANA: TarotSeedCard[] = [
  {
    slug: "the-fool",
    name: "The Fool",
    number: 0,
    arcana: "major",
    romanNumeral: "0",
    element: "Air",
    keywordsUpright: "new beginnings, innocence, spontaneity, leap of faith",
    keywordsReversed: "recklessness, naivety, hesitation, poor timing",
    uprightGeneral:
      "A fresh chapter opens. The Fool upright invites a leap of faith — trust the unknown, travel light, and stay curious. Potential is high when you stop over-planning and start living the first step.",
    reversedGeneral:
      "Caution: impulse without awareness. The Fool reversed can mean recklessness, being taken advantage of, or freezing at the cliff edge. Pause, check your footing, then choose the leap deliberately.",
    uprightLove:
      "New romance, playful reconnection, or a relationship that needs more adventure and less script. Lead with openness rather than guarantees.",
    reversedLove:
      "Immaturity, mixed signals, or jumping in / out without care. Slow down before committing — or before walking away on a whim.",
    uprightCareer:
      "A new path, side project, or bold pitch. Entrepreneurial energy favors beginners willing to learn in public.",
    reversedCareer:
      "Wasted chances, fear of failure, or chaotic starts without a plan. Stabilize before you leap.",
    uprightAdvice:
      "Say yes to the honest next step. Pack curiosity, leave the baggage.",
    reversedAdvice:
      "Do not confuse courage with carelessness. Look twice, then jump.",
    symbolism:
      "The cliff, the white rose, the small dog, and the pack: innocence meeting experience, guided by instinct and a light load.",
  },
  {
    slug: "the-magician",
    name: "The Magician",
    number: 1,
    arcana: "major",
    romanNumeral: "I",
    element: "Air / Mercury",
    keywordsUpright: "manifestation, skill, willpower, focused action",
    keywordsReversed: "manipulation, scattered energy, unused talent",
    uprightGeneral:
      "You already have the tools. The Magician upright is directed will — align thought, word, and action, and make something real. Resourcefulness beats waiting for perfect conditions.",
    reversedGeneral:
      "Talent misused or ignored. The Magician reversed warns of trickery, half-plans, or performing competence without substance. Reclaim integrity and focus.",
    uprightLove:
      "Magnetic attraction, clear communication, and chemistry you can shape on purpose. Show up as your capable self.",
    reversedLove:
      "Hidden motives, charm without honesty, or talking past each other. Ask what is real versus what is performance.",
    uprightCareer:
      "Strong launch energy: pitch, create, lead. Innovation and craftsmanship are favored.",
    reversedCareer:
      "Smoke and mirrors, poor planning, or someone selling more than they can deliver — including you.",
    uprightAdvice:
      "Use what is already on the table. Focus is your wand.",
    reversedAdvice:
      "Stop spinning. One clear intention beats ten clever tricks.",
    symbolism:
      "The infinity sign, the four suit tools on the table, one arm to sky and one to earth: as above, so below — channel, don’t hoard.",
  },
  {
    slug: "the-high-priestess",
    name: "The High Priestess",
    number: 2,
    arcana: "major",
    romanNumeral: "II",
    element: "Water / Moon",
    keywordsUpright: "intuition, mystery, inner voice, sacred pause",
    keywordsReversed: "secrets, blocked intuition, silence ignored",
    uprightGeneral:
      "Listen inward. The High Priestess upright favors patience, dreams, research, and knowing what is not yet speakable. Truth surfaces when you stop forcing answers.",
    reversedGeneral:
      "Disconnected from gut sense — noise, denial, or secrets poisoning the field. Withdraw from distraction and recover silence.",
    uprightLove:
      "Deep, quiet bonds; psychic chemistry; attraction that needs time and privacy to bloom.",
    reversedLove:
      "Emotional distance, withheld truth, or sensing something off and ignoring it.",
    uprightCareer:
      "Study, strategy behind the scenes, and trusting timing over loud self-promotion.",
    reversedCareer:
      "Hidden agendas, lack of transparency, or decisions made without listening to the data — or yourself.",
    uprightAdvice:
      "Protect the quiet. Journal, wait, and let the next knowing arrive.",
    reversedAdvice:
      "Name what you already know. Secrets lose power in honest light.",
    symbolism:
      "The veil, pillars of Boaz and Jachin, the moon crown, the scroll: threshold knowledge, duality, and what is kept until you are ready.",
  },
  {
    slug: "the-empress",
    name: "The Empress",
    number: 3,
    arcana: "major",
    romanNumeral: "III",
    element: "Earth / Venus",
    keywordsUpright: "abundance, nurture, creativity, embodiment",
    keywordsReversed: "depletion, smothering, creative block",
    uprightGeneral:
      "Growth through care. The Empress upright is fertile ground — art, body, home, and projects that need warmth more than force. Receive as well as give.",
    reversedGeneral:
      "Nurture turned sticky or absent. Burnout, dependence, or creativity starved by neglect. Restore boundaries and self-care.",
    uprightLove:
      "Affection, sensuality, and relationships that feel like sanctuary. Love as tending, not testing.",
    reversedLove:
      "Over-giving, clinginess, or emptiness where warmth should be. Rebalance the give/receive loop.",
    uprightCareer:
      "Creative harvest, supportive teams, and work that thrives when people feel valued.",
    reversedCareer:
      "Stagnation, passion drained dry, or environments that demand output without replenishment.",
    uprightAdvice:
      "Feed what you want to grow — including yourself.",
    reversedAdvice:
      "Stop pouring from an empty cup. Rest is productive.",
    symbolism:
      "Wheat, waterfall, Venus glyph, lush garden: earthly beauty, fertility, and the body as sacred ground.",
  },
  {
    slug: "the-emperor",
    name: "The Emperor",
    number: 4,
    arcana: "major",
    romanNumeral: "IV",
    element: "Fire / Aries",
    keywordsUpright: "structure, authority, stability, leadership",
    keywordsReversed: "rigidity, control issues, weak boundaries",
    uprightGeneral:
      "Build the frame. The Emperor upright favors order, strategy, and adult responsibility. Create systems that protect what matters.",
    reversedGeneral:
      "Power without wisdom — tyranny, coldness, or refusal to lead. Soften the grip or step into rightful authority.",
    uprightLove:
      "Dependable partnership, clear roles, and safety through consistency.",
    reversedLove:
      "Domineering dynamics, emotional freeze, or chaos from missing structure.",
    uprightCareer:
      "Leadership, architecture of projects, and wins through discipline.",
    reversedCareer:
      "Micromanagement, bureaucracy, or rebellion against necessary rules.",
    uprightAdvice:
      "Decide. Document. Defend the perimeter.",
    reversedAdvice:
      "Lead with backbone and heart — not ego.",
    symbolism:
      "Throne, ram heads, armor, orb and scepter: worldly authority grounded in will and order.",
  },
  {
    slug: "the-hierophant",
    name: "The Hierophant",
    number: 5,
    arcana: "major",
    romanNumeral: "V",
    element: "Earth / Taurus",
    keywordsUpright: "tradition, mentorship, shared values, sacred study",
    keywordsReversed: "dogma, rebellion, unconventional path",
    uprightGeneral:
      "Learn the lineage. The Hierophant upright points to teachers, vows, institutions, and wisdom tested by time. Belonging through shared practice.",
    reversedGeneral:
      "Question the creed. Break free from hollow rules or corrupt authority. Craft a belief system that is actually yours.",
    uprightLove:
      "Commitment, shared ethics, possibly marriage or relationship counseling from trusted elders.",
    reversedLove:
      "Unconventional unions, resistance to labels, or conflict with family/tradition expectations.",
    uprightCareer:
      "Formal training, mentorship, certifications, and thriving inside established systems.",
    reversedCareer:
      "Friction with hierarchy, outdated policies, or a call to build outside the institution.",
    uprightAdvice:
      "Find a worthy teacher. Honor the ritual that works.",
    reversedAdvice:
      "Keep the wisdom; drop the cage.",
    symbolism:
      "Twin pillars, papal keys, raised hand blessing, kneeling acolytes: initiation into communal sacred knowledge.",
  },
  {
    slug: "the-lovers",
    name: "The Lovers",
    number: 6,
    arcana: "major",
    romanNumeral: "VI",
    element: "Air / Gemini",
    keywordsUpright: "union, choice, values alignment, harmony",
    keywordsReversed: "discord, temptation, misaligned choice",
    uprightGeneral:
      "A heart-and-values decision. The Lovers upright is partnership and integrity — choose what matches who you are, not what merely dazzles.",
    reversedGeneral:
      "Split desires, one-sided bonds, or choosing from fear. Realign before you bind.",
    uprightLove:
      "Mutual attraction with meaning. Honest connection and choosing each other consciously.",
    reversedLove:
      "Betrayal risk, imbalance, or staying for the wrong reasons.",
    uprightCareer:
      "Key collaborations, ethical choices, and partnerships that multiply skill.",
    reversedCareer:
      "Misaligned teammates, unclear deals, or values clash at work.",
    uprightAdvice:
      "Choose the option you can live with at 3 a.m.",
    reversedAdvice:
      "If it costs your integrity, it is too expensive.",
    symbolism:
      "Adam and Eve, the angel, the tree and serpent: sacred choice, desire, and moral clarity.",
  },
  {
    slug: "the-chariot",
    name: "The Chariot",
    number: 7,
    arcana: "major",
    romanNumeral: "VII",
    element: "Water / Cancer",
    keywordsUpright: "willpower, victory, direction, disciplined drive",
    keywordsReversed: "loss of control, aggression, stalled progress",
    uprightGeneral:
      "Harness opposing forces and move. The Chariot upright is focused triumph — ambition steered by self-mastery.",
    reversedGeneral:
      "Pulled in two directions, force without aim, or stalled momentum. Regain the reins before pushing harder.",
    uprightLove:
      "Relationship progresses through shared goals and intentional effort.",
    reversedLove:
      "Power struggles, competing agendas, or motion without intimacy.",
    uprightCareer:
      "Competition won, promotions earned, campaigns executed with discipline.",
    reversedCareer:
      "Scattered priorities, burnout sprinting, or projects derailed by ego.",
    uprightAdvice:
      "Pick a direction. Hold the line. Drive.",
    reversedAdvice:
      "Stop wrestling the sphinxes. Align first, then accelerate.",
    symbolism:
      "Armored rider, black and white sphinxes, starry canopy: mastery of duality through will.",
  },
  {
    slug: "strength",
    name: "Strength",
    number: 8,
    arcana: "major",
    romanNumeral: "VIII",
    element: "Fire / Leo",
    keywordsUpright: "courage, compassion, soft power, resilience",
    keywordsReversed: "self-doubt, forcefulness, raw insecurity",
    uprightGeneral:
      "Gentle power wins. Strength upright tames the lion with patience and heart — bravery without brutality.",
    reversedGeneral:
      "Fear runs the show, or force replaces trust. Rebuild confidence; stop bullying the situation (or yourself).",
    uprightLove:
      "Steady devotion, emotional maturity, and passion held with care.",
    reversedLove:
      "Jealousy, insecurity, or control dressed up as care.",
    uprightCareer:
      "Resilience under pressure; influence through calm competence.",
    reversedCareer:
      "Imposter spiral, burnout, or brittle leadership.",
    uprightAdvice:
      "Be brave and kind in the same breath.",
    reversedAdvice:
      "Your soft power is not weakness — use it.",
    symbolism:
      "Woman and lion, infinity above her head: instinct befriended, not crushed.",
  },
  {
    slug: "the-hermit",
    name: "The Hermit",
    number: 9,
    arcana: "major",
    romanNumeral: "IX",
    element: "Earth / Virgo",
    keywordsUpright: "solitude, inner guidance, contemplation, wisdom",
    keywordsReversed: "isolation, withdrawal, lost guidance",
    uprightGeneral:
      "Retreat to hear yourself. The Hermit upright is sacred solitude, study, and lantern-light truth.",
    reversedGeneral:
      "Loneliness mistaken for wisdom, or avoiding the world too long. Re-enter with what you learned.",
    uprightLove:
      "A reflective pause, deep one-to-one honesty, or needing space to love better.",
    reversedLove:
      "Emotional shutdown, ghosting-as-habit, or refusing support.",
    uprightCareer:
      "Independent research, mentoring quietly, craft refined alone.",
    reversedCareer:
      "Siloed work that hurts the team, or refusing collaboration out of pride.",
    uprightAdvice:
      "Turn down the volume of the crowd.",
    reversedAdvice:
      "Bring the lantern back to the village.",
    symbolism:
      "Cloaked figure, staff, hexagonal lantern: guidance earned in silence.",
  },
  {
    slug: "wheel-of-fortune",
    name: "Wheel of Fortune",
    number: 10,
    arcana: "major",
    romanNumeral: "X",
    element: "Fire / Jupiter",
    keywordsUpright: "cycles, destiny, turning point, luck",
    keywordsReversed: "resistance, setbacks, repeating loops",
    uprightGeneral:
      "The wheel turns. Upright, fortune shifts — often upward — reminding you that change is the law. Adapt and ride.",
    reversedGeneral:
      "Stuck in a loop or fighting the turn. Learn the lesson so the cycle can graduate.",
    uprightLove:
      "Karmic meetings, fated timing, sudden relationship weather changes.",
    reversedLove:
      "On-again patterns, bad timing, or clinging when the season has changed.",
    uprightCareer:
      "Lucky breaks, pivots, and momentum from larger market cycles.",
    reversedCareer:
      "Delays, missed windows, or refusing necessary change.",
    uprightAdvice:
      "Say yes to the turn. Stay flexible.",
    reversedAdvice:
      "If this scene feels familiar, change your lines.",
    symbolism:
      "Rotating wheel, sphinx, snake, Anubis, Hebrew letters: fate, cycles, and the fixed point of awareness.",
  },
  {
    slug: "justice",
    name: "Justice",
    number: 11,
    arcana: "major",
    romanNumeral: "XI",
    element: "Air / Libra",
    keywordsUpright: "truth, fairness, cause and effect, accountability",
    keywordsReversed: "bias, dishonesty, avoidance of responsibility",
    uprightGeneral:
      "What is true will weigh. Justice upright asks for honesty, contracts, and owning consequences with clear eyes.",
    reversedGeneral:
      "Unfairness, denial, or skewed stories. Restore balance by telling the whole truth — especially to yourself.",
    uprightLove:
      "Fair partnership, honest talks, agreements that honor both people.",
    reversedLove:
      "Scorekeeping, lies by omission, or imbalance of effort.",
    uprightCareer:
      "Legal clarity, ethical decisions, promotions based on merit.",
    reversedCareer:
      "Office politics, shady deals, or blame games.",
    uprightAdvice:
      "Act as if the scale can see you — because it can.",
    reversedAdvice:
      "Clean the ledger. Apologize where needed.",
    symbolism:
      "Sword and scales, upright posture, pillars: discernment that cuts and balances.",
  },
  {
    slug: "the-hanged-man",
    name: "The Hanged Man",
    number: 12,
    arcana: "major",
    romanNumeral: "XII",
    element: "Water / Neptune",
    keywordsUpright: "surrender, new perspective, pause, sacrifice",
    keywordsReversed: "stall, martyrdom, resistance to release",
    uprightGeneral:
      "Hang upside down on purpose. The Hanged Man upright is voluntary pause — see the problem from another angle, release control, gain wisdom.",
    reversedGeneral:
      "Stuck limbo, pointless sacrifice, or refusing the new view. Decide, release, or move.",
    uprightLove:
      "A necessary pause, seeing your partner differently, or sacrificing ego for understanding.",
    reversedLove:
      "Stalemate, playing martyr, or waiting forever for them to change.",
    uprightCareer:
      "Strategic delay, rethink the approach, unconventional solutions.",
    reversedCareer:
      "Procrastination dressed as patience; fear of the next move.",
    uprightAdvice:
      "Stop pushing. Let gravity teach.",
    reversedAdvice:
      "Suspension is not a lifestyle. Choose an ending or a beginning.",
    symbolism:
      "Figure hanging from a living tree by one foot, serene face, halo: enlightenment through surrender.",
  },
  {
    slug: "death",
    name: "Death",
    number: 13,
    arcana: "major",
    romanNumeral: "XIII",
    element: "Water / Scorpio",
    keywordsUpright: "endings, transformation, rebirth, clearing",
    keywordsReversed: "resistance to change, stagnation, clinging",
    uprightGeneral:
      "Something ends so something else can live. Death upright is metamorphosis — rarely literal death, almost always necessary closure.",
    reversedGeneral:
      "Refusing the funeral of what is finished. Prolonged pain from clinging. Let it compost.",
    uprightLove:
      "Relationship rebirth, or a clean ending that frees both people.",
    reversedLove:
      "Zombie bonds — over but not buried.",
    uprightCareer:
      "Role changes, industry shifts, pruning dead projects.",
    reversedCareer:
      "Staying in a dead-end for fear of the unknown.",
    uprightAdvice:
      "Honor the ending. Plant in the cleared ground.",
    reversedAdvice:
      "Grief is allowed. Denial is expensive.",
    symbolism:
      "Skeleton knight, fallen figures, rising sun, white rose: inevitable change that still leads toward dawn.",
  },
  {
    slug: "temperance",
    name: "Temperance",
    number: 14,
    arcana: "major",
    romanNumeral: "XIV",
    element: "Fire / Sagittarius",
    keywordsUpright: "balance, moderation, healing, alchemy",
    keywordsReversed: "excess, impatience, imbalance",
    uprightGeneral:
      "Blend the extremes. Temperance upright is patient alchemy — healing, middle path, mixing opposites into something wiser.",
    reversedGeneral:
      "Too much or too little. Friction from forced timelines. Restore flow and proportion.",
    uprightLove:
      "Compromise, gentle timing, relationships that heal rather than spike.",
    reversedLove:
      "Hot-and-cold chaos, incompatible tempos, missing middle ground.",
    uprightCareer:
      "Diplomacy, sustainable pace, integrating skill sets.",
    reversedCareer:
      "Overwork, poor collaboration, all-or-nothing thinking.",
    uprightAdvice:
      "Measure twice. Mix slowly. Trust the brew.",
    reversedAdvice:
      "If everything is urgent, nothing is. Rebalance.",
    symbolism:
      "Angel pouring water between cups, one foot on land and one in water: integration of spirit and matter.",
  },
  {
    slug: "the-devil",
    name: "The Devil",
    number: 15,
    arcana: "major",
    romanNumeral: "XV",
    element: "Earth / Capricorn",
    keywordsUpright: "attachment, temptation, shadow, materialism",
    keywordsReversed: "liberation, breaking chains, reclaiming power",
    uprightGeneral:
      "Name the chain. The Devil upright shows addiction, obsession, or golden handcuffs — often self-locked. Awareness is the first key.",
    reversedGeneral:
      "Breaking free, or finally seeing the trap. Liberation work; don’t romanticize the cage.",
    uprightLove:
      "Chemistry mixed with control, jealousy, or unhealthy dependence.",
    reversedLove:
      "Leaving toxicity, reclaiming desire without possession.",
    uprightCareer:
      "Money traps, toxic culture, over-identification with status.",
    reversedCareer:
      "Exit strategies, renegotiating terms, refusing exploitation.",
    uprightAdvice:
      "Ask who holds the lock — then notice it is often you.",
    reversedAdvice:
      "Walk out while the door is open.",
    symbolism:
      "Horned figure, inverted pentagram, loosely chained humans: bondage that can be slipped if you choose.",
  },
  {
    slug: "the-tower",
    name: "The Tower",
    number: 16,
    arcana: "major",
    romanNumeral: "XVI",
    element: "Fire / Mars",
    keywordsUpright: "upheaval, revelation, sudden change, collapse of falsehood",
    keywordsReversed: "delayed disaster, fear of change, softer breakdown",
    uprightGeneral:
      "Lightning clears the lie. The Tower upright is sudden truth — structures fall so foundations can be honest.",
    reversedGeneral:
      "Avoiding the crash, internal chaos, or a smaller quake meant to prevent a larger one. Cooperate with necessary change.",
    uprightLove:
      "Shocking clarity, breakups, or revelations that rewrite the story.",
    reversedLove:
      "Denial of cracks; quiet dread of an ending already underway.",
    uprightCareer:
      "Sudden restructures, failed plans that reveal truth, forced pivots.",
    reversedCareer:
      "Near-misses, delayed reckonings, or clinging to a failing model.",
    uprightAdvice:
      "When the tower falls, save the people — not the wallpaper.",
    reversedAdvice:
      "Renovate before lightning does it for you.",
    symbolism:
      "Struck tower, falling figures, crown blasted off: ego and false security meeting revelation.",
  },
  {
    slug: "the-star",
    name: "The Star",
    number: 17,
    arcana: "major",
    romanNumeral: "XVII",
    element: "Air / Aquarius",
    keywordsUpright: "hope, healing, inspiration, renewal",
    keywordsReversed: "discouragement, lost faith, self-doubt",
    uprightGeneral:
      "After the storm, starlight. The Star upright is quiet hope, authenticity, and healing that doesn’t need to shout.",
    reversedGeneral:
      "Faith dimmed. Discouragement or performing hope you don’t feel. Return to small rituals that restore trust.",
    uprightLove:
      "Gentle honesty, spiritual intimacy, renewed trust.",
    reversedLove:
      "Disappointment, distance, or fear of being seen.",
    uprightCareer:
      "Inspired work, recognition for authentic contribution, creative recovery.",
    reversedCareer:
      "Feeling unseen, uninspired, or disconnected from purpose.",
    uprightAdvice:
      "Pour water on the land and into the pool — give and replenish.",
    reversedAdvice:
      "Hope is a practice. Start with one star, not the whole sky.",
    symbolism:
      "Naked figure, two jugs, eight-pointed star, bird on tree: vulnerability, healing, cosmic guidance.",
  },
  {
    slug: "the-moon",
    name: "The Moon",
    number: 18,
    arcana: "major",
    romanNumeral: "XVIII",
    element: "Water / Pisces",
    keywordsUpright: "illusion, intuition, dreams, uncertainty",
    keywordsReversed: "clarity returning, fear, confusion clearing",
    uprightGeneral:
      "Fog on the path. The Moon upright asks you to trust intuition while verifying reality — dreams speak, but not everything is as it seems.",
    reversedGeneral:
      "Mist lifting, or fear amplifying shadows. Seek clarity; don’t feed paranoia.",
    uprightLove:
      "Projection, secret feelings, intense moods — slow down and name what’s real.",
    reversedLove:
      "Truths emerge; misunderstandings can resolve if faced.",
    uprightCareer:
      "Unclear goals, office undercurrents, decisions pending better data.",
    reversedCareer:
      "Secrets surface; confusion eases with facts.",
    uprightAdvice:
      "Walk by moonlight carefully. Listen, then test.",
    reversedAdvice:
      "Turn on a lamp. Fear hates evidence.",
    symbolism:
      "Moon, twin towers, dog and wolf, crayfish from the pool: subconscious rising into the path between instinct and civilization.",
  },
  {
    slug: "the-sun",
    name: "The Sun",
    number: 19,
    arcana: "major",
    romanNumeral: "XIX",
    element: "Fire / Sun",
    keywordsUpright: "joy, success, vitality, clarity",
    keywordsReversed: "temporary clouds, delayed joy, muted confidence",
    uprightGeneral:
      "Warmth and visibility. The Sun upright is success, play, health, and truth that feels like daylight.",
    reversedGeneral:
      "Joy postponed or confidence dimmed — not cancelled. Clear the clouds; celebrate smaller wins.",
    uprightLove:
      "Happy, open-hearted connection; celebration of partnership.",
    reversedLove:
      "Insecurity or unrealistic sunshine expectations; return to simple warmth.",
    uprightCareer:
      "Recognition, completion, projects that land well.",
    reversedCareer:
      "Delays in credit or motivation dips — keep going.",
    uprightAdvice:
      "Stand in the light. Share the win.",
    reversedAdvice:
      "You don’t need perfect weather to be glad.",
    symbolism:
      "Child on a white horse, sunflowers, radiant sun: innocence restored after the journey, vitality without armor.",
  },
  {
    slug: "judgement",
    name: "Judgement",
    number: 20,
    arcana: "major",
    romanNumeral: "XX",
    element: "Fire / Pluto",
    keywordsUpright: "awakening, reckoning, renewal, calling",
    keywordsReversed: "self-doubt, refusal to rise, harsh inner critic",
    uprightGeneral:
      "The call sounds. Judgement upright is awakening — review the past, forgive what you can, answer a higher purpose.",
    reversedGeneral:
      "Ignoring the call, drowning in guilt, or fearing evaluation. Rise anyway.",
    uprightLove:
      "Reconciliation, honest reckoning, relationships renewed at a deeper level.",
    reversedLove:
      "Avoiding hard talks or clinging to old grievances.",
    uprightCareer:
      "Life-path decisions, vocational calling, major reviews that free you.",
    reversedCareer:
      "Missed opportunities from self-judgment or indecision.",
    uprightAdvice:
      "Answer the horn. Become who the past was training.",
    reversedAdvice:
      "You are not only your worst chapter.",
    symbolism:
      "Angel with trumpet, rising figures, ocean and mountains: resurrection of purpose, collective and personal awakening.",
  },
  {
    slug: "the-world",
    name: "The World",
    number: 21,
    arcana: "major",
    romanNumeral: "XXI",
    element: "Earth / Saturn",
    keywordsUpright: "completion, wholeness, fulfillment, integration",
    keywordsReversed: "loose ends, delay, almost-there",
    uprightGeneral:
      "The journey closes and opens. The World upright is completion, mastery, and belonging to a larger whole — celebrate, then begin again wiser.",
    reversedGeneral:
      "Nearly finished but unfinished. Close the loop; don’t abandon the last mile.",
    uprightLove:
      "Fulfilled partnership, travel together, or a cycle of relating completed with grace.",
    reversedLove:
      "Missing closure, unfinished conversations, or commitment almost spoken.",
    uprightCareer:
      "Graduation, successful launch, recognition of a completed arc.",
    reversedCareer:
      "Projects 90% done; paperwork or polish still required.",
    uprightAdvice:
      "Take the bow. Then pack for the next Fool’s step.",
    reversedAdvice:
      "Tie the last knot. Wholeness hates unfinished business.",
    symbolism:
      "Dancing figure in a wreath, four living creatures in corners: integrated self within the cosmos, completion of the Fool’s Journey.",
  },
];
