const queryContainer = document.getElementById('query');
const blocksContainer = document.getElementById('blocks-container');
const copyButton = document.getElementById('copy-button');
const moreButton = document.getElementById('more-button');
const addBlockButton = document.getElementById('add-block-button');

let currentQuery = '';
let customBlocks = [];

const initialBlocks = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];
const allBlocks = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'AND', 'OR', 'NOT', 'NULL', 'IS', 'AS', 'CASE', 'DEFAULT', 'PRIMARY', 'FOREIGN', 'INDEX', 'UNIQUE', 'CHECK', 'EXISTS', 'LIKE', 'IN', 'BETWEEN', 'UNION', 'INTERSECT', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT INTO', 'VALUES', 'SET', 'ON', 'INTO', 'AVG', 'COUNT', '*', '(', ')', ';', ',', '=','>','<','>=','<=','.'];
const subBlocks = {
    'SELECT': ['X', 'COUNT', '*', 'AVG', 'FROM', ';'],
    'FROM': ['X', 'WHERE', 'JOIN', 'GROUP BY', 'ORDER BY', 'HAVING', ';'],
    'WHERE': ['X', 'AND', 'OR', ';', '=', 'LIKE', 'IN', 'BETWEEN'],
    'JOIN': ['X', 'ON', ';'],
    'ON': ['X', 'AND', 'OR', ';', '=', 'LIKE', 'IN', 'BETWEEN'],
    'GROUP BY': ['X', 'HAVING', ';'],
    'ORDER BY': ['X', ';'],
    'HAVING': ['X', 'AND', 'OR', ';', '=', 'LIKE', 'IN', 'BETWEEN'],
    'INSERT': ['INTO', 'VALUES', ';'],
    'UPDATE': ['SET', 'WHERE', ';'],
    'DELETE': ['FROM', 'WHERE', ';'],
    'CREATE': ['TABLE', 'INDEX', ';'],
    'ALTER': ['TABLE', ';'],
    'DROP': ['TABLE', 'INDEX', ';'],
    'X': ['(', ')', ';', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'INTO', 'VALUES', 'SET', 'TABLE', ',']
    
};

function displayBlocks(blocks) {
    blocksContainer.innerHTML = '';
    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        blockElement.textContent = block;
        blockElement.addEventListener('click', () => blockClicked(block));
        blocksContainer.appendChild(blockElement);
    });
}

function blockClicked(block) {
    if (block === ';') {
        currentQuery += block;
        queryContainer.textContent = currentQuery;
        queryContainer.style.animation = 'query-update 0.3s';
        displayBlocks(initialBlocks.concat(customBlocks));
        currentQuery = '';
    } else {
        currentQuery += ' ' + block;
        queryContainer.textContent = currentQuery;
        queryContainer.style.animation = 'query-update 0.3s';
        displayBlocks((subBlocks[block] || []).concat(customBlocks));
    }
}

function copyQuery() {
    navigator.clipboard.writeText(queryContainer.textContent).then(() => {
        alert('Query copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

moreButton.addEventListener('click', () => {
    // Sort blocks alphabetically before displaying
    const allSortedBlocks = allBlocks.concat(customBlocks).sort();
    displayBlocks(allSortedBlocks);
});

addBlockButton.addEventListener('click', () => {
    const newBlock = prompt('Enter the name of the new block:');
    if (newBlock) {
        customBlocks.push(newBlock);
        displayBlocks(initialBlocks.concat(customBlocks));
    }
});

copyButton.addEventListener('click', copyQuery);

// Initial display
displayBlocks(initialBlocks.concat(customBlocks));
