document.getElementById('addQuestion').addEventListener('click', addQuestion);
document.getElementById('createQuizForm').addEventListener('submit', createQuiz);

let questionCount = 0;

function addQuestion() {
    questionCount++;

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.id = `question-${questionCount}`;

    questionDiv.innerHTML = `
        <label for="question-${questionCount}">Question ${questionCount}:</label>
        <input type="text" id="question-${questionCount}-text" required>

        <label for="question-${questionCount}-type">Type:</label>
        <select id="question-${questionCount}-type" onchange="handleQuestionTypeChange(${questionCount})" required>
            <option value="multiple">Multiple Choice</option>
            <option value="truefalse">True/False</option>
            <option value="short">Short Answer</option>
            <option value="multipleanswer">Multiple Options with Multiple Answers</option>
        </select>

        <div id="question-${questionCount}-options"></div>

        <label for="question-${questionCount}-difficulty">Difficulty:</label>
        <select id="question-${questionCount}-difficulty" required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>

        <button type="button" class="removeQuestion" onclick="removeQuestion(${questionCount})">Remove</button>
    `;

    document.getElementById('questionList').appendChild(questionDiv);
}

function handleQuestionTypeChange(questionId) {
    const questionType = document.getElementById(`question-${questionId}-type`).value;
    const optionsDiv = document.getElementById(`question-${questionId}-options`);
    optionsDiv.innerHTML = ''; // Clear previous options

    if (questionType === 'multiple') {
        optionsDiv.innerHTML = generateMultipleChoiceOptions(questionId, 'radio');
    } else if (questionType === 'truefalse') {
        optionsDiv.innerHTML = `
            <div class="option-item">
                <input type="radio" name="question-${questionId}-answer" id="question-${questionId}-true" value="true">
                <label for="question-${questionId}-true">True</label>
            </div>
            <div class="option-item">
                <input type="radio" name="question-${questionId}-answer" id="question-${questionId}-false" value="false">
                <label for="question-${questionId}-false">False</label>
            </div>
        `;
    } else if (questionType === 'short') {
        optionsDiv.innerHTML = `<textarea id="question-${questionId}-answer" rows="2" placeholder="Enter the short answer"></textarea>`;
    } else if (questionType === 'multipleanswer') {
        optionsDiv.innerHTML = generateMultipleChoiceOptions(questionId, 'checkbox'); // For multiple answers
    }
}

function generateMultipleChoiceOptions(questionId, inputType) {
    return `
        <div class="option-item">
            <input type="${inputType}" name="question-${questionId}-answer" id="question-${questionId}-option1" value="option1">
            <input type="text" id="question-${questionId}-option1-text" placeholder="Option 1">
        </div>
        <div class="option-item">
            <input type="${inputType}" name="question-${questionId}-answer" id="question-${questionId}-option2" value="option2">
            <input type="text" id="question-${questionId}-option2-text" placeholder="Option 2">
        </div>
        <div class="option-item">
            <input type="${inputType}" name="question-${questionId}-answer" id="question-${questionId}-option3" value="option3">
            <input type="text" id="question-${questionId}-option3-text" placeholder="Option 3">
        </div>
        <div class="option-item">
            <input type="${inputType}" name="question-${questionId}-answer" id="question-${questionId}-option4" value="option4">
            <input type="text" id="question-${questionId}-option4-text" placeholder="Option 4">
        </div>
    `;
}

function changeQuestionType(id) {
    const questionType = document.getElementById(`question-${id}-type`).value;
    const optionsDiv = document.getElementById(`question-${id}-options`);

    if (questionType === 'multiple') {
        optionsDiv.innerHTML = `
            <label>Options:</label>
            <div class="option-item">
                <input type="radio" name="question-${id}-options" value="option1" required>
                <input type="text" id="question-${id}-option1" placeholder="Option 1" required>
            </div>
            <div class="option-item">
                <input type="radio" name="question-${id}-options" value="option2" required>
                <input type="text" id="question-${id}-option2" placeholder="Option 2" required>
            </div>
            <div class="option-item">
                <input type="radio" name="question-${id}-options" value="option3" required>
                <input type="text" id="question-${id}-option3" placeholder="Option 3" required>
            </div>
            <div class="option-item">
                <input type="radio" name="question-${id}-options" value="option4" required>
                <input type="text" id="question-${id}-option4" placeholder="Option 4" required>
            </div>
        `;
    } else if (questionType === 'truefalse') {
        optionsDiv.innerHTML = `
            <label>Options:</label>
            <div class="option-item">
                <input type="radio" name="question-${id}-truefalse" value="true" required> True
            </div>
            <div class="option-item">
                <input type="radio" name="question-${id}-truefalse" value="false" required> False
            </div>
        `;
    } else if (questionType === 'short') {
        optionsDiv.innerHTML = `
            <label>Answer:</label>
            <input type="text" id="question-${id}-short-answer" placeholder="Enter short answer here" required>
        `;
    }
}

function removeQuestion(id) {
    const questionDiv = document.getElementById(`question-${id}`);
    questionDiv.remove();
    updateQuestionNumbers(); // Update numbering after removing a question
}

function updateQuestionNumbers() {
    const questions = document.querySelectorAll('#questionList .question');
    questions.forEach((question, index) => {
        const questionLabel = question.querySelector('label');
        questionLabel.textContent = `Question ${index + 1}:`;
    });
    questionCount = questions.length; // Keep question count accurate
}

function createQuiz(event) {
    event.preventDefault();

    const quizName = document.getElementById('quizName').value;
    const quizDescription = document.getElementById('quizDescription').value;
    const quizMode = document.getElementById('quizMode').value;

    const questions = [];
    const questionElements = document.querySelectorAll('#questionList .question');
    questionElements.forEach((question, index) => {
        const questionText = document.getElementById(`question-${index + 1}-text`).value;
        const questionType = document.getElementById(`question-${index + 1}-type`).value;
        const questionDifficulty = document.getElementById(`question-${index + 1}-difficulty`).value;

        let options = [];
        if (questionType === 'multiple') {
            options.push(document.getElementById(`question-${index + 1}-option1`).value);
            options.push(document.getElementById(`question-${index + 1}-option2`).value);
            options.push(document.getElementById(`question-${index + 1}-option3`).value);
            options.push(document.getElementById(`question-${index + 1}-option4`).value);
        } else if (questionType === 'truefalse') {
            options.push(document.querySelector(`input[name="question-${index + 1}-truefalse"]:checked`).value);
        } else if (questionType === 'short') {
            options.push(document.getElementById(`question-${index + 1}-short-answer`).value);
        }

        questions.push({
            text: questionText,
            type: questionType,
            difficulty: questionDifficulty,
            options: options
        });
    });

    const quizData = {
        quizName,
        quizDescription,
        quizMode,
        questions
    };

    console.log('Quiz Created:', quizData);
}
