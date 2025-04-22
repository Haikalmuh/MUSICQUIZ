const questions = [
    {
        type: "text", // soal berbasis teks
        instruction: "Tebak judul lagu berdasarkan lirik berikut...",
        content: `'Cause, baby, you're a firework
                   Come on, show 'em what you're worth
                   Make 'em go, "Oh, oh, oh"
                   As you shoot across the sky`,
        options: [
            "A. Firework - Katy Perry",
            "B. Roar - Katy Perry",
            "C. Halo - Beyoncé",
            "D. Rolling in the Deep - Adele"
        ],
        answer: 0
    },
    {
        type: "audio", // soal berbasis audio
        instruction: "Dengarkan cuplikan lagu berikut dan tebak judulnya...",
        content: "assets/audio/blindingstw.mp3",
        options: [
            "A. It Will Rain - Bruno Mars",
            "B. Blinding Lights - The Weeknd",
            "C. Shape of You - Ed Sheeran",
            "D. Heartbreak Anniversary - GIVEON"
        ],
        answer: 1
    },
    {
        type: "text",
        instruction: "Tebak judul lagu berdasarkan lirik berikut...",
        content: `We gonna party like it's 3012 tonight
                 I wanna show you all the finer things in life
                 So just forget about the world, we young tonight
                 I'm coming for ya, I'm coming for ya`,
        options: [
            "A. Love The Way You Lie - Eminem ft. Rihanna",
            "B. Beauty And A Beat - Justin Bieber ft. Nicki Minaj",
            "C. The Monster - Eminem ft. Rihanna",
            "D. Diamonds - Rihanna"
        ],
        answer: 1
    },
    {
        type: "text",
        instruction: "Tebak judul lagu berdasarkan lirik berikut...",
        content: `'Cause now
You're so far away and I'm down
Feelin' like a face in the crowd
I'm reachin' for you, terrified`,
        options: [
            "A. Love The Way You Lie - Eminem ft. Rihanna",
            "B. Dangerous Woman - Ariana Grande",
            "C. Message In A Bottle - Taylor Swift",
            "D. Pink Pony Club - Chappell Roan"
        ],
        answer: 2
    },
    {
        type: "text",
        instruction: "Tebak judul lagu berdasarkan lirik berikut...",
        content: `When you try your best, but you don't succeed
When you get what you want, but not what you need
When you feel so tired, but you can't sleep
Stuck in reverse`,
        options: [
            "A. Where We Are - One Direction",
            "B. Fix You - Coldplay",
            "C. Patience - Take That",
            "D. Not Like Us - Kendrick Lamar"
        ],
        answer: 1
    },
    {
        type: "audio", // soal berbasis audio
        instruction: "Dengarkan cuplikan lagu berikut dan tebak judulnya...",
        content: "assets/audio/roarkp.mp3",
        options: [
            "A. Anti-Hero - Taylor Swift",
            "B. Firework - Katy Perry",
            "C. Hello - Adele",
            "D. Roar - Katy Perry"
        ],
        answer: 3
    },
    {
        type: "image",
        instruction: "Siapa nama penyanyi di gambar ini?",
        content: "assets/images/TaylorSwift.jpg",
        answers: ["Taylor Swift", "taylor swift", "Taylor Alison Swift", "TaylorSwift", "Taylor swift"]
    },
    {
        type: "image",
        instruction: "Siapa nama penyanyi di gambar ini?",
        content: "assets/images/ShawnMendes.jpg",
        options: [
            "A. Henry Moodie",
            "B. Harry Styles",
            "C. Shawn Mendes",
            "D. Niall Horan"
        ],
        answer: 2
    },
    {
        type: "arrange",
        instruction: "Urutkan potongan lirik dari lagu *Nobody Gets Me - SZA* di bawah ini dengan tepat:",
        content: ["what's left of you", "It's too late", "get to kickin' in", "I don't wanna lose"],
        answer: ["get to kickin' in", "It's too late", "I don't wanna lose", "what's left of you"]
    },
    {
        type: "image",
        instruction: "Tebak judul lagu dari Cover dibawah ini!",
        content: "assets/images/smmrniki.jpeg",
        options: [
            "A. Lover - Taylor Swift",
            "B. Every Summertime - NIKI",
            "C. Kiss It Better - Rihanna",
            "D. Something Just Like This - Coldplay"
        ],
        answer: 1
    },
    {
        type: "audio", // soal berbasis audio
        instruction: "Dengarkan cuplikan lagu berikut dan tebak judulnya...",
        content: "assets/audio/snstz.mp3",
        options: [
            "A. Cry - Cigarettes After S*x",
            "B. Apocalypse - Cigarettes After S*x",
            "C. Let Her Go - Passenger",
            "D. Sunsetz - Cigarettes After S*x"
        ],
        answer: 3
    },
    {
        type: "text",
        instruction: "Tebak judul lagu berdasarkan lirik berikut...",
        content: `'Cause we're young, and we're reckless
We'll take this way too far
It'll leave you breathless, mm
Or with a nasty scar
Got a long list of ex-lovers`,
        options: [
            "A. Reckless - Madison Beer",
            "B. A Year Ago - James Arthur",
            "C. Rude - MAGIC!",
            "D. Blank Space - Taylor Swift"
        ],
        answer: 3
    },
    {
        type: "image",
        instruction: "Tebak nama album dari Cover dibawah ini!",
        content: "assets/images/eternal.jpeg",
        options: [
            "A. eternal sunshine - Ariana Grande",
            "B. Midnights - Taylor Swift",
            "C. eternal sunshine deluxe: brighter days ahead - Ariana Grande",
            "D. HIT ME HARD AND SOFT - Billie Eilish"
        ],
        answer: 2
    },
    {
        type: "image",
        instruction: "Siapa nama penyanyi di gambar ini?",
        content: "assets/images/50cnt.jpeg",
        options: [
            "A. 50 Cent",
            "B. Akon",
            "C. Pharrell Williams",
            "D. Kendrick Lamar"
        ],
        answer: 0
    },
    {
        type: "arrange",
        instruction: "Urutkan potongan lirik dari lagu *Sailor Song - Gigi Perez* di bawah ini dengan tepat:",
        content: ["to me", "do the things", "you'd do to me,", "you said"],
        answer: ["do the things", "you said", "you'd do to me,", "to me"]
    },
    {
        type: "image",
        instruction: "Siapa nama penyanyi di gambar ini?",
        content: "assets/images/lanaa.jpeg",
        answers: ["Lana Del Rey", "lana del rey", "LanaDelRey"]
    },
    {
        type: "truefalse",
        instruction: "Baca penjelasan berikut dan pilih apakah pernyataan ini benar atau salah.",
        content: "One Direction dibentuk pada ajang pencarian bakat The X Factor UK tahun 2010.",
        answer: 0, // 0 untuk 'Benar', 1 untuk 'Salah'
        fact: "One Direction dibentuk pada ajang pencarian bakat The X Factor UK tahun 2010."
    },
    {
        type: "truefalse",
        instruction: "Baca penjelasan berikut dan pilih apakah pernyataan ini benar atau salah.",
        content: "Album pertama Taylor Swift adalah Fearless, yang dirilis pada 11 November 2008.",
        answer: 1, // 0 untuk 'Benar', 1 untuk 'Salah'
        fact: "Album pertama Taylor adalah Tayor Swift, yang dirilis pada 24 Oktober 2006."
    },
    {
        type: "image",
        instruction: "Tebak nama salah satu album Billie Eilish dari Cover dibawah ini!",
        content: "assets/images/hitmehard.jpeg",
        options: [
            "A. Happier Than Ever",
            "B. HIT ME HARD AND SOFT",
            "C. WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?",
            "D. dont smile at me"
        ],
        answer: 1
    },
    {
        type: "truefalse",
        instruction: "Baca penjelasan berikut dan pilih apakah pernyataan ini benar atau salah.",
        content: "One Direction tidak pernah menggelar konser di Indonesia.",
        answer: 1, // 0 untuk 'Benar', 1 untuk 'Salah'
        fact: "One Direction pernah menggelar konser di Jakarta pada 25 Maret 2015 di Stadion Utama Gelora Bung Karno (GBK). Konser ini merupakan bagian dari tur Asia On The Road Again. "
    },


];
