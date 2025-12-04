const getElement = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

const triviaPool = [
  {
    id: "q1",
    question:
      "What is the main hub area that Melinoë returns to between runs called?",
    options: {
      a: "The House of Hades",
      b: "The Crossroads",
      c: "The Underworld Gate",
      d: "The Nexus",
    },
    correct: "b",
  },
  {
    id: "q2",
    question: "Who trains Melinoë in witchcraft and combat at the Crossroads?",
    options: {
      a: "Nyx",
      b: "Hecate",
      c: "Persephone",
      d: "Hera",
    },
    correct: "b",
  },
  {
    id: "q3",
    question: "What are the Arcana Cards in Hades II mainly used for?",
    options: {
      a: "Unlocking new cosmetic weapon skins only",
      b: "Permanent meta-progression upgrades",
      c: "Changing the game’s difficulty settings",
      d: "Summoning bosses instantly",
    },
    correct: "b",
  },
  {
    id: "q4",
    question: "Which resource is primarily spent to unlock new Arcana Cards?",
    options: {
      a: "Bones",
      b: "Ashes",
      c: "Nectar",
      d: "Darkness",
    },
    correct: "b",
  },
  {
    id: "q5",
    question: "What is the collective name for Melinoës weapons in Hades II?",
    options: {
      a: "Olympian Relics",
      b: "Nocturnal Arms",
      c: "Stygian Tools",
      d: "Blades of Fate",
    },
    correct: "b",
  },
  {
    id: "q6",
    question: "Which of the following is NOT one of the Nocturnal Arms?",
    options: {
      a: "Witch's Staff",
      b: "Sister Blades",
      c: "Argent Skull",
      d: "Shield of Chaos",
    },
    correct: "d",
  },
  {
    id: "q7",
    question: "Where can you access Incantations?",
    options: {
      a: "In the Olympian shrine in each region",
      b: "From a menu in the pause screen",
      c: "At the cauldron in the Crossroads",
      d: "Only at the end of a successful run",
    },
    correct: "c",
  },
  {
    id: "q8",
    question: "What do Incantations generally do for the player?",
    options: {
      a: "Temporarily change the game into turn-based combat",
      b: "Unlock new systems, NPCs, and upgrades",
      c: "Delete all your current resources",
      d: "Only change the colour of spell effects",
    },
    correct: "b",
  },
  {
    id: "q9",
    question:
      "What is the name of the skill-tree-like altar where you equip Arcana Cards?",
    options: {
      a: "Altar of Ashes",
      b: "Mirror of Night",
      c: "Pool of Styx",
      d: "Fated Ledger",
    },
    correct: "a",
  },
  {
    id: "q10",
    question: "Which description best fits the Nocturnal Arms as a group?",
    options: {
      a: "One-use consumable items",
      b: "Weapons with unique playstyles and hammer upgrades",
      c: "Cosmetic companions that follow you",
      d: "Random boons from the gods",
    },
    correct: "b",
  },
  {
    id: "q11",
    question:
      "Which deity's boons in Hades II focus on lightning damage and the Blitz status curse?",
    options: {
      a: "Zeus",
      b: "Poseidon",
      c: "Aphrodite",
      d: "Dionysus",
    },
    correct: "a",
  },
  {
    id: "q12",
    question:
      "Who offers powerful Hexes that act like Hades II's version of Calls from the first game?",
    options: {
      a: "Nyx",
      b: "Selene",
      c: "Hera",
      d: "Demeter",
    },
    correct: "b",
  },
  {
    id: "q13",
    question: "Which of these is a core reason runs feel different every time?",
    options: {
      a: "The game deletes bosses you've already beaten",
      b: "Randomized rooms, boons, and weapon upgrades",
      c: "You must switch to a new weapon every run",
      d: "The controls change each time",
    },
    correct: "b",
  },
  {
    id: "q14",
    question: "What are “Gathering Tools” mainly used for?",
    options: {
      a: "Fishing in the River Styx",
      b: "Digging up seeds and reagents during runs",
      c: "Opening Chaos Gates without health loss",
      d: "Summoning a temporary companion",
    },
    correct: "b",
  },
  {
    id: "q15",
    question:
      "Why might a player care about resources like Cinder, Pearl, and Tears?",
    options: {
      a: "They are only used to buy food in the Taverna",
      b: "They are spent to unlock and upgrade weapon aspects and Arcana",
      c: "They are required to start a new save file",
      d: "They increase difficulty automatically when collected",
    },
    correct: "b",
  },
];

let thisRound = [];
let index = 0;
let score = 0;
let bestScore = 0;

const totalQuestionsThisRun = 10
let isRoundOver = false

const questionCounter = getElement("#questionCounter")
const triviaScore = getElement("#triviaScore")
const best = getElement("#triviaBest")

const questionText = getElement("#activeQuestionText")
const message = getElement("#triviaMessage")

const optionText = {
  a: getElement("#optionAText"),
  b: getElement("#optionBText"),
  c: getElement("#optionCText"),
  d: getElement("#optionDText"),
}

  const triviaForm = getElement("#triviaForm")
  const answerOptions = getElement("#answerOptions")

  const answerInputs = Array.from(
    answerOptions.querySelectorAll('input[name="answer"]')
  )

  const clearSelection = () => {
    answerInputs.forEach((input) => {
      input.checked = false
    })
  }

  const getSelectedAnswer = () => {
    const selected = answerInputs.find((input) => input.checked)
    return selected ? selected.value : null
  }

  const updateDisplay = () => {
    if (thisRound.length > 0 && !isRoundOver && index < thisRound.length){
      questionCounter.textContent = `Question ${index + 1}/${thisRound.length}`
    }
    triviaScore.textContent = `Score: ${score}`
    best.textContent = bestScore > 0 ? `Best Run: ${bestScore} / ${totalQuestionsThisRun}` : `Best Run: — / ${totalQuestionsThisRun}`
  }
  
  const buildNewRound = () => {
    const poolCopy = [...triviaPool]
    const round = []
    const limit = Math.min(totalQuestionsThisRun, poolCopy.length)
  
    for (let i = 0; i < limit; i++) {
      const randomIndex = Math.floor(Math.random() * poolCopy.length)
      round.push(poolCopy[randomIndex])
      poolCopy.splice(randomIndex, 1)
    }
  
    return round
  }

  const showQuestion = () => {
    const current = thisRound[index]
    if (!current) return
    questionText.textContent = current.question
    optionText.a.textContent = current.options.a
    optionText.b.textContent = current.options.b
    optionText.c.textContent = current.options.c
    optionText.d.textContent = current.options.d
    message.textContent = "Select an answer and lock it in."
    clearSelection()
    updateDisplay()
  }

  const startRun = () => {
    thisRound = buildNewRound()
    index = 0
    score = 0
    isRoundOver = false
    showQuestion()
  }

  const finishRun = () => {
    isRoundOver = true
    if (score > bestScore) {
      bestScore = score
    }
    questionText.innerHTML = `
      You scored <strong>${score}</strong> out of <strong>${thisRound.length}</strong>.
    `
    message.textContent = 'Press "Lock In Answer" to start a new run.'
    updateDisplay()
  }

  triviaForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (thisRound.length === 0 || isRoundOver) {
      startRun();
      return;
    }

    const current = thisRound[index]
    const selectedValue = getSelectedAnswer()

    if (!selectedValue) {
      message.textContent = "Please choose an answer before submitting."
      return
    }

    if (selectedValue === current.correct) {
      score += 1
      message.textContent = "Correct!"
    } else {
      const correctText = current.options[current.correct]
      message.textContent = `Incorrect. The correct answer was: ${correctText}`
    }

    index += 1

    if (index < thisRound.length) {
      showQuestion()
    } else {
      finishRun()
    }
  })

const startLink = getElement("#startTriviaLink")
  if (startLink) {
  startLink.addEventListener("click", () => {
    if (thisRound.length === 0 || isRoundOver) {
      startRun()
    }
  })
}

  const customQuestion = getElement("#customQuestion")
  const customA = getElement("#customA")
  const customB = getElement("#customB")
  const customC = getElement("#customC")
  const customD = getElement("#customD")
  const customCorrect = getElement("#customCorrect")
  const customForm = getElement("#customQuestionForm")

  customForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const text = customQuestion.value.trim()
    const a = customA.value.trim()
    const b = customB.value.trim()
    const c = customC.value.trim()
    const d = customD.value.trim()
    const correct = customCorrect.value

    if (!text || !a || !b || !c || !d || !correct) {
      message.textContent = "Fill in all fields and choose which option is correct."
      return
    }

    const uniqueAnswers = new Set(answers)
    if (uniqueAnswers.size < answers.length) {
    message.textContent = "Each answer choice must be different."
    return
   }

    const newQuestion = {
      id: `custom-${Date.now()}`,
      question: text,
      options: { a, b, c, d },
      correct: correct,
    }
    triviaPool.push(newQuestion)
    message.textContent = "Custom question saved! It may appear in future runs."
    customForm.reset()
  })
  updateDisplay()
})
