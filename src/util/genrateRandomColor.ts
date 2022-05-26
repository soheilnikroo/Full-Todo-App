// colors
const COLORS = {
  PURPLE: '#110976',
  BULISH: '#00A0FF',
  ORANGE: '#FF744C',
  GREEN: '#66BAA7',
  YELLOW: '#FEE440',
};

const randomTaskColor = (): string => {
  const keys = Object.keys(COLORS);
  //@ts-ignore
  return COLORS[keys[(keys.length * Math.random()) << 0]];
};

export default randomTaskColor;
