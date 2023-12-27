const FONT_EN = {
    ' ': { width: 4 },
    '0': { pos: { x: 0, y: 0 }, width: 5 },
    '1': { pos: { x: 1, y: 0 }, width: 4 },
    '2': { pos: { x: 2, y: 0 }, width: 5 },
    '3': { pos: { x: 3, y: 0 }, width: 5 },
    '4': { pos: { x: 4, y: 0 }, width: 5 },
    '5': { pos: { x: 5, y: 0 }, width: 5 },
    '6': { pos: { x: 6, y: 0 }, width: 5 },
    '7': { pos: { x: 7, y: 0 }, width: 5 },
    '8': { pos: { x: 8, y: 0 }, width: 5 },
    '9': { pos: { x: 9, y: 0 }, width: 5 },
    'a': { pos: { x: 0, y: 1 }, width: 5 },
    'b': { pos: { x: 1, y: 1 }, width: 5 },
    'c': { pos: { x: 2, y: 1 }, width: 5 },
    'd': { pos: { x: 3, y: 1 }, width: 5 },
    'e': { pos: { x: 4, y: 1 }, width: 5 },
    'f': { pos: { x: 5, y: 1 }, width: 5 },
    'g': { pos: { x: 6, y: 1 }, width: 5 },
    'h': { pos: { x: 7, y: 1 }, width: 5 },
    'i': { pos: { x: 8, y: 1 }, width: 2 },
    'j': { pos: { x: 9, y: 1 }, width: 4 },
    'k': { pos: { x: 0, y: 2 }, width: 5 },
    'l': { pos: { x: 1, y: 2 }, width: 4 },
    'm': { pos: { x: 2, y: 2 }, width: 5 },
    'n': { pos: { x: 3, y: 2 }, width: 5 },
    'o': { pos: { x: 4, y: 2 }, width: 5 },
    'p': { pos: { x: 5, y: 2 }, width: 5 },
    'q': { pos: { x: 6, y: 2 }, width: 5 },
    'r': { pos: { x: 7, y: 2 }, width: 5 },
    's': { pos: { x: 8, y: 2 }, width: 5 },
    't': { pos: { x: 9, y: 2 }, width: 4 },
    'u': { pos: { x: 0, y: 3 }, width: 5 },
    'v': { pos: { x: 1, y: 3 }, width: 5 },
    'w': { pos: { x: 2, y: 3 }, width: 5 },
    'x': { pos: { x: 3, y: 3 }, width: 5 },
    'y': { pos: { x: 4, y: 3 }, width: 4 },
    'z': { pos: { x: 5, y: 3 }, width: 5 },
    '!': { pos: { x: 6, y: 3 }, width: 3 },
    '?': { pos: { x: 7, y: 3 }, width: 5 },
    '.': { pos: { x: 8, y: 3 }, width: 5 },
    ':': { pos: { x: 9, y: 3 }, width: 5 },
    '/': { pos: { x: 0, y: 4 }, width: 5 },
    '+': { pos: { x: 1, y: 4 }, width: 5 },
    '-': { pos: { x: 2, y: 4 }, width: 5 },
    '_': { pos: { x: 3, y: 4 }, width: 5 },
    '%': { pos: { x: 4, y: 4 }, width: 5 },
    '#': { pos: { x: 5, y: 4 }, width: 5 },
    '[': { pos: { x: 6, y: 4 }, width: 5 },
    ']': { pos: { x: 7, y: 4 }, width: 5 },
    '(': { pos: { x: 8, y: 4 }, width: 5 },
    ')': { pos: { x: 9, y: 4 }, width: 5 },
    'ñ': { pos: { x: 0, y: 5 }, width: 5 },
    'é': { pos: { x: 1, y: 5 }, width: 5 },
    'ó': { pos: { x: 2, y: 5 }, width: 5 },
    'ú': { pos: { x: 3, y: 5 }, width: 5 },
    'í': { pos: { x: 4, y: 5 }, width: 3 },
    'á': { pos: { x: 5, y: 5 }, width: 5 },
    '¡': { pos: { x: 6, y: 5 }, width: 3 },
    '¿': { pos: { x: 7, y: 5 }, width: 5 }
}

const FONT_JP = [
    'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみ',
    'むめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶ',
    'べぼぱぴぷぺぽぁぃぅぇぉっゃゅょアイウエオカキクケコサシスセソタ',
    'チツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギ',
    'グゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュョ',
    'ヴ「」『』、。！？：ー／〜％・（）at.+1234567890'
];

class TextElem {

    constructor(chars, textAlign, lang='en') {
        this.lang = lang;
        this.chars = chars;
        this.width = this.lang === 'jp' ? 8 * chars.length : chars.reduce((prev, curr) => prev + FONT_EN[curr].width + 1, 0);
        this.textAlign = textAlign;
    }

    draw = (game, cx, pos) => {
        cx.save();
        cx.translate(pos.x, pos.y);

        if (this.textAlign === 'center') cx.translate(-Math.ceil(this.width * .5), 0);
        if (this.textAlign === 'right') cx.translate(-this.width , 0);
    
        const font = game.assets.images[`font_${this.lang === 'jp' ? 'jp' : 'en'}`];
        if (this.lang === 'jp') {
            this.chars.forEach(char => {
                if (char === ' ') cx.translate(8, 0);
                else {
                    const y = FONT_JP.findIndex(a => a.includes(char));
                    const x = FONT_JP[y].indexOf(char);
                    cx.drawImage(font, x * 8, y * 8, 8, 8, 0, 0, 8, 8);
                    cx.translate(8, 0);
                }
            });
        } else {
            this.chars.forEach(char => {
                if (char === ' ') cx.translate(FONT_EN[char].width, 0);
                else {
                    const { pos, width } = FONT_EN[char];
                    cx.drawImage(font, pos.x * 6, pos.y * 6, 7, 6, 0, 0, 7, 6);
                    cx.translate(width + 1, 0);
                }
            });
        }    
        
        cx.restore();
    }
}

export { TextElem };
