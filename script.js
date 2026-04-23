// Nameデータ（属性1と属性2）
const nameData = {
    "Adri": { attr1: 4.3, attr2: 3.9 },
    "Alicia": { attr1: 3.3, attr2: 3.6 },
    "Antonio": { attr1: 2.9, attr2: 3.4 },
    "Aron": { attr1: 2.2, attr2: 2.6 },
    "Ashton": { attr1: 2.4, attr2: 2.8 },
    "Bony": { attr1: 3.9, attr2: 3.0 },
    "Bradley": { attr1: 2.9, attr2: 4.4 },
    "Costa": { attr1: 1.3, attr2: 3.2 },
    "Declan": { attr1: 3.1, attr2: 2.8 },
    "Eder": { attr1: 3.1, attr2: 3.0 },
    "Eliot": { attr1: 2.9, attr2: 2.1 },
    "Emma": { attr1: 4.8, attr2: 3.2 },
    "Fede": { attr1: 3.0, attr2: 3.1 },
    "Flynn": { attr1: 3.3, attr2: 2.3 },
    "Frenkie": { attr1: 4.2, attr2: 2.8 },
    "Gavi": { attr1: 3.8, attr2: 2.8 },
    "Grayson": { attr1: 2.9, attr2: 2.3 },
    "Griffin": { attr1: 3.0, attr2: 2.5 },
    "Hayden": { attr1: 2.8, attr2: 2.8 },
    "Hazard": { attr1: 3.0, attr2: 3.7 },
    "Holis": { attr1: 2.9, attr2: 2.9 },
    "Hunter": { attr1: 2.9, attr2: 2.4 },
    "Hurricane": { attr1: 3.5, attr2: 2.9 },
    "Jacob17": { attr1: 4.2, attr2: 3.6 },
    "Jerry": { attr1: 3.7, attr2: 3.2 },
    "Kate": { attr1: 3.6, attr2: 3.2 },
    "Kevin": { attr1: 2.9, attr2: 4.3 },
    "Kros": { attr1: 2.2, attr2: 3.2 },
    "Lotta": { attr1: 3.4, attr2: 3.9 },
    "Lucas": { attr1: 4.2, attr2: 3.0 },
    "Luis": { attr1: 2.9, attr2: 3.6 },
    "Milo": { attr1: 2.6, attr2: 2.2 },
    "Naty": { attr1: 2.8, attr2: 2.5 },
    "Niskanen15": { attr1: 3.1, attr2: 3.1 },
    "Pedri": { attr1: 3.6, attr2: 3.1 },
    "PinkElephant": { attr1: 3.8, attr2: 2.6 },
    "Ronin": { attr1: 3.2, attr2: 2.2 },
    "Sheerpy": { attr1: 4.2, attr2: 3.6 },
    "Spider": { attr1: 2.4, attr2: 2.3 },
    "Spike": { attr1: 2.9, attr2: 3.8 },
    "Tanner": { attr1: 2.3, attr2: 2.8 },
    "Titan": { attr1: 2.9, attr2: 2.5 },
    "Venom": { attr1: 2.1, attr2: 3.1 }
};

// 全てのName一覧
const allNames = Object.keys(nameData);

// DOM要素の取得
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const compareValueInput = document.getElementById('compareValue');
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const resultSection = document.getElementById('result');
const predictionValueSpan = document.getElementById('predictionValue');
const judgmentResultSpan = document.getElementById('judgmentResult');
const errorDiv = document.getElementById('error');
const name1Suggestions = document.getElementById('name1-suggestions');
const name2Suggestions = document.getElementById('name2-suggestions');

// 現在選択されているサジェスションのインデックス
let selectedSuggestionIndex = {
    name1: -1,
    name2: -1
};

// オートコンプリート機能
function setupAutocomplete(inputElement, suggestionsElement, fieldName) {
    inputElement.addEventListener('input', function() {
        const value = this.value.trim();
        selectedSuggestionIndex[fieldName] = -1;
        
        if (value.length === 0) {
            suggestionsElement.classList.remove('active');
            suggestionsElement.innerHTML = '';
            return;
        }

        // 入力値に一致するNameを検索（先頭一致、大文字小文字を区別しない）
        const matches = allNames.filter(name =>
            name.toLowerCase().startsWith(value.toLowerCase())
        );

        if (matches.length === 0) {
            suggestionsElement.classList.remove('active');
            suggestionsElement.innerHTML = '';
            return;
        }

        // サジェスションを表示
        suggestionsElement.innerHTML = matches.map(name => 
            `<div class="suggestion-item" data-name="${name}">${name}</div>`
        ).join('');
        suggestionsElement.classList.add('active');

        // サジェスションアイテムのクリックイベント
        suggestionsElement.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                inputElement.value = this.dataset.name;
                suggestionsElement.classList.remove('active');
                suggestionsElement.innerHTML = '';
            });
        });
    });

    // キーボードナビゲーション
    inputElement.addEventListener('keydown', function(e) {
        const items = suggestionsElement.querySelectorAll('.suggestion-item');
        
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedSuggestionIndex[fieldName] = Math.min(
                selectedSuggestionIndex[fieldName] + 1,
                items.length - 1
            );
            updateSelectedSuggestion(items, selectedSuggestionIndex[fieldName]);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedSuggestionIndex[fieldName] = Math.max(
                selectedSuggestionIndex[fieldName] - 1,
                0
            );
            updateSelectedSuggestion(items, selectedSuggestionIndex[fieldName]);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedSuggestionIndex[fieldName] >= 0) {
                inputElement.value = items[selectedSuggestionIndex[fieldName]].dataset.name;
                suggestionsElement.classList.remove('active');
                suggestionsElement.innerHTML = '';
            }
        } else if (e.key === 'Escape') {
            suggestionsElement.classList.remove('active');
            suggestionsElement.innerHTML = '';
        }
    });

    // フォーカスが外れたときにサジェスションを閉じる
    inputElement.addEventListener('blur', function() {
        setTimeout(() => {
            suggestionsElement.classList.remove('active');
            suggestionsElement.innerHTML = '';
        }, 200);
    });
}

function updateSelectedSuggestion(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
            item.scrollIntoView({ block: 'nearest' });
        } else {
            item.classList.remove('selected');
        }
    });
}

// オートコンプリートの設定
setupAutocomplete(name1Input, name1Suggestions, 'name1');
setupAutocomplete(name2Input, name2Suggestions, 'name2');

// 予想結果の計算
function calculatePrediction(name1, name2) {
    const data1 = nameData[name1];
    const data2 = nameData[name2];

    // 計算式: {(Name1の属性1+Name2の属性2)/4+(Name2の属性1+Name1の属性2)/4}+{(Name1の属性1*Name2の属性2/6.4)+(Name2の属性1*Name1の属性2/6.4)}
    const part1 = (data1.attr1 + data2.attr2) / 4 + (data2.attr1 + data1.attr2) / 4;
    const part2 = (data1.attr1 * data2.attr2 / 6.4) + (data2.attr1 * data1.attr2 / 6.4);
    
    return part1 + part2;
}

// 判定ロジック
function determineJudgment(prediction, compareValue) {
    const diff = prediction - compareValue;

    if (diff > 1.5) return { text: 'Over6', type: 'over' };
    if (diff > 1.0) return { text: 'Over5', type: 'over' };
    if (diff > 0.75) return { text: 'Over4', type: 'over' };
    if (diff > 0.5) return { text: 'Over3', type: 'over' };
    if (diff > 0.25) return { text: 'Over2', type: 'over' };
    if (diff > 0) return { text: 'Over1', type: 'over' };
    
    if (diff < -1.5) return { text: 'Under6', type: 'under' };
    if (diff < -1.0) return { text: 'Under5', type: 'under' };
    if (diff < -0.75) return { text: 'Under4', type: 'under' };
    if (diff < -0.5) return { text: 'Under3', type: 'under' };
    if (diff < -0.25) return { text: 'Under2', type: 'under' };
    if (diff < 0) return { text: 'Under1', type: 'under' };
    
    return { text: 'even', type: 'even' };
}

// エラー表示
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    resultSection.classList.add('hidden');
}

// エラーをクリア
function clearError() {
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
}

// 結果を表示
function showResult(prediction, judgment) {
    clearError();
    
    predictionValueSpan.textContent = prediction.toFixed(2);
    judgmentResultSpan.textContent = judgment.text;
    
    // 判定タイプに応じてクラスを設定
    judgmentResultSpan.className = `judgment-result ${judgment.type}`;
    
    resultSection.classList.remove('hidden');
}

// 計算ボタンのクリックイベント
calculateBtn.addEventListener('click', function() {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();
    const compareValue = parseFloat(compareValueInput.value);

    // バリデーション
    if (!name1 || !name2) {
        showError('Name1とName2を入力してください。');
        return;
    }

    if (!nameData[name1]) {
        showError(`"${name1}" は登録されていません。正しい名前を入力してください。`);
        return;
    }

    if (!nameData[name2]) {
        showError(`"${name2}" は登録されていません。正しい名前を入力してください。`);
        return;
    }

    if (isNaN(compareValue)) {
        showError('比較対象数値を入力してください。');
        return;
    }

    // 計算実行
    const prediction = calculatePrediction(name1, name2);
    const judgment = determineJudgment(prediction, compareValue);

    // 結果表示
    showResult(prediction, judgment);
});

// クリアボタンのクリックイベント
clearBtn.addEventListener('click', function() {
    // すべての入力フィールドをクリア
    name1Input.value = '';
    name2Input.value = '';
    compareValueInput.value = '';
    
    // サジェスションをクリア
    name1Suggestions.classList.remove('active');
    name1Suggestions.innerHTML = '';
    name2Suggestions.classList.remove('active');
    name2Suggestions.innerHTML = '';
    
    // 結果とエラーを非表示
    resultSection.classList.add('hidden');
    clearError();
    
    // 最初の入力フィールドにフォーカス
    name1Input.focus();
});

// Enterキーで計算を実行
[name1Input, name2Input, compareValueInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBtn.click();
        }
    });
});

// Made with Bob
