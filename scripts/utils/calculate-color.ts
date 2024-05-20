export const calculateColor = (attackers: number, defenders: number) => {
  const reds = [
    'rgba(197, 150, 151, 1)', 
    'rgba(190, 137, 137, 1)',
    'rgba(183, 123, 123, 1)',
    'rgba(175, 110, 110, 1)',
    'rgba(168, 97, 97, 1)',
    'rgba(158, 87, 87, 1)',
    'rgba(151, 74, 74, 1)',
    'rgba(144, 61, 61, 1)',
  ]

  const greens = [
    'rgba(151, 196, 175, 1)',
    'rgba(129, 177, 158, 1)',
    'rgba(108, 158, 141, 1)',
    'rgba(86, 139, 124, 1)',
    'rgba(65, 120, 107, 1)',
    'rgba(43, 101, 90, 1)',
    'rgba(22, 82, 73, 1)',
    'rgba(0, 63, 56, 1)',
  ]

  if (attackers === defenders) {
    return 'rgba(201, 240, 255, 1)'; // make this blue
  }

  if (attackers > defenders) {
    return reds[attackers - defenders - 1];
  }

  if (defenders > attackers) {
    return greens[defenders - attackers - 1];
  }
}