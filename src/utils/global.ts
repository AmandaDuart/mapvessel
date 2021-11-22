export const Colors = {
    white: '#ffffff',
    grey2: '#bebebe',
    grey: '#606165',
    bgColor2: '#333333',
    bgColor: '#222222',
    black: '#000000',
    black1d1: '#1d1d1d',
    orange: '#f58808',
    negative: '#ff4626',
    neutral: '#ffb843',
    positive: '#00c6b3',
    orangeGradient:
        'linear-gradient(180deg, rgba(245, 136, 8, 0.8) 0%, rgba(241, 67, 54, 0.8) 100%);',
    blackGradient: 'linear-gradient(112.8deg, #111111 -2.96%, #000000 95.88%);',
};

export const Utils = {
    randKey: (len = 6) => {
        return Math.random()
            .toFixed(len + 2)
            .slice(2);
    },
};

export const Styles = {
    shadow: {
        borderColor: 'orange.300',
        color: 'orange:300',
        boxShadow: `0px 0px 15px ${Colors.orange}`,
    },
};
