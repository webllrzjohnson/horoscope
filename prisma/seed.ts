import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { createLocalOfflineReadings } from "../src/lib/readings/local";
import { MAJOR_ARCANA } from "../src/lib/tarot/deck-data";
import { getWindowForInstant } from "../src/lib/windows";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const CRYSTAL_BALL = [
  "The cosmos has scheduled a minor plot twist for Thursday. Bring snacks.",
  "A mysterious opportunity approaches wearing someone else's confidence.",
  "Your aura just filed for a soft reboot. Do not interrupt it with group chats.",
  "The universe recommends you stop explaining yourself to people who collect receipts for fun.",
  "A forgotten password will unlock more than an account. Possibly a snack drawer.",
  "Alignment detected: your left sock and your ambition are finally in sync.",
  "Beware the compliment that arrives with an invoice attached.",
  "The stars whisper: reorganize one drawer and pretend it was destiny.",
  "A pigeon will judge you today. Take it personally in a productive way.",
  "Important cosmic memo: your next good idea is hiding behind a nap.",
  "Someone will text you 'circling back.' Block the vibe, not necessarily the person.",
  "The crystal confirms: your future contains both greatness and an overdue library book.",
  "A door will open. It may be a metaphorical door. It may be the fridge.",
  "Destiny requests you stop romanticizing chaos you personally scheduled.",
  "The veil is thin today. So is your patience. Budget both carefully.",
  "An ancient force wants you to drink water and mind your business.",
  "Your chart suggests a dramatic entrance into a mundane errand.",
  "The planets formed a committee. The minutes say: 'Main character energy, side quest discipline.'",
  "A secret admirer exists. It might be your future self after you do the dishes.",
  "Cosmic alert: the thing you are avoiding has learned parkour.",
  "Fortune favors the bold, and also people who charge their phone overnight.",
  "A prophecy written in crumbs: leave the group chat, keep the dignity.",
  "The crystal ball fogged up from importance. Translation: stretch your neck.",
  "You will encounter a sign. Not zodiac — literal. Read it. Then still almost miss the turn.",
  "Spiritual download incoming: you do not need seventeen tabs of research to send one email.",
  "Urgent celestial bulletin: your overthinking has applied for overtime pay.",
  "The oracle sniffed your vibes. Diagnosis: chronically impressive, temporarily dehydrated.",
  "A plot armor shipment is delayed. Use common sense until it arrives.",
  "Today's sacred assignment: make one decision without forming a committee in your head.",
  "The ancestors are cheering. Mostly because you finally opened the mail.",
  "Cosmic HR says your excuses have exceeded the monthly allotment.",
  "A soft launch of courage is approved. Hard launch optional after lunch.",
  "The universe CC'd you on an email titled 'Stop Performing Exhaustion.'",
  "Mysterious forces demand you put the phone face-down for eleven minutes. Exactly eleven.",
  "Your destiny called. It went to voicemail because you were rearranging apps again.",
  "Prophecy grade: B+. Notes: strong vibes, weak follow-through, excellent cheekbones energy.",
  "The crystal sees traffic in your near future — emotional, automotive, or inbox. All valid.",
  "An opportunity will knock. Verify it is not a scam first. The cosmos respects due diligence.",
  "Sacred reminder: dramatic sighs do not count as cardio.",
  "The stars filed a noise complaint against your inner monologue.",
  "You will find clarity near water. Sink, shower, or existential tears — dealer's choice.",
  "Official cosmic tip: if it needs a paragraph of justification, it is probably a no.",
  "A tiny miracle is pending: finding matching Tupperware lids.",
  "The veil between you and a good mood is thin. Walk through it like you pay rent there.",
  "Horizon scan complete: fewer villains than you imagined, more errands than you budgeted.",
  "The crystal ball rolled its eyes so hard it got dizzy. Translation: you already know the answer.",
  "A soft prophecy: stop negotiating with your alarm clock like it owes you rent.",
  "Cosmic forecast: 40% chance of brilliance, 60% chance of 'where's my other shoe.'",
  "The stars recommend a plot twist where you actually reply to that text.",
  "Oracle update: your main character arc includes laundry. Sorry.",
  "A celestial sticky note appeared: 'Do the hard thing before the easy spiral.'",
  "The universe unfollowed your excuses. Follow through instead.",
  "Mysterious forces approve of snacks. Mysterious forces deny a third nap.",
  "Your future self left a tip: less explaining, more exiting the group chat.",
  "The crystal sees vibes. The vibes are mid. Upgrade available after one brave decision.",
  "Breaking: the stars hate you specifically, but in a supportive way.",
  "You will receive a sign today. It will be passive-aggressive and from your own fridge.",
  "Cosmic hot take: your 'gut feeling' is just caffeine with PR skills.",
  "A stranger will compliment you. Do not marry them. Do finish your errand.",
  "The oracle predicts drama — mostly the kind you invent between notifications.",
  "Mercury is fine. Your boundaries are the ones in retrograde.",
  "Today's blessing: nobody asked for your unsolicited life update. Keep it that way.",
  "The crystal fog cleared just enough to say: touch grass, then touch your to-do list.",
  "You are not behind in life. You are ahead in refreshing the same three apps.",
  "Prophecy: you will almost say something wise, then add 'idk though' and ruin it.",
  "The universe left you on read. Interpret that as motivation, not trauma.",
  "Official forecast: main-character entrance, side-character follow-through. Fix the sequel.",
  "A haunted feeling approaches. It's just your unread email count becoming sentient.",
  "Celestial memo: stop treating 'busy' like a personality and more like a scheduling error.",
  "You will find love… of a free sample, briefly, intensely, then move on.",
  "The stars recommend closing the loop on one thing before opening seventeen new ones.",
  "Warning: your intuition is loud today. So is your insecurity. Mute the wrong one.",
  "Cosmic HR approved your PTO from overthinking. Effective immediately. Mandatory.",
  "Someone needs your advice. That someone is you. Awkward, but true.",
  "The crystal sees a plot twist involving leftovers and unexpected self-respect.",
  "You will win an argument in the shower three hours too late. Trophy pending.",
  "Alignment check failed: ambition online, laundry offline. Reconnect peripherals.",
  "Destiny says try again after you stop narrating your life like a rejected podcast.",
  "The veil is thin. Your excuses are thinner. Choose better fabric.",
  "Incoming: a soft yes disguised as fear. Open it carefully. Do not overthink the packaging.",
  "The planets gossiped. Consensus: you're fine, your spiral is unpaid overtime.",
  "Sacred download: nobody is thinking about that thing as much as you are. Bless and delete.",
  "Your chart says 'chaotic neutral with snack tendencies.' Accurate and actionable.",
  "A miracle is nearby: the willingness to be boring for twenty minutes and finish something.",
  "The oracle yawned. Translation: your crisis is valid but recyclable. Sort it.",
  "Today you attract what you fear: accountability with a cute font.",
  "Stars update: your villain origin story is just dehydration and one bad night's sleep.",
  "The crystal refuses to gaslight you. That awkward feeling is growth, not a glitch.",
  "You will almost ghost your responsibilities. Don't. Ghost the group chat instead.",
];

const IDEAL_PARTNER_MALE = [
  "Your ideal partner owns a castle made of recyclable cardboard and interviews houseplants for fun.",
  "She communicates exclusively through interpretive dance and impeccably timed eye rolls.",
  "Expect someone who can parallel park a spaceship but loses arguments with toasters.",
  "Your match runs an underground empire of lost left socks and soft power.",
  "She keeps a dragon as an emotional support animal — unionized, benefits included.",
  "Look for the woman who schedules surprise picnics inside IKEA showrooms after hours.",
  "Your ideal partner speaks three languages, two of which are 'petty' and 'protective.'",
  "She will love you deeply and also rate your grocery lists like Olympic diving.",
  "Find the one who can duel with wit, bake with vengeance, and name every moon of Jupiter incorrectly on purpose.",
  "She collects vintage maps of places that never existed and still somehow gets you home.",
  "Your match has a PhD in dramatic pauses and a certificate in soft landings.",
  "She arrives fashionably late to every timeline except yours.",
  "She runs a side hustle selling bottled vibe checks and somehow makes it romantic.",
  "Your person can roast you lovingly and still pack your favorite snacks for the road trip.",
  "She keeps emergency poetry for arguments and emergency snacks for peace treaties.",
  "Expect a partner who treats your ambitions like a group project she actually wants an A in.",
  "She will fight a goose for you and then ask if you hydrated.",
  "Your match has main-character hair and side-character humility — lethal combo.",
  "She will roast your playlist and still dance to it in the kitchen at 1 a.m.",
  "Expect someone who treats your anxiety like weather: real, temporary, and not your personality.",
  "She keeps a shared calendar titled 'Chaos & Softness' and somehow makes both romantic.",
  "Your ideal partner can parallel-park your ego and still leave room for snacks.",
  "She shows up with soup when you're sick and sarcasm when you're dramatic — perfect balance.",
  "She will leave your ego intact and your excuses in pieces — romantic demolition, ethically sourced.",
  "Look for the woman who can end an argument with kindness and a snack, not a speech.",
  "Your match has a master's degree in side-eye and a fellowship in loyalty.",
  "She texts back without playing games, which will feel illegal at first. Adjust.",
  "Expect someone who calls you out gently and calls you home loudly.",
  "She keeps your secrets better than you keep your plants — which is saying something.",
  "Your ideal partner thinks your weird is the feature, not the bug.",
  "She will love you on days when even you find yourself exhausting. Rare tech.",
  "Find the one who packs snacks like strategy and kisses like a soft yes.",
];

const IDEAL_PARTNER_FEMALE = [
  "Your ideal partner trains racing snails and quotes philosophy during traffic jams.",
  "He communicates in cryptic memes and unexpectedly excellent breakfasts.",
  "Expect someone who can fold fitted sheets into origami swans and emotional availability.",
  "Your match moonlights as a part-time cloud critic and full-time soft landing.",
  "He keeps a conspiracy board about why socks disappear — and he is not wrong.",
  "Look for the man who brings flowers and also a backup charger like a romantic quartermaster.",
  "Your ideal partner can win debates with toddlers and lose gracefully to cats.",
  "He will protect your peace and also steal your fries with diplomatic immunity.",
  "Find the one who builds pillow forts with structural integrity and exit strategies.",
  "He collects rare silences and spends them wisely with you.",
  "Your match has a black belt in listening and a minor in ridiculous adventures.",
  "He shows up early to your future and holds the door open with terrible puns.",
  "He can assemble furniture without rage and still make you laugh mid-instruction booklet.",
  "Your person brings thoughtful chaos: surprise playlists, weird facts, reliable loyalty.",
  "He treats your boundaries like VIP rope — respected, stylish, non-negotiable.",
  "Expect someone who texts back like an adult and plans dates like a slightly unhinged film director.",
  "He will remember your coffee order and forget his own ego on purpose.",
  "Your match owns exactly one dramatic coat and infinite patience for your bit.",
  "He will defend your peace like it's a national park — no littering, no toxic tours.",
  "Expect someone who sends voice notes that are both unhinged and emotionally literate.",
  "He keeps your secrets, your favorite hoodie, and a suspicious number of spare chargers.",
  "Your ideal partner can assemble IKEA and your self-esteem without the leftover screws.",
  "He laughs at your jokes like they're limited drops — rare, valuable, slightly overpriced.",
  "He will remember the story behind your favorite mug and forget every petty scoreboard.",
  "Your match can sit in silence without making it a hostage situation.",
  "Expect someone who plans dates that feel like inside jokes with better lighting.",
  "He treats your ambition like a team sport and your rest like sacred policy.",
  "Look for the man who apologizes in full sentences, not in memes — though memes are allowed after.",
  "He will be ridiculous in public and reliable in private. Correct order.",
  "Your ideal partner has dad-joke energy and adult-communication skills. Lethal pairing.",
  "He keeps a soft spot for your hard days and a hard line against your spiral narratives.",
  "Find the one who can roast the situation without roasting your worth.",
];

const IDEAL_PARTNER_ANY = [
  "Your ideal partner exists in a parallel aisle of the multiverse grocery store. Bring a list.",
  "They will love you in a way that makes spreadsheets cry tears of joy.",
  "Expect a partner who treats loyalty like Wi-Fi: strong, private, and occasionally needing a reboot.",
  "Your match has chaotic good energy and a suspiciously organized spice rack.",
  "They communicate in looks that say both 'I got you' and 'we are absolutely not buying that.'",
  "Find someone whose red flags are mostly just quirky pennants.",
  "Your ideal partner can survive a flat tire, a family dinner, and your music taste.",
  "They will be unrealistic in the best way: too kind, too funny, too ready with snacks.",
  "Look for the person who makes ordinary Tuesdays feel like limited-edition events.",
  "They keep an emergency kit containing band-aids, compliments, and one dramatic cape.",
  "Your person is 40% soft launch, 40% loyalty, 20% unhinged museum dates.",
  "They will argue for your dreams louder than you argue against yourself.",
  "Expect someone who shares fries, shares blame, and never shares your secrets.",
  "Your match has plot-twist timing and sequel-level commitment.",
  "They are allergic to boredom and immune to performative coolness.",
  "Find the one who makes 'want to stay in' sound like a festival lineup.",
  "Your ideal partner treats loyalty like a limited-edition drop — rare, intentional, not for everyone.",
  "They will love you loudly in private and protectively in public.",
  "Expect someone who can turn 'what do you want for dinner' into a sacred ritual, not a hostage negotiation.",
  "Your match has chaos energy with a seatbelt: wild ideas, safe landings.",
  "They keep a soft place for your hard days and a hard boundary for your soft spots.",
  "Your match will make 'I'm home' sound like a festival headline and a safety plan.",
  "They flirt by remembering details and insulting your taste in movies lovingly.",
  "Expect someone who chooses you on boring Tuesdays, not just cinematic Fridays.",
  "They have the emotional range of a prestige drama and the humor of a group chat at 2 a.m.",
  "Your ideal partner doesn't need a plot. They need snacks, honesty, and shared chaos.",
  "They will hold you accountable without holding you hostage. Rare soft skill.",
  "Find the person whose red flags are mostly just weird hobbies and strong opinions about pasta.",
  "They treat your nervous system like a VIP guest — quiet rooms, good lighting, no surprise panels.",
  "Your match can turn 'we need to talk' into a collaborative quest, not a horror trailer.",
];

type EightSeed = { body: string; category: string; leaning: string };

const MAGIC_EIGHT: EightSeed[] = [
  // general yes / no / maybe / roast
  { body: "Yes — annoyingly, inconveniently, cosmically yes.", category: "general", leaning: "yes" },
  { body: "Do it. Future-you is already drafting the thank-you note.", category: "general", leaning: "yes" },
  { body: "Green light, but wear metaphorical sunscreen.", category: "general", leaning: "yes" },
  { body: "Absolutely… if you stop auditioning for the role of Overthinker #1.", category: "general", leaning: "yes" },
  { body: "Signs point to yes, and also to charging your phone.", category: "general", leaning: "yes" },
  { body: "Signs point to yes… but I've been wrong before. Still: yes.", category: "general", leaning: "yes" },
  { body: "As I see it, yes — and I also see you stalling. Move.", category: "general", leaning: "yes" },
  { body: "It is certain… that hesitation is the real villain here.", category: "general", leaning: "yes" },
  { body: "You may rely on it. Also rely on a snack afterward.", category: "general", leaning: "yes" },
  { body: "No. Not today, not with that energy, not like that.", category: "general", leaning: "no" },
  { body: "My sources say no — and my sources are petty but accurate.", category: "general", leaning: "no" },
  { body: "Outlook not so good. Outlook needs glasses and a reality check.", category: "general", leaning: "no" },
  { body: "Very doubtful. Cute try, though.", category: "general", leaning: "no" },
  { body: "Don't count on it. Count on a nap instead.", category: "general", leaning: "no" },
  { body: "Outlook not so good… brace yourself, and maybe your dignity.", category: "general", leaning: "no" },
  { body: "Very doubtful… but hey, anything's possible (just unlikely).", category: "general", leaning: "no" },
  { body: "Don't count on it unless you're incredibly lucky — which, today, you're not.", category: "general", leaning: "no" },
  { body: "My reply is no. My vibe is also no. Unanimous board meeting.", category: "general", leaning: "no" },
  { body: "Reply hazy — your question is doing parkour.", category: "general", leaning: "maybe" },
  { body: "Ask again after you drink water like a responsible adult.", category: "general", leaning: "maybe" },
  { body: "Concentrate and ask again — preferably without the desperation seasoning.", category: "general", leaning: "maybe" },
  { body: "The ball is buffering. Try a clearer question or a clearer vibe.", category: "general", leaning: "maybe" },
  { body: "Ask again later… I'm busy being a sphere.", category: "general", leaning: "maybe" },
  { body: "Cannot predict now — my algorithm is having an existential crisis.", category: "general", leaning: "maybe" },
  { body: "Better not tell you now… because you wouldn't listen anyway.", category: "general", leaning: "maybe" },
  { body: "Reply hazy, try again… later, when I care a little more.", category: "general", leaning: "maybe" },
  { body: "Most likely… to need more context and less spiraling.", category: "general", leaning: "maybe" },
  { body: "Huh, you're dreaming!", category: "general", leaning: "roast" },
  { body: "Error 404: Good idea not found.", category: "general", leaning: "roast" },
  { body: "Ask again when I care.", category: "general", leaning: "roast" },
  { body: "Cute question. Next.", category: "general", leaning: "roast" },
  { body: "Bold of you to assume the cosmos does customer service.", category: "general", leaning: "roast" },
  { body: "Even a fortune cookie would give better advice right now.", category: "general", leaning: "roast" },
  { body: "Without a doubt… you're asking the wrong questions.", category: "general", leaning: "roast" },
  { body: "Yes definitely… if you enjoy disappointment.", category: "general", leaning: "roast" },
  { body: "It is certain…ly not my problem.", category: "general", leaning: "roast" },
  { body: "Outlook good… for someone else, maybe.", category: "general", leaning: "roast" },
  { body: "Most likely… to disappoint. Package carefully.", category: "general", leaning: "roast" },
  { body: "Without a doubt… you'll regret asking. Still cute though.", category: "general", leaning: "roast" },
  { body: "Sure, and I'm the Queen of England. Next question.", category: "general", leaning: "roast" },
  { body: "I'm on break. Ask your group chat instead.", category: "general", leaning: "roast" },
  { body: "Error 404: Future not found. Try being present.", category: "general", leaning: "roast" },
  { body: "Get a hobby that isn't catastrophizing. Then ask again.", category: "general", leaning: "roast" },
  { body: "Outlook not so good… much like your browser history.", category: "general", leaning: "roast" },
  { body: "Sure, right after pigs start paying taxes.", category: "general", leaning: "roast" },
  { body: "Ask again after I've had my coffee. Or after you've had courage.", category: "general", leaning: "maybe" },
  { body: "Only if you stop treating vibes like a business plan.", category: "general", leaning: "maybe" },
  { body: "Yes — but don't make it weird in the group chat.", category: "general", leaning: "yes" },
  { body: "It is decidedly someone else's problem. Lucky you.", category: "general", leaning: "roast" },
  { body: "As likely as you touching grass before noon.", category: "general", leaning: "roast" },
  { body: "No notes. Just no.", category: "general", leaning: "no" },
  { body: "The ball consulted the void. The void shrugged.", category: "general", leaning: "maybe" },
  { body: "Absolutely not, king/queen/chaos gremlin.", category: "general", leaning: "no" },
  { body: "Yes, but document nothing and expect nothing. Healthy chaos only.", category: "general", leaning: "yes" },
  { body: "Your mom already thinks you're a star. Case closed.", category: "general", leaning: "roast" },
  { body: "Reply hazy, much like your five-year plan.", category: "general", leaning: "maybe" },
  { body: "Signs point to pizza. Also maybe yes. Mostly pizza.", category: "general", leaning: "maybe" },
  { body: "Do it scared. Or don't. I'm a ball, not your manager.", category: "general", leaning: "maybe" },
  { body: "Without a doubt… feel free to ignore me and learn the hard way.", category: "general", leaning: "roast" },
  { body: "Concentrate and ask again — as if that will change anything.", category: "general", leaning: "roast" },

  // fitness / action ("Should I run today?")
  { body: "Yes. Lace up. Your excuses already stretched enough.", category: "fitness", leaning: "yes" },
  { body: "Go run. Your future knees sent a thank-you card in advance.", category: "fitness", leaning: "yes" },
  { body: "Do the run. Drama burns fewer calories than you think.", category: "fitness", leaning: "yes" },
  { body: "Yes — even a short one counts. The couch will survive without you.", category: "fitness", leaning: "yes" },
  { body: "Run today. Posting about running later is optional; actually running is not.", category: "fitness", leaning: "yes" },
  { body: "Yes. Ten minutes counts. Your ego wants a marathon; your body wants consistency.", category: "fitness", leaning: "yes" },
  { body: "Go. Move. Sweat a little. Become slightly harder to kill by Tuesday.", category: "fitness", leaning: "yes" },
  { body: "Absolutely — unless you're injured. Then rest like a professional athlete, not a martyr.", category: "fitness", leaning: "yes" },
  { body: "Not today. Your body's group chat is voting for rest.", category: "fitness", leaning: "no" },
  { body: "Skip the hero workout. Walk, hydrate, live to sprint another day.", category: "fitness", leaning: "no" },
  { body: "No epic run required. Your ego wants a marathon; your joints want a stroll.", category: "fitness", leaning: "no" },
  { body: "Gym can wait. Your sleep debt is already on a payment plan.", category: "fitness", leaning: "no" },
  { body: "No. Rest day energy. Tomorrow's you will thank today's you for not being dramatic.", category: "fitness", leaning: "no" },
  { body: "Skip it if you're wrecked. Pushing through injury is not a personality.", category: "fitness", leaning: "no" },
  { body: "Maybe a walk instead of a run — same main character energy, fewer regret scenes.", category: "fitness", leaning: "maybe" },
  { body: "Depends how many coffees you've had and how dramatic your playlist is.", category: "fitness", leaning: "maybe" },
  { body: "Stretch first. If you still want to run after that, the cosmos approves.", category: "fitness", leaning: "maybe" },
  { body: "Maybe. Check the weather, your knees, and your attitude. Two out of three is enough.", category: "fitness", leaning: "maybe" },
  { body: "Do half of what you planned. Still counts. Still better than zero and a spiral.", category: "fitness", leaning: "maybe" },
  { body: "Your sneakers are judging you. Make them proud or put them back gently.", category: "fitness", leaning: "roast" },
  { body: "Sacred cardio tip: dramatic sighs do not count as a workout.", category: "fitness", leaning: "roast" },
  { body: "Netflix isn't going to watch itself — but your fitness goals aren't either. Choose chaos wisely.", category: "fitness", leaning: "roast" },
  { body: "Your couch filed a custody claim. Go for a run and contest it.", category: "fitness", leaning: "roast" },
  { body: "Asking a plastic ball about cardio is already cardio for your decision muscles. Now go move.", category: "fitness", leaning: "roast" },
  { body: "Pizza says no. Your future VO2 max says yes. Pick a side.", category: "fitness", leaning: "roast" },
  { body: "Yes. Even if it's ugly. Ugly runs still count in the cosmos.", category: "fitness", leaning: "yes" },
  { body: "No PR needed. Just leave the house before your brain invents a meeting.", category: "fitness", leaning: "yes" },
  { body: "Rest. Your 'I'll crush it tomorrow' is currently more believable.", category: "fitness", leaning: "no" },
  { body: "Your step count called. It wants a soft launch, not a hostage video.", category: "fitness", leaning: "maybe" },
  { body: "Scrolling burns zero calories. Shocking, I know.", category: "fitness", leaning: "roast" },
  { body: "If your warm-up is a spiral, cool down with literally walking.", category: "fitness", leaning: "roast" },

  // romance
  { body: "They're out of your league — for now. Level up the playlist first.", category: "romance", leaning: "roast" },
  { body: "She's out of your league!", category: "romance", leaning: "roast" },
  { body: "He's out of your league!", category: "romance", leaning: "roast" },
  { body: "They're out of your league!", category: "romance", leaning: "roast" },
  { body: "That crush has plot armor. You have character development.", category: "romance", leaning: "roast" },
  { body: "They're probably thinking about pizza, not you.", category: "romance", leaning: "roast" },
  { body: "Your cat counts as true love. Adjust expectations accordingly.", category: "romance", leaning: "roast" },
  { body: "Sure you'll find true love — right after you learn to text without a TED Talk.", category: "romance", leaning: "roast" },
  { body: "They're not ignoring you. They're living a full life. Wild concept.", category: "romance", leaning: "roast" },
  { body: "Your situationship has more plot holes than chemistry.", category: "romance", leaning: "roast" },
  { body: "Text them. Or don't. Either way, hydrate first.", category: "romance", leaning: "maybe" },
  { body: "Ask again after you stop romanticizing mixed signals.", category: "romance", leaning: "maybe" },
  { body: "Outlook good for memes, unclear for mutual feelings.", category: "romance", leaning: "maybe" },
  { body: "Maybe. If their effort matches yours. If not, delete the fantasy draft.", category: "romance", leaning: "maybe" },
  { body: "Reply hazy — check if they actually text back before inventing a wedding.", category: "romance", leaning: "maybe" },
  { body: "Yes, shoot your shot — but make it a clean shot, not a novel.", category: "romance", leaning: "yes" },
  { body: "Go for it. Confidence is hot; essays are not.", category: "romance", leaning: "yes" },
  { body: "Yes. Ask. Clarity is hotter than guessing.", category: "romance", leaning: "yes" },
  { body: "Do it — short, chill, no manifesto attached.", category: "romance", leaning: "yes" },
  { body: "No. Delete the draft. Your dignity filed a restraining order.", category: "romance", leaning: "no" },
  { body: "Do not text your ex. Error 404: Good idea not found.", category: "romance", leaning: "no" },
  { body: "My reply is no way, Jose — and Jose agrees about this crush.", category: "romance", leaning: "no" },
  { body: "No. If they wanted to, they would. The ball is tired of repeating that.", category: "romance", leaning: "no" },
  { body: "Leave the ex alone. Archaeology is for museums, not your DMs.", category: "romance", leaning: "no" },
  { body: "Sure, right after you learn to love yourself… so, calendar invite pending.", category: "romance", leaning: "roast" },
  { body: "They're out of your league and also out of your notification settings.", category: "romance", leaning: "roast" },
  { body: "Your crush has a life. You have a thesis about their story. Close the laptop.", category: "romance", leaning: "roast" },
  { body: "Yes — if you can handle a normal human reply without a spiral documentary.", category: "romance", leaning: "yes" },
  { body: "Maybe they're into you. Maybe you're into the idea of them. Audit carefully.", category: "romance", leaning: "maybe" },
  { body: "Do not double-text the void. The void doesn't do receipts.", category: "romance", leaning: "no" },
  { body: "Green flag check: do they initiate? If not, stop directing the movie alone.", category: "romance", leaning: "maybe" },
  { body: "Love is real. Your current crush might just be boredom in a cute font.", category: "romance", leaning: "roast" },

  // work
  { body: "Yes, send it — after one ruthless edit and zero panic emojis.", category: "work", leaning: "yes" },
  { body: "Take the meeting. Bring boundaries like they're business cards.", category: "work", leaning: "yes" },
  { body: "Ask for the raise. The worst they can say is a boring no.", category: "work", leaning: "yes" },
  { body: "Yes, but delete the passive-aggressive CC list first.", category: "work", leaning: "yes" },
  { body: "Ship it. Perfect is a scam; done is a career move.", category: "work", leaning: "yes" },
  { body: "No. Do not quit in the group chat. Quit with a plan.", category: "work", leaning: "no" },
  { body: "Don't send that email angry. Send it tomorrow as a professional adult.", category: "work", leaning: "no" },
  { body: "No. That Slack message needs a cooling-off period and a therapist.", category: "work", leaning: "no" },
  { body: "Don't volunteer for more unpaid emotional labor. Your calendar already looks haunted.", category: "work", leaning: "no" },
  { body: "Let's circle back in another dimension.", category: "work", leaning: "roast" },
  { body: "Your browser history called: maybe finish the task before daydreaming promotions.", category: "work", leaning: "roast" },
  { body: "Outlook good… after you close seventeen tabs of 'research.'", category: "work", leaning: "roast" },
  { body: "This meeting could've been a silent scream into a pillow.", category: "work", leaning: "roast" },
  { body: "Reply hazy — Mercury retrograde and also your calendar.", category: "work", leaning: "maybe" },
  { body: "Most likely… to need another cup of coffee before deciding.", category: "work", leaning: "maybe" },
  { body: "Maybe. Sleep on it, then decide like someone who bills hourly.", category: "work", leaning: "maybe" },
  { body: "Ask again after you check the deadline, the politics, and your blood pressure.", category: "work", leaning: "maybe" },
  { body: "Outlook not so good… much like your resume's 'passionate about synergy' line.", category: "work", leaning: "roast" },
  { body: "Yes, ask. Your silence isn't mysterious — it's unpaid.", category: "work", leaning: "yes" },
  { body: "No. Do not 'quick sync' your way into another unpaid project.", category: "work", leaning: "no" },
  { body: "Put it on the calendar or it doesn't exist. Cosmic project management.", category: "work", leaning: "maybe" },
  { body: "Your 'I'll do it later' has unionized. Negotiate.", category: "work", leaning: "roast" },
  { body: "Promote yourself in private by finishing the thing. Then ask loudly.", category: "work", leaning: "yes" },

  // money
  { body: "Buy it if it solves a problem. Not if it solves a mood.", category: "money", leaning: "maybe" },
  { body: "Sleep on it. If you still want it tomorrow, the cosmos shrugs yes.", category: "money", leaning: "maybe" },
  { body: "Maybe — if the return policy is friendlier than your impulse control.", category: "money", leaning: "maybe" },
  { body: "Your bank account left the chat.", category: "money", leaning: "no" },
  { body: "No. That purchase is a soft launch for regret.", category: "money", leaning: "no" },
  { body: "Absolutely not. Your wallet just filed a noise complaint.", category: "money", leaning: "no" },
  { body: "Nope. Try bribing me with a budget first.", category: "money", leaning: "no" },
  { body: "Yes — if it's on sale and your future rent still likes you.", category: "money", leaning: "yes" },
  { body: "Yes, if you've already paid yourself and the bills first. Then treat yourself like a person.", category: "money", leaning: "yes" },
  { body: "Does having 37 cents and vibes count as rich? Asking for a friend.", category: "money", leaning: "roast" },
  { body: "Your cart is full of dopamine. Your savings account is full of crickets.", category: "money", leaning: "roast" },
  { body: "Retail therapy called. It wants a divorce from your checking account.", category: "money", leaning: "roast" },
  { body: "Add it to wishlist. Subtract it from your personality for 48 hours.", category: "money", leaning: "maybe" },
  { body: "No. Your 'treat yourself' fund is currently imaginary and dramatic.", category: "money", leaning: "no" },
  { body: "Yes — boring purchase that helps future-you. Not the shiny chaos item.", category: "money", leaning: "yes" },
  { body: "If you have to ask a ball, you already know it's a maybe-no.", category: "money", leaning: "roast" },

  // social
  { body: "Go. Be hot. Be weird. Leave early if the vibe taxes you.", category: "social", leaning: "yes" },
  { body: "Yes, show up. Ghosting the couch builds character.", category: "social", leaning: "yes" },
  { body: "Go — ninety minutes max. Leave while you're still a legend.", category: "social", leaning: "yes" },
  { body: "Stay home. Your social battery is on airplane mode.", category: "social", leaning: "no" },
  { body: "Skip it. FOMO is lying to you with good lighting.", category: "social", leaning: "no" },
  { body: "No. Protect the peace. The party will survive without your cameo.", category: "social", leaning: "no" },
  { body: "Maybe — RSVP yes, emotionally RSVP maybe.", category: "social", leaning: "maybe" },
  { body: "Only if you can leave without writing an essay in the Uber.", category: "social", leaning: "maybe" },
  { body: "Maybe. Arrive late, leave early, hydrate like a professional.", category: "social", leaning: "maybe" },
  { body: "Sure, if you enjoy small talk as a competitive sport.", category: "social", leaning: "roast" },
  { body: "Yes, if you want stories. No, if you want sleep. Choose your fighter.", category: "social", leaning: "roast" },
  { body: "Your introvert and extrovert are fighting. Send snacks as a peace offering.", category: "social", leaning: "roast" },
  { body: "Go — but bring an exit strategy and a charged phone.", category: "social", leaning: "yes" },
  { body: "Stay home and call one friend instead of performing for twelve acquaintances.", category: "social", leaning: "maybe" },
  { body: "FOMO is a marketing department. You are not the product tonight.", category: "social", leaning: "no" },
  { body: "Yes, if the people are kind. No, if the vibe is unpaid networking theater.", category: "social", leaning: "maybe" },
  { body: "Your social battery is at 12%. Charge it or fake it for one hour max.", category: "social", leaning: "roast" },
];

async function reseedCrystal() {
  await prisma.crystalBallSaying.deleteMany();
  await prisma.crystalBallSaying.createMany({
    data: CRYSTAL_BALL.map((body) => ({ body })),
  });
}

async function reseedPartner() {
  await prisma.idealPartnerSaying.deleteMany();
  await prisma.idealPartnerSaying.createMany({
    data: [
      ...IDEAL_PARTNER_MALE.map((body) => ({ gender: "male", body })),
      ...IDEAL_PARTNER_FEMALE.map((body) => ({ gender: "female", body })),
      ...IDEAL_PARTNER_ANY.map((body) => ({ gender: "any", body })),
    ],
  });
}

async function reseedEight() {
  await prisma.magicEightAnswer.deleteMany();
  await prisma.magicEightAnswer.createMany({
    data: MAGIC_EIGHT.map(({ body, category, leaning }) => ({
      body,
      category,
      leaning,
    })),
  });
}

async function reseedTarot() {
  await prisma.tarotCard.deleteMany();
  await prisma.tarotCard.createMany({
    data: MAJOR_ARCANA.map((card) => ({
      slug: card.slug,
      name: card.name,
      number: card.number,
      arcana: card.arcana,
      romanNumeral: card.romanNumeral,
      element: card.element,
      keywordsUpright: card.keywordsUpright,
      keywordsReversed: card.keywordsReversed,
      uprightGeneral: card.uprightGeneral,
      reversedGeneral: card.reversedGeneral,
      uprightLove: card.uprightLove,
      reversedLove: card.reversedLove,
      uprightCareer: card.uprightCareer,
      reversedCareer: card.reversedCareer,
      uprightAdvice: card.uprightAdvice,
      reversedAdvice: card.reversedAdvice,
      symbolism: card.symbolism,
    })),
  });
}

async function seedLocalReadings() {
  const timeZone = process.env.SITE_TZ ?? "America/New_York";
  const window = getWindowForInstant(new Date(), timeZone);
  const readings = createLocalOfflineReadings();

  await prisma.batch.deleteMany({ where: { windowStart: window.windowStart } });

  const batch = await prisma.batch.create({
    data: {
      windowStart: window.windowStart,
      windowEnd: window.windowEnd,
      providerMeta: {
        primary: "local-offline",
        fallbackUsed: false,
        providersSeen: ["local-offline"],
      },
      readings: {
        create: readings,
      },
    },
    include: { readings: true },
  });

  return batch.readings.length;
}

async function main() {
  await reseedCrystal();
  await reseedPartner();
  await reseedEight();
  await reseedTarot();
  const readingCount = await seedLocalReadings();
  console.log(
    `Reseeded games: crystal=${CRYSTAL_BALL.length}, partner=${IDEAL_PARTNER_MALE.length + IDEAL_PARTNER_FEMALE.length + IDEAL_PARTNER_ANY.length}, eight=${MAGIC_EIGHT.length}, tarot=${MAJOR_ARCANA.length}, readings=${readingCount}`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
