export function buildColor(outcome) {
  switch (outcome) {
    case 'success': return '#00ff00';
    case 'failed': return '#ff0000';
    case 'timedout': return '#aa0000';
    case 'no_tests': return '#aa8888';
    case 'infrastructure_fail': return '#aa8888';
    case 'canceled': return '#aa8888';

    default: {
      throw new Error(`Unexpected build outcome "${outcome}"`);
    }
  }
}
