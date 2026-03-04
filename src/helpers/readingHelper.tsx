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
    storyContent?: string[];
    storyTranslation?: string[];
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
        { word: "cat", translation: "kat", theme: "animals", image: "cat.png", audio: "cat.mp3" },
        { word: "dog", translation: "hond", theme: "animals", image: "dog.png", audio: "dog.mp3" },
        { word: "bird", translation: "vogel", theme: "animals", image: "bird.png", audio: "bird.mp3" },
        { word: "fish", translation: "vis", theme: "animals", image: "fish.png", audio: "fish.mp3" },
        { word: "lion", translation: "leeuw", theme: "animals", image: "lion.png", audio: "lion.mp3" },
        { word: "tiger", translation: "tijger", theme: "animals", image: "tiger.png", audio: "tiger.mp3" },
        { word: "elephant", translation: "olifant", theme: "animals", image: "elephant.png", audio: "elephant.mp3" },
        { word: "giraffe", translation: "giraf", theme: "animals", image: "giraffe.png", audio: "giraffe.mp3" },
        { word: "monkey", translation: "aap", theme: "animals", image: "monkey.png", audio: "monkey.mp3" },
        { word: "rabbit", translation: "konijn", theme: "animals", image: "rabbit.png", audio: "rabbit.mp3" },
        { word: "bear", translation: "beer", theme: "animals", image: "bear.png", audio: "bear.mp3" },
        { word: "fox", translation: "vos", theme: "animals", image: "fox.png", audio: "fox.mp3" },
    ],
    colors: [
        { word: "red", translation: "rood", theme: "colors", image: "red.png", audio: "red.mp3" },
        { word: "blue", translation: "blauw", theme: "colors", image: "blue.png", audio: "blue.mp3" },
        { word: "green", translation: "groen", theme: "colors", image: "green.png", audio: "green.mp3" },
        { word: "yellow", translation: "geel", theme: "colors", image: "yellow.png", audio: "yellow.mp3" },
        { word: "orange", translation: "oranje", theme: "colors", image: "orange.png", audio: "orange.mp3" },
        { word: "purple", translation: "paars", theme: "colors", image: "purple.png", audio: "purple.mp3" },
        { word: "pink", translation: "roze", theme: "colors", image: "pink.png", audio: "pink.mp3" },
        { word: "brown", translation: "bruin", theme: "colors", image: "brown.png", audio: "brown.mp3" },
        { word: "black", translation: "zwart", theme: "colors", image: "black.png", audio: "black.mp3" },
        { word: "white", translation: "wit", theme: "colors", image: "white.png", audio: "white.mp3" },
        { word: "gray", translation: "grijs", theme: "colors", image: "gray.png", audio: "gray.mp3" },
    ],
    numbers: [
        { word: "one", translation: "één", theme: "numbers", image: "one.png", audio: "one.mp3" },
        { word: "two", translation: "twee", theme: "numbers", image: "two.png", audio: "two.mp3" },
        { word: "three", translation: "drie", theme: "numbers", image: "three.png", audio: "three.mp3" },
        { word: "four", translation: "vier", theme: "numbers", image: "four.png", audio: "four.mp3" },
        { word: "five", translation: "vijf", theme: "numbers", image: "five.png", audio: "five.mp3" },
        { word: "six", translation: "zes", theme: "numbers", image: "six.png", audio: "six.mp3" },
        { word: "seven", translation: "zeven", theme: "numbers", image: "seven.png", audio: "seven.mp3" },
        { word: "eight", translation: "acht", theme: "numbers", image: "eight.png", audio: "eight.mp3" },
        { word: "nine", translation: "negen", theme: "numbers", image: "nine.png", audio: "nine.mp3" },
        { word: "ten", translation: "tien", theme: "numbers", image: "ten.png", audio: "ten.mp3" },
    ],
    family: [
        { word: "mom", translation: "mam", theme: "family", image: "mom.png", audio: "mom.mp3" },
        { word: "dad", translation: "pap", theme: "family", image: "dad.png", audio: "dad.mp3" },
        { word: "brother", translation: "broer", theme: "family", image: "brother.png", audio: "brother.mp3" },
        { word: "sister", translation: "zus", theme: "family", image: "sister.png", audio: "sister.mp3" },
        { word: "grandma", translation: "oma", theme: "family", image: "grandma.png", audio: "grandma.mp3" },
        { word: "grandpa", translation: "opa", theme: "family", image: "grandpa.png", audio: "grandpa.mp3" },
        { word: "baby", translation: "baby", theme: "family", image: "baby.png", audio: "baby.mp3" },
        { word: "family", translation: "familie", theme: "family", image: "family.png", audio: "family.mp3" },
    ],
    food: [
        { word: "apple", translation: "appel", theme: "food", image: "apple.png", audio: "apple.mp3" },
        { word: "banana", translation: "banaan", theme: "food", image: "banana.png", audio: "banana.mp3" },
        { word: "bread", translation: "brood", theme: "food", image: "bread.png", audio: "bread.mp3" },
        { word: "milk", translation: "melk", theme: "food", image: "milk.png", audio: "milk.mp3" },
        { word: "water", translation: "water", theme: "food", image: "water.png", audio: "water.mp3" },
        { word: "egg", translation: "ei", theme: "food", image: "egg.png", audio: "egg.mp3" },
        { word: "cheese", translation: "kaas", theme: "food", image: "cheese.png", audio: "cheese.mp3" },
        { word: "rice", translation: "rijst", theme: "food", image: "rice.png", audio: "rice.mp3" },
        { word: "pizza", translation: "pizza", theme: "food", image: "pizza.png", audio: "pizza.mp3" },
        { word: "cake", translation: "taart", theme: "food", image: "cake.png", audio: "cake.mp3" },
    ],
    transportation: [
        { word: "car", translation: "auto", theme: "transportation", image: "car.png", audio: "car.mp3" },
        { word: "bus", translation: "bus", theme: "transportation", image: "bus.png", audio: "bus.mp3" },
        { word: "bike", translation: "fiets", theme: "transportation", image: "bike.png", audio: "bike.mp3" },
        { word: "train", translation: "trein", theme: "transportation", image: "train.png", audio: "train.mp3" },
        { word: "plane", translation: "vliegtuig", theme: "transportation", image: "plane.png", audio: "plane.mp3" },
        { word: "boat", translation: "boot", theme: "transportation", image: "boat.png", audio: "boat.mp3" },
        { word: "truck", translation: "vrachtwagen", theme: "transportation", image: "truck.png", audio: "truck.mp3" },
        { word: "van", translation: "busje", theme: "transportation", image: "van.png", audio: "van.mp3" },
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
            ],
            translation: [
                "De kat is blij.",
                "De kat ziet een vogel.",
                "De kat jaagt op de vogel.",
                "De vogel vliegt weg.",
                "De kat is moe.",
            ],
            theme: "animals",
            image: "happy-cat.png",
            audio: "happy-cat-story.mp3"
        },
        {
            title: "The Big Dog",
            titleTranslation: "De Grote Hond",
            content: [
                "The dog is big and brown.",
                "The dog runs in the park.",
                "The dog finds a ball.",
                "The dog plays with the ball.",
                "The dog is a good boy.",
            ],
            translation: [
                "De hond is groot en bruin.",
                "De hond rent in het park.",
                "De hond vindt een bal.",
                "De hond speelt met de bal.",
                "De hond is een goede jongen.",
            ],
            theme: "animals",
            image: "big-dog.png",
            audio: "big-dog-story.mp3"
        },
        {
            title: "The Little Bird",
            titleTranslation: "Het Kleine Vogeltje",
            content: [
                "A little bird sits in a tree.",
                "The bird sings a song.",
                "It flaps its wings.",
                "The bird flies up high.",
                "It lands on a flower.",
            ],
            translation: [
                "Een klein vogeltje zit in een boom.",
                "De vogel zingt een liedje.",
                "Het flappert met zijn vleugels.",
                "De vogel vliegt hoog op.",
                "Het landt op een bloem.",
            ],
            theme: "animals",
            image: "little-bird.png",
            audio: "little-bird-story.mp3"
        },
        {
            title: "The Brave Lion",
            titleTranslation: "De Dappere Leeuw",
            content: [
                "The lion lives on the savanna.",
                "The lion is big and strong.",
                "He roars very loudly.",
                "All the animals hear him.",
                "The lion is the king.",
            ],
            translation: [
                "De leeuw leeft op de savanne.",
                "De leeuw is groot en sterk.",
                "Hij brult heel hard.",
                "Alle dieren horen hem.",
                "De leeuw is de koning.",
            ],
            theme: "animals",
            image: "brave-lion.png",
            audio: "brave-lion-story.mp3"
        },
        {
            title: "The Tall Giraffe",
            titleTranslation: "De Lange Giraf",
            content: [
                "The giraffe has a very long neck.",
                "She eats leaves from tall trees.",
                "She walks slowly on the grass.",
                "Baby giraffe runs beside her.",
                "They are happy together.",
            ],
            translation: [
                "De giraf heeft een heel lange nek.",
                "Ze eet bladeren van hoge bomen.",
                "Ze loopt langzaam over het gras.",
                "Baby giraf rent naast haar.",
                "Ze zijn samen blij.",
            ],
            theme: "animals",
            image: "tall-giraffe.png",
            audio: "tall-giraffe-story.mp3"
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
                "The rainbow has many colors.",
            ],
            translation: [
                "De lucht is blauw.",
                "De zon is geel.",
                "Het gras is groen.",
                "De bloemen zijn rood.",
                "De regenboog heeft veel kleuren.",
            ],
            theme: "colors",
            image: "rainbow.png",
            audio: "rainbow-story.mp3"
        },
        {
            title: "My Colorful Room",
            titleTranslation: "Mijn Kleurrijke Kamer",
            content: [
                "My walls are painted blue.",
                "My bed cover is red.",
                "My rug on the floor is green.",
                "My lamp gives off yellow light.",
                "I love my colorful room!",
            ],
            translation: [
                "Mijn muren zijn blauw geschilderd.",
                "Mijn bedsprei is rood.",
                "Mijn tapijt op de vloer is groen.",
                "Mijn lamp geeft geel licht.",
                "Ik hou van mijn kleurrijke kamer!",
            ],
            theme: "colors",
            image: "colorful-room.png",
            audio: "colorful-room-story.mp3"
        },
        {
            title: "Painting Fun",
            titleTranslation: "Plezier met Schilderen",
            content: [
                "I have a brush and paint.",
                "I mix yellow and blue.",
                "Now I have green.",
                "I paint a big tree.",
                "My painting looks beautiful!",
            ],
            translation: [
                "Ik heb een penseel en verf.",
                "Ik meng geel en blauw.",
                "Nu heb ik groen.",
                "Ik schilder een grote boom.",
                "Mijn schilderij ziet er mooi uit!",
            ],
            theme: "colors",
            image: "painting-fun.png",
            audio: "painting-fun-story.mp3"
        },
        {
            title: "A Day at the Market",
            titleTranslation: "Een Dag op de Markt",
            content: [
                "We go to the market today.",
                "I see red apples and yellow bananas.",
                "There are green vegetables too.",
                "Mom buys purple grapes.",
                "Everything looks so colorful!",
            ],
            translation: [
                "We gaan vandaag naar de markt.",
                "Ik zie rode appels en gele bananen.",
                "Er zijn ook groene groenten.",
                "Mam koopt paarse druiven.",
                "Alles ziet er zo kleurrijk uit!",
            ],
            theme: "colors",
            image: "market-day.png",
            audio: "market-story.mp3"
        },
        {
            title: "The Orange Sunset",
            titleTranslation: "De Oranje Zonsondergang",
            content: [
                "The sun goes down slowly.",
                "The sky turns orange and pink.",
                "The clouds look purple and red.",
                "Stars begin to appear.",
                "The night sky is dark blue.",
            ],
            translation: [
                "De zon gaat langzaam onder.",
                "De lucht wordt oranje en roze.",
                "De wolken zien er paars en rood uit.",
                "Sterren beginnen te verschijnen.",
                "De nachtelijke hemel is donkerblauw.",
            ],
            theme: "colors",
            image: "orange-sunset.png",
            audio: "sunset-story.mp3"
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
                "I can count to four!",
            ],
            translation: [
                "Ik zie één kat.",
                "Ik zie twee honden.",
                "Ik zie drie vogels.",
                "Ik zie vier vissen.",
                "Ik kan tot vier tellen!",
            ],
            theme: "numbers",
            image: "counting-animals.png",
            audio: "counting-story.mp3"
        },
        {
            title: "Five Little Frogs",
            titleTranslation: "Vijf Kleine Kikkers",
            content: [
                "Five little frogs sit on a log.",
                "One frog jumps into the water.",
                "Now there are four frogs.",
                "They splash and play all day.",
                "At night, all five frogs sleep.",
            ],
            translation: [
                "Vijf kleine kikkers zitten op een boomstam.",
                "Één kikker springt in het water.",
                "Nu zijn er vier kikkers.",
                "Ze plonsen en spelen de hele dag.",
                "'s Nachts slapen alle vijf de kikkers.",
            ],
            theme: "numbers",
            image: "five-frogs.png",
            audio: "five-frogs-story.mp3"
        },
        {
            title: "At the Bakery",
            titleTranslation: "Bij de Bakker",
            content: [
                "The baker bakes six rolls.",
                "She puts three rolls in a bag.",
                "Dad buys two big loaves.",
                "I pick one sweet cookie.",
                "We have ten yummy things!",
            ],
            translation: [
                "De bakker bakt zes broodjes.",
                "Ze doet drie broodjes in een zak.",
                "Pap koopt twee grote broden.",
                "Ik kies één lekker koekje.",
                "We hebben tien lekkere dingen!",
            ],
            theme: "numbers",
            image: "at-bakery.png",
            audio: "bakery-story.mp3"
        },
        {
            title: "The Number Garden",
            titleTranslation: "De Getallentuin",
            content: [
                "One big sunflower grows tall.",
                "Two butterflies land on it.",
                "Three bees are buzzing around.",
                "Four ladybugs hide in the leaves.",
                "Five ants march along the path.",
            ],
            translation: [
                "Één grote zonnebloem groeit hoog.",
                "Twee vlinders landen erop.",
                "Drie bijen zoemen eromheen.",
                "Vier lieveheersbeestjes verstoppen zich in de bladeren.",
                "Vijf mieren marcheren langs het pad.",
            ],
            theme: "numbers",
            image: "number-garden.png",
            audio: "number-garden-story.mp3"
        },
        {
            title: "Toy Box",
            titleTranslation: "De Speelgoeddoos",
            content: [
                "I open my toy box.",
                "There are seven cars inside.",
                "I count eight building blocks.",
                "I find nine little balls.",
                "I have ten toys in all!",
            ],
            translation: [
                "Ik open mijn speelgoeddoos.",
                "Er zitten zeven auto's in.",
                "Ik tel acht bouwblokken.",
                "Ik vind negen kleine balletjes.",
                "Ik heb in totaal tien speeltjes!",
            ],
            theme: "numbers",
            image: "toy-box.png",
            audio: "toy-box-story.mp3"
        },
    ],
    family: [
        {
            title: "My Family",
            titleTranslation: "Mijn Familie",
            content: [
                "I have a mom and a dad.",
                "I have a brother and a sister.",
                "We live in a cozy house.",
                "We eat dinner together.",
                "I love my family!",
            ],
            translation: [
                "Ik heb een mam en een pap.",
                "Ik heb een broer en een zus.",
                "We wonen in een gezellig huis.",
                "We eten samen aan tafel.",
                "Ik hou van mijn familie!",
            ],
            theme: "family",
            image: "happy-family.png",
            audio: "family-story.mp3"
        },
        {
            title: "Grandma's Garden",
            titleTranslation: "Oma's Tuin",
            content: [
                "Grandma has a beautiful garden.",
                "She grows tomatoes and flowers.",
                "I help her water the plants.",
                "We sit together on the bench.",
                "I love visiting grandma!",
            ],
            translation: [
                "Oma heeft een mooie tuin.",
                "Ze kweekt tomaten en bloemen.",
                "Ik help haar de planten water geven.",
                "We zitten samen op de bank.",
                "Ik vind het leuk om naar oma te gaan!",
            ],
            theme: "family",
            image: "grandmas-garden.png",
            audio: "grandmas-garden-story.mp3"
        },
        {
            title: "Grandpa's Workshop",
            titleTranslation: "Opa's Werkplaats",
            content: [
                "Grandpa has a big workshop.",
                "He builds things from wood.",
                "He made me a wooden car.",
                "I help him sort the screws.",
                "Grandpa is the best!",
            ],
            translation: [
                "Opa heeft een grote werkplaats.",
                "Hij maakt dingen van hout.",
                "Hij heeft een houten auto voor me gemaakt.",
                "Ik help hem de schroeven sorteren.",
                "Opa is de beste!",
            ],
            theme: "family",
            image: "grandpas-workshop.png",
            audio: "grandpas-workshop-story.mp3"
        },
        {
            title: "Baby's First Steps",
            titleTranslation: "Baby's Eerste Stapjes",
            content: [
                "Baby is learning to walk.",
                "She holds onto the sofa.",
                "She takes one small step.",
                "Then another step!",
                "We all clap and cheer.",
            ],
            translation: [
                "Baby leert lopen.",
                "Ze houdt zich vast aan de bank.",
                "Ze zet één klein stapje.",
                "Dan nog een stapje!",
                "We klappen allemaal en juichen.",
            ],
            theme: "family",
            image: "baby-steps.png",
            audio: "baby-steps-story.mp3"
        },
        {
            title: "A Family Picnic",
            titleTranslation: "Een Familiepicknick",
            content: [
                "Today we have a picnic in the park.",
                "Mom makes sandwiches and lemonade.",
                "Dad brings a big blanket.",
                "My sister and I play ball.",
                "It is a perfect sunny day!",
            ],
            translation: [
                "Vandaag hebben we een picknick in het park.",
                "Mam maakt broodjes en limonade.",
                "Pap brengt een grote deken.",
                "Mijn zus en ik spelen met een bal.",
                "Het is een perfecte zonnige dag!",
            ],
            theme: "family",
            image: "family-picnic.png",
            audio: "family-picnic-story.mp3"
        },
    ],
    food: [
        {
            title: "Yummy Food",
            titleTranslation: "Lekker Eten",
            content: [
                "I eat an apple for breakfast.",
                "I drink a glass of milk.",
                "For lunch I eat bread and cheese.",
                "I have pizza for dinner.",
                "Eating good food makes me strong!",
            ],
            translation: [
                "Ik eet een appel bij het ontbijt.",
                "Ik drink een glas melk.",
                "Voor de lunch eet ik brood en kaas.",
                "Ik eet pizza bij het avondeten.",
                "Goed eten maakt me sterk!",
            ],
            theme: "food",
            image: "yummy-food.png",
            audio: "food-story.mp3"
        },
        {
            title: "Baking a Cake",
            titleTranslation: "Een Taart Bakken",
            content: [
                "Mom and I bake a cake today.",
                "We mix flour, eggs, and sugar.",
                "We pour it into a pan.",
                "The oven makes it smell wonderful.",
                "We eat a slice together!",
            ],
            translation: [
                "Mam en ik bakken vandaag een taart.",
                "We mengen bloem, eieren en suiker.",
                "We gieten het in een vorm.",
                "De oven zorgt voor een heerlijke geur.",
                "We eten samen een plakje!",
            ],
            theme: "food",
            image: "baking-cake.png",
            audio: "baking-cake-story.mp3"
        },
        {
            title: "At the Fruit Market",
            titleTranslation: "Op de Fruitmarkt",
            content: [
                "We visit the fruit market.",
                "I see big red strawberries.",
                "There are yellow bananas too.",
                "Dad buys sweet watermelon.",
                "Fresh fruit is so delicious!",
            ],
            translation: [
                "We gaan naar de fruitmarkt.",
                "Ik zie grote rode aardbeien.",
                "Er zijn ook gele bananen.",
                "Pap koopt zoete watermeloen.",
                "Vers fruit is zo lekker!",
            ],
            theme: "food",
            image: "fruit-market.png",
            audio: "fruit-market-story.mp3"
        },
        {
            title: "Making Soup",
            titleTranslation: "Soep Maken",
            content: [
                "Grandma makes warm soup.",
                "She puts in carrots and potatoes.",
                "She adds a little salt.",
                "The soup bubbles on the stove.",
                "It is the best soup ever!",
            ],
            translation: [
                "Oma maakt warme soep.",
                "Ze doet wortels en aardappelen erin.",
                "Ze voegt een beetje zout toe.",
                "De soep borrelt op het fornuis.",
                "Het is de lekkerste soep ooit!",
            ],
            theme: "food",
            image: "making-soup.png",
            audio: "making-soup-story.mp3"
        },
        {
            title: "A Healthy Lunch",
            titleTranslation: "Een Gezonde Lunch",
            content: [
                "At school I open my lunchbox.",
                "I have a bread roll with cheese.",
                "I also have a crunchy carrot.",
                "Mom packed a small banana too.",
                "Eating healthy gives me energy!",
            ],
            translation: [
                "Op school open ik mijn lunchbox.",
                "Ik heb een broodje met kaas.",
                "Ik heb ook een knapperige wortel.",
                "Mam heeft ook een kleine banaan ingepakt.",
                "Gezond eten geeft me energie!",
            ],
            theme: "food",
            image: "healthy-lunch.png",
            audio: "healthy-lunch-story.mp3"
        },
    ],
    transportation: [
        {
            title: "Going Places",
            titleTranslation: "Op Reis",
            content: [
                "We go on a trip today.",
                "First we ride the bus to the station.",
                "Then we take a fast train.",
                "At the end we board a big boat.",
                "Traveling is so much fun!",
            ],
            translation: [
                "We gaan vandaag op reis.",
                "Eerst rijden we met de bus naar het station.",
                "Dan nemen we een snelle trein.",
                "Aan het einde stappen we op een grote boot.",
                "Reizen is zo leuk!",
            ],
            theme: "transportation",
            image: "going-places.png",
            audio: "transportation-story.mp3"
        },
        {
            title: "My Bike Ride",
            titleTranslation: "Mijn Fietsritje",
            content: [
                "I put on my helmet.",
                "I get on my red bike.",
                "I pedal down the street.",
                "I wave to my neighbor.",
                "Cycling is my favorite thing!",
            ],
            translation: [
                "Ik zet mijn helm op.",
                "Ik stap op mijn rode fiets.",
                "Ik trap de straat af.",
                "Ik zwaai naar mijn buurman.",
                "Fietsen is mijn lievelingsbezigheid!",
            ],
            theme: "transportation",
            image: "bike-ride.png",
            audio: "bike-ride-story.mp3"
        },
        {
            title: "The School Bus",
            titleTranslation: "De Schoolbus",
            content: [
                "The yellow school bus comes.",
                "I get on with my backpack.",
                "I sit next to my friend.",
                "We talk and laugh together.",
                "The bus arrives at school.",
            ],
            translation: [
                "De gele schoolbus komt.",
                "Ik stap in met mijn rugzak.",
                "Ik ga naast mijn vriend zitten.",
                "We praten en lachen samen.",
                "De bus arriveert op school.",
            ],
            theme: "transportation",
            image: "school-bus.png",
            audio: "school-bus-story.mp3"
        },
        {
            title: "Flying on a Plane",
            titleTranslation: "Vliegen in een Vliegtuig",
            content: [
                "We drive to the airport.",
                "Our plane is big and white.",
                "We sit in our seats.",
                "The plane goes up in the sky.",
                "I look out at the clouds below.",
            ],
            translation: [
                "We rijden naar het vliegveld.",
                "Ons vliegtuig is groot en wit.",
                "We gaan in onze stoelen zitten.",
                "Het vliegtuig gaat de lucht in.",
                "Ik kijk naar de wolken beneden.",
            ],
            theme: "transportation",
            image: "flying-plane.png",
            audio: "flying-plane-story.mp3"
        },
        {
            title: "The Fire Truck",
            titleTranslation: "De Brandweerauto",
            content: [
                "The fire truck is big and red.",
                "It drives very fast.",
                "The siren goes wee-woo!",
                "The firefighters are very brave.",
                "They help people every day.",
            ],
            translation: [
                "De brandweerauto is groot en rood.",
                "Hij rijdt heel snel.",
                "De sirene gaat wee-woe!",
                "De brandweermannen zijn heel dapper.",
                "Ze helpen elke dag mensen.",
            ],
            theme: "transportation",
            image: "fire-truck.png",
            audio: "fire-truck-story.mp3"
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
                translation: word.translation,
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
                storyContent: story.content,
                storyTranslation: story.translation,
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

    saveHighScore: (level, scoreDelta, totalDelta, streak) => {
        if (totalDelta === 0) return;

        const currentBestStreak = Math.max(get().highScores[level]?.bestStreak || 0, streak);

        const existingScore = get().highScores[level]?.score || 0;
        const existingTotal = get().highScores[level]?.total || 0;

        // Calculate new accuracy based on cumulative totals
        const newTotalQuestions = existingTotal + totalDelta;
        const newTotalScore = existingScore + scoreDelta;
        const newAccuracy = newTotalQuestions > 0 ? Math.round((newTotalScore / newTotalQuestions) * 100) : 0;

        const updatedHighScores = {
            ...get().highScores,
            [level]: {
                score: newTotalScore,
                total: newTotalQuestions,
                accuracy: newAccuracy,
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