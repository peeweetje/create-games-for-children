import { create } from "zustand";

export type ReadingLevel = "letters" | "words" | "sentences" | "stories";
export type Theme = "animals" | "colors" | "numbers" | "family" | "food" | "transportation";

export interface Letter {
    letter: string;
    sound: string;
    example: string;
    image?: string;
    audio?: string;
}

export interface Word {
    word: string;
    translation?: string;
    theme: Theme;
    image?: string;
    audio?: string;
}

export interface Sentence {
    sentence: string;
    translation?: string;
    theme: Theme;
    image?: string;
    audio?: string;
}

export interface Story {
    title: string;
    titleTranslation?: string;
    content: string[];
    translation?: string[];
    theme: Theme;
    image?: string;
    audio?: string;
}

export interface ReadingQuestion {
    type: "letter" | "word" | "sentence" | "story";
    prompt: string;
    answer: string;
    translation?: string;
    choices: string[];
    theme?: Theme;
    image?: string;
    audio?: string;
}

// Letter data with phonics sounds
const LETTERS: Letter[] = [
    { letter: "A", sound: "/æ/", example: "Apple", image: "apple.png" },
    { letter: "B", sound: "/b/", example: "Ball", image: "ball.png" },
    { letter: "C", sound: "/k/", example: "Cat", image: "cat.png" },
    { letter: "D", sound: "/d/", example: "Dog", image: "dog.png" },
    { letter: "E", sound: "/ɛ/", example: "Elephant", image: "elephant.png" },
    { letter: "F", sound: "/f/", example: "Fish", image: "fish.png" },
    { letter: "G", sound: "/g/", example: "Giraffe", image: "giraffe.png" },
    { letter: "H", sound: "/h/", example: "House", image: "house.png" },
    { letter: "I", sound: "/ɪ/", example: "Ice", image: "ice.png" },
    { letter: "J", sound: "/dʒ/", example: "Jug", image: "jug.png" },
    { letter: "K", sound: "/k/", example: "Kite", image: "kite.png" },
    { letter: "L", sound: "/l/", example: "Lion", image: "lion.png" },
    { letter: "M", sound: "/m/", example: "Monkey", image: "monkey.png" },
    { letter: "N", sound: "/n/", example: "Nest", image: "nest.png" },
    { letter: "O", sound: "/ɒ/", example: "Orange", image: "orange.png" },
    { letter: "P", sound: "/p/", example: "Pig", image: "pig.png" },
    { letter: "Q", sound: "/kw/", example: "Queen", image: "queen.png" },
    { letter: "R", sound: "/r/", example: "Rabbit", image: "rabbit.png" },
    { letter: "S", sound: "/s/", example: "Sun", image: "sun.png" },
    { letter: "T", sound: "/t/", example: "Tiger", image: "tiger.png" },
    { letter: "U", sound: "/ʌ/", example: "Umbrella", image: "umbrella.png" },
    { letter: "V", sound: "/v/", example: "Van", image: "van.png" },
    { letter: "W", sound: "/w/", example: "Water", image: "water.png" },
    { letter: "X", sound: "/ks/", example: "Box", image: "box.png" },
    { letter: "Y", sound: "/j/", example: "Yak", image: "yak.png" },
    { letter: "Z", sound: "/z/", example: "Zebra", image: "zebra.png" },
];

// Word data organized by themes
const WORDS: Record<Theme, Word[]> = {
    animals: [
        { word: "cat", theme: "animals", image: "cat.png", audio: "cat.mp3" },
        { word: "dog", theme: "animals", image: "dog.png", audio: "dog.mp3" },
        { word: "bird", theme: "animals", image: "bird.png", audio: "bird.mp3" },
        { word: "fish", theme: "animals", image: "fish.png", audio: "fish.mp3" },
        { word: "lion", theme: "animals", image: "lion.png", audio: "lion.mp3" },
        { word: "tiger", theme: "animals", image: "tiger.png", audio: "tiger.mp3" },
        { word: "elephant", theme: "animals", image: "elephant.png", audio: "elephant.mp3" },
        { word: "giraffe", theme: "animals", image: "giraffe.png", audio: "giraffe.mp3" },
        { word: "monkey", theme: "animals", image: "monkey.png", audio: "monkey.mp3" },
        { word: "rabbit", theme: "animals", image: "rabbit.png", audio: "rabbit.mp3" },
        { word: "bear", theme: "animals", image: "bear.png", audio: "bear.mp3" },
        { word: "fox", theme: "animals", image: "fox.png", audio: "fox.mp3" },
    ],
    colors: [
        { word: "red", theme: "colors", image: "red.png", audio: "red.mp3" },
        { word: "blue", theme: "colors", image: "blue.png", audio: "blue.mp3" },
        { word: "green", theme: "colors", image: "green.png", audio: "green.mp3" },
        { word: "yellow", theme: "colors", image: "yellow.png", audio: "yellow.mp3" },
        { word: "orange", theme: "colors", image: "orange.png", audio: "orange.mp3" },
        { word: "purple", theme: "colors", image: "purple.png", audio: "purple.mp3" },
        { word: "pink", theme: "colors", image: "pink.png", audio: "pink.mp3" },
        { word: "brown", theme: "colors", image: "brown.png", audio: "brown.mp3" },
        { word: "black", theme: "colors", image: "black.png", audio: "black.mp3" },
        { word: "white", theme: "colors", image: "white.png", audio: "white.mp3" },
        { word: "gray", theme: "colors", image: "gray.png", audio: "gray.mp3" },
    ],
    numbers: [
        { word: "one", theme: "numbers", image: "one.png", audio: "one.mp3" },
        { word: "two", theme: "numbers", image: "two.png", audio: "two.mp3" },
        { word: "three", theme: "numbers", image: "three.png", audio: "three.mp3" },
        { word: "four", theme: "numbers", image: "four.png", audio: "four.mp3" },
        { word: "five", theme: "numbers", image: "five.png", audio: "five.mp3" },
        { word: "six", theme: "numbers", image: "six.png", audio: "six.mp3" },
        { word: "seven", theme: "numbers", image: "seven.png", audio: "seven.mp3" },
        { word: "eight", theme: "numbers", image: "eight.png", audio: "eight.mp3" },
        { word: "nine", theme: "numbers", image: "nine.png", audio: "nine.mp3" },
        { word: "ten", theme: "numbers", image: "ten.png", audio: "ten.mp3" },
    ],
    family: [
        { word: "mom", theme: "family", image: "mom.png", audio: "mom.mp3" },
        { word: "dad", theme: "family", image: "dad.png", audio: "dad.mp3" },
        { word: "brother", theme: "family", image: "brother.png", audio: "brother.mp3" },
        { word: "sister", theme: "family", image: "sister.png", audio: "sister.mp3" },
        { word: "grandma", theme: "family", image: "grandma.png", audio: "grandma.mp3" },
        { word: "grandpa", theme: "family", image: "grandpa.png", audio: "grandpa.mp3" },
        { word: "baby", theme: "family", image: "baby.png", audio: "baby.mp3" },
        { word: "family", theme: "family", image: "family.png", audio: "family.mp3" },
    ],
    food: [
        { word: "apple", theme: "food", image: "apple.png", audio: "apple.mp3" },
        { word: "banana", theme: "food", image: "banana.png", audio: "banana.mp3" },
        { word: "bread", theme: "food", image: "bread.png", audio: "bread.mp3" },
        { word: "milk", theme: "food", image: "milk.png", audio: "milk.mp3" },
        { word: "water", theme: "food", image: "water.png", audio: "water.mp3" },
        { word: "egg", theme: "food", image: "egg.png", audio: "egg.mp3" },
        { word: "cheese", theme: "food", image: "cheese.png", audio: "cheese.mp3" },
        { word: "rice", theme: "food", image: "rice.png", audio: "rice.mp3" },
        { word: "pizza", theme: "food", image: "pizza.png", audio: "pizza.mp3" },
        { word: "cake", theme: "food", image: "cake.png", audio: "cake.mp3" },
    ],
    transportation: [
        { word: "car", theme: "transportation", image: "car.png", audio: "car.mp3" },
        { word: "bus", theme: "transportation", image: "bus.png", audio: "bus.mp3" },
        { word: "bike", theme: "transportation", image: "bike.png", audio: "bike.mp3" },
        { word: "train", theme: "transportation", image: "train.png", audio: "train.mp3" },
        { word: "plane", theme: "transportation", image: "plane.png", audio: "plane.mp3" },
        { word: "boat", theme: "transportation", image: "boat.png", audio: "boat.mp3" },
        { word: "truck", theme: "transportation", image: "truck.png", audio: "truck.mp3" },
        { word: "van", theme: "transportation", image: "van.png", audio: "van.mp3" },
    ],
};

// Simple sentences organized by themes
const SENTENCES: Record<Theme, Sentence[]> = {
    animals: [
        { sentence: "The cat is black.", translation: "De kat is zwart.", theme: "animals", image: "black-cat.png", audio: "black-cat.mp3" },
        { sentence: "The dog is big.", translation: "De hond is groot.", theme: "animals", image: "big-dog.png", audio: "big-dog.mp3" },
        { sentence: "The bird can fly.", translation: "De vogel kan vliegen.", theme: "animals", image: "flying-bird.png", audio: "flying-bird.mp3" },
        { sentence: "The fish swims.", translation: "De vis zwemt.", theme: "animals", image: "swimming-fish.png", audio: "swimming-fish.mp3" },
        { sentence: "The lion is strong.", translation: "De leeuw is sterk.", theme: "animals", image: "strong-lion.png", audio: "strong-lion.mp3" },
    ],
    colors: [
        { sentence: "The apple is red.", translation: "De appel is rood.", theme: "colors", image: "red-apple.png", audio: "red-apple.mp3" },
        { sentence: "The sky is blue.", translation: "De lucht is blauw.", theme: "colors", image: "blue-sky.png", audio: "blue-sky.mp3" },
        { sentence: "The grass is green.", translation: "Het gras is groen.", theme: "colors", image: "green-grass.png", audio: "green-grass.mp3" },
        { sentence: "The sun is yellow.", translation: "De zon is geel.", theme: "colors", image: "yellow-sun.png", audio: "yellow-sun.mp3" },
        { sentence: "The ball is orange.", translation: "De bal is oranje.", theme: "colors", image: "orange-ball.png", audio: "orange-ball.mp3" },
    ],
    numbers: [
        { sentence: "I see one cat.", translation: "Ik zie één kat.", theme: "numbers", image: "one-cat.png", audio: "one-cat.mp3" },
        { sentence: "I see two dogs.", translation: "Ik zie twee honden.", theme: "numbers", image: "two-dogs.png", audio: "two-dogs.mp3" },
        { sentence: "I see three birds.", translation: "Ik zie drie vogels.", theme: "numbers", image: "three-birds.png", audio: "three-birds.mp3" },
        { sentence: "I see four fish.", translation: "Ik zie vier vissen.", theme: "numbers", image: "four-fish.png", audio: "four-fish.mp3" },
        { sentence: "I see five lions.", translation: "Ik zie vijf leeuwen.", theme: "numbers", image: "five-lions.png", audio: "five-lions.mp3" },
    ],
    family: [
        { sentence: "Mom is kind.", translation: "Mam is lief.", theme: "family", image: "kind-mom.png", audio: "kind-mom.mp3" },
        { sentence: "Dad is tall.", translation: "Pap is lang.", theme: "family", image: "tall-dad.png", audio: "tall-dad.mp3" },
        { sentence: "Brother is happy.", translation: "Broer is blij.", theme: "family", image: "happy-brother.png", audio: "happy-brother.mp3" },
        { sentence: "Sister is smart.", translation: "Zus is slim.", theme: "family", image: "smart-sister.png", audio: "smart-sister.mp3" },
        { sentence: "We are family.", translation: "Wij zijn familie.", theme: "family", image: "happy-family.png", audio: "happy-family.mp3" },
    ],
    food: [
        { sentence: "I eat an apple.", translation: "Ik eet een appel.", theme: "food", image: "eating-apple.png", audio: "eating-apple.mp3" },
        { sentence: "I drink milk.", translation: "Ik drink melk.", theme: "food", image: "drinking-milk.png", audio: "drinking-milk.mp3" },
        { sentence: "I like pizza.", translation: "Ik hou van pizza.", theme: "food", image: "eating-pizza.png", audio: "eating-pizza.mp3" },
        { sentence: "I eat bread.", translation: "Ik eet brood.", theme: "food", image: "eating-bread.png", audio: "eating-bread.mp3" },
        { sentence: "I drink water.", translation: "Ik drink water.", theme: "food", image: "drinking-water.png", audio: "drinking-water.mp3" },
    ],
    transportation: [
        { sentence: "The car is fast.", translation: "De auto is snel.", theme: "transportation", image: "fast-car.png", audio: "fast-car.mp3" },
        { sentence: "The bus is big.", translation: "De bus is groot.", theme: "transportation", image: "big-bus.png", audio: "big-bus.mp3" },
        { sentence: "The bike is red.", translation: "De fiets is rood.", theme: "transportation", image: "red-bike.png", audio: "red-bike.mp3" },
        { sentence: "The train goes fast.", translation: "De trein gaat snel.", theme: "transportation", image: "fast-train.png", audio: "fast-train.mp3" },
        { sentence: "The plane flies high.", translation: "Het vliegtuig vliegt hoog.", theme: "transportation", image: "flying-plane.png", audio: "flying-plane.mp3" },
    ],
};

// Simple stories organized by themes
const STORIES: Record<Theme, Story[]> = {
    animals: [
        {
            title: "The Happy Cat",
            titleTranslation: "De Gelukkige Kat",
            content: [
                "The cat is happy.",
                "The cat sees a bird.",
                "The cat chases the bird.",
                "The bird flies away.",
                "The cat is tired.",
                "The cat sleeps."
            ],
            translation: [
                "De kat is blij.",
                "De kat ziet een vogel.",
                "De kat jaagt op de vogel.",
                "De vogel vliegt weg.",
                "De kat is moe.",
                "De kat slaapt."
            ],
            theme: "animals",
            image: "happy-cat.png",
            audio: "happy-cat-story.mp3"
        },
    ],
    colors: [
        {
            title: "The Rainbow",
            titleTranslation: "De Regenboog",
            content: [
                "The sky is blue.",
                "The sun is yellow.",
                "The grass is green.",
                "The flowers are red.",
                "The sky has a rainbow.",
                "The rainbow has many colors."
            ],
            translation: [
                "De lucht is blauw.",
                "De zon is geel.",
                "Het gras is groen.",
                "De bloemen zijn rood.",
                "De lucht heeft een regenboog.",
                "De regenboog heeft veel kleuren."
            ],
            theme: "colors",
            image: "rainbow.png",
            audio: "rainbow-story.mp3"
        },
    ],
    numbers: [
        {
            title: "Counting Animals",
            titleTranslation: "Dieren Tellen",
            content: [
                "I see one cat.",
                "I see two dogs.",
                "I see three birds.",
                "I see four fish.",
                "I see five lions.",
                "I can count to five!"
            ],
            translation: [
                "Ik zie één kat.",
                "Ik zie twee honden.",
                "Ik zie drie vogels.",
                "Ik zie vier vissen.",
                "Ik zie vijf leeuwen.",
                "Ik kan tot vijf tellen!"
            ],
            theme: "numbers",
            image: "counting-animals.png",
            audio: "counting-story.mp3"
        },
    ],
    family: [
        {
            title: "My Family",
            titleTranslation: "Mijn Familie",
            content: [
                "I have a mom.",
                "I have a dad.",
                "I have a brother.",
                "I have a sister.",
                "We are a happy family.",
                "We love each other."
            ],
            translation: [
                "Ik heb een mam.",
                "Ik heb een pap.",
                "Ik heb een broer.",
                "Ik heb een zus.",
                "Wij zijn een gelukkige familie.",
                "Wij houden van elkaar."
            ],
            theme: "family",
            image: "happy-family.png",
            audio: "family-story.mp3"
        },
    ],
    food: [
        {
            title: "Yummy Food",
            titleTranslation: "Lekker Eten",
            content: [
                "I eat an apple.",
                "I drink milk.",
                "I eat bread.",
                "I like pizza.",
                "I eat cake.",
                "Yummy food!"
            ],
            translation: [
                "Ik eet een appel.",
                "Ik drink melk.",
                "Ik eet brood.",
                "Ik hou van pizza.",
                "Ik eet taart.",
                "Lekker eten!"
            ],
            theme: "food",
            image: "yummy-food.png",
            audio: "food-story.mp3"
        },
    ],
    transportation: [
        {
            title: "Going Places",
            titleTranslation: "Naar Veel Plaatsen",
            content: [
                "I ride in a car.",
                "I ride in a bus.",
                "I ride a bike.",
                "I ride a train.",
                "I ride in a plane.",
                "I can go many places!"
            ],
            translation: [
                "Ik rijd in een auto.",
                "Ik rijd in een bus.",
                "Ik fiets.",
                "Ik rijd in een trein.",
                "Ik vlieg in een vliegtuig.",
                "Ik kan naar veel plaatsen gaan!"
            ],
            theme: "transportation",
            image: "going-places.png",
            audio: "transportation-story.mp3"
        },
    ],
};

// Generate choices for reading questions
function generateReadingChoices(correctAnswer: string, allOptions: string[], count: number = 4): string[] {
    const choices = [correctAnswer];
    
    // Get all wrong options and shuffle them
    const wrongOptions = allOptions.filter(option => option !== correctAnswer);
    const shuffled = wrongOptions.sort(() => Math.random() - 0.5);
    
    // Calculate how many wrong options we need
    const neededWrongOptions = count - 1;
    const availableWrongOptions = wrongOptions.length;
    
    if (availableWrongOptions >= neededWrongOptions) {
        // We have enough wrong options, use the first 'neededWrongOptions' from shuffled array
        for (let i = 0; i < neededWrongOptions; i++) {
            choices.push(shuffled[i]);
        }
    } else {
        // Not enough wrong options, use all available
        for (let i = 0; i < shuffled.length; i++) {
            choices.push(shuffled[i]);
        }
        
        // If still need more choices and we have at least one wrong option, duplicate some
        if (choices.length < count && wrongOptions.length > 0) {
            while (choices.length < count) {
                const randomOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
                if (!choices.includes(randomOption)) {
                    choices.push(randomOption);
                } else {
                    // If all wrong options are already included, just add any wrong option
                    // This prevents infinite loop when wrongOptions.length < count - 1
                    choices.push(wrongOptions[0]);
                    break;
                }
            }
        }
    }
    
    return choices.sort(() => Math.random() - 0.5);
}

// Generate reading question based on level and theme
export function generateReadingQuestion(level: ReadingLevel, theme?: Theme): ReadingQuestion {
    switch (level) {
        case "letters":
            const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
            const letterChoices = generateReadingChoices(letter.letter, LETTERS.map(l => l.letter));
            
            return {
                type: "letter",
                prompt: `What letter makes the sound "${letter.sound}"?`,
                answer: letter.letter,
                choices: letterChoices,
                image: letter.image,
                audio: letter.audio
            };

        case "words":
            const selectedTheme = theme || (Object.keys(WORDS) as Theme[])[Math.floor(Math.random() * Object.keys(WORDS).length)];
            const word = WORDS[selectedTheme][Math.floor(Math.random() * WORDS[selectedTheme].length)];
            const wordChoices = generateReadingChoices(word.word, Object.values(WORDS).flat().map(w => w.word));
            
            return {
                type: "word",
                prompt: "What word do you see?",
                answer: word.word,
                choices: wordChoices,
                theme: selectedTheme,
                image: word.image,
                audio: word.audio
            };

        case "sentences":
            const sentenceTheme = theme || (Object.keys(SENTENCES) as Theme[])[Math.floor(Math.random() * Object.keys(SENTENCES).length)];
            const sentence = SENTENCES[sentenceTheme][Math.floor(Math.random() * SENTENCES[sentenceTheme].length)];
            const sentenceChoices = generateReadingChoices(sentence.sentence, Object.values(SENTENCES).flat().map(s => s.sentence));
            
            return {
                type: "sentence",
                prompt: "What sentence do you read?",
                answer: sentence.sentence,
                translation: sentence.translation,
                choices: sentenceChoices,
                theme: sentenceTheme,
                image: sentence.image,
                audio: sentence.audio
            };

        case "stories":
            const storyTheme = theme || (Object.keys(STORIES) as Theme[])[Math.floor(Math.random() * Object.keys(STORIES).length)];
            const story = STORIES[storyTheme][Math.floor(Math.random() * STORIES[storyTheme].length)];
            
            // Get all story titles except the correct one
            const allStoryTitles = Object.values(STORIES).flat().map(s => s.title);
            const wrongTitles = allStoryTitles.filter(t => t !== story.title);
            
            // Shuffle wrong titles and take first 3 (or all if less than 3 available)
            const shuffledWrongTitles = wrongTitles.sort(() => Math.random() - 0.5);
            const distractorTitles = shuffledWrongTitles.slice(0, 3);
            
            // Create choices array with correct answer and random distractors
            const storyChoices = [story.title, ...distractorTitles].sort(() => Math.random() - 0.5);
            
            return {
                type: "story",
                prompt: `Listen to the story: "${story.title}"`,
                answer: story.title,
                translation: story.titleTranslation ?? story.title,
                choices: storyChoices,
                theme: storyTheme,
                image: story.image,
                audio: story.audio
            };

        default:
            throw new Error("Invalid reading level");
    }
}

// Reading progress store
interface ReadingProgress {
    level: ReadingLevel;
    theme: Theme;
    score: number;
    total: number;
    streak: number;
    stars: number;
    sessionQuestions: number;
    highScores: Record<ReadingLevel, { score: number; total: number; accuracy: number; bestStreak: number; lastPlayed: string }>;
    setLevel: (level: ReadingLevel) => void;
    setTheme: (theme: Theme) => void;
    incrementScore: () => void;
    incrementTotal: () => void;
    incrementStreak: () => void;
    resetStreak: () => void;
    incrementStars: () => void;
    incrementSessionQuestions: () => void;
    resetSession: () => void;
    saveHighScore: (level: ReadingLevel, score: number, total: number, streak: number) => void;
}

export const useReadingProgress = create<ReadingProgress>((set, get) => ({
    level: "letters",
    theme: "animals",
    score: 0,
    total: 0,
    streak: 0,
    stars: 0,
    sessionQuestions: 0,
    highScores: {
        letters: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        words: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        sentences: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        stories: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
    },
    
    setLevel: (level) => set({ level }),
    setTheme: (theme) => set({ theme }),
    
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    incrementTotal: () => set((state) => ({ total: state.total + 1 })),
    incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
    resetStreak: () => set({ streak: 0 }),
    incrementStars: () => set((state) => ({ stars: state.stars + 1 })),
    incrementSessionQuestions: () => set((state) => ({ sessionQuestions: state.sessionQuestions + 1 })),
    
    resetSession: () => set({
        score: 0,
        total: 0,
        streak: 0,
        stars: 0,
        sessionQuestions: 0
    }),
    
    saveHighScore: (level, score, total, streak) => {
        if (total === 0) return;

        const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;
        const currentBestStreak = Math.max(get().highScores[level]?.bestStreak || 0, streak);
        
        const existingScore = get().highScores[level]?.score || 0;
        const existingTotal = get().highScores[level]?.total || 0;
        const existingAccuracy = get().highScores[level]?.accuracy || 0;
        
        const updatedHighScores = {
            ...get().highScores,
            [level]: {
                score: Math.max(existingScore, score),
                total: existingTotal + total,
                accuracy: Math.max(existingAccuracy, sessionAccuracy),
                bestStreak: currentBestStreak,
                lastPlayed: new Date().toISOString()
            }
        };

        set({ highScores: updatedHighScores });
        
        // Save to localStorage
        try {
            localStorage.setItem("reading-high-scores", JSON.stringify(updatedHighScores));
        } catch (error) {
            console.error("Error saving reading high scores:", error);
        }
    }
}));

// Load high scores from localStorage on initialization
const savedScores = localStorage.getItem("reading-high-scores");
if (savedScores) {
    try {
        const parsedScores = JSON.parse(savedScores);
        useReadingProgress.setState({ highScores: parsedScores });
    } catch (error) {
        console.error("Error loading reading high scores:", error);
    }
}

export { LETTERS, WORDS, SENTENCES, STORIES };