const directions = ['R', 'D', 'L', 'U'];

class Coordinate {
  constructor(n = 0, m = 0, direction = 0) {
    this.n = n;
    this.m = m;
    this.direction = direction;
  }

  parseDirection() {
    return directions[this.direction];
  }
}

module.exports = (line) => {
  const lineParts = line.split(' ');
  const N = Number(lineParts[0]);
  const M = Number(lineParts[1]);
  if (isNaN(N) || isNaN(M)) throw new Error('N and M must be numbers');

  const visited = [ new Coordinate(0, 0, 0) ];
  let directionChanged = false;
  
  do {
    let { n, m, direction } = JSON.parse(JSON.stringify(visited[visited.length - 1]));
    if (directionChanged) {
      directionChanged = false;
      direction = direction !== 3 ? direction + 1 : 0;
    }
    switch(direction) {
      case 0:
        if (m < N - 1 && !visited.find((c) => c.n === n && c.m === m + 1)) visited.push(new Coordinate(n, m + 1, direction));
        else directionChanged = true;
        break;
      case 1:
        if (n < M - 1 && !visited.find((c) => c.n === n + 1 && c.m === m)) visited.push(new Coordinate(n + 1, m, direction));
        else directionChanged = true;
        break;
      case 2:
        if (m > 0 && !visited.find((c) => c.n === n && c.m === m - 1)) visited.push(new Coordinate(n, m - 1, direction));
        else directionChanged = true;
        break;
      case 3:
        if (n > 0 && !visited.find((c) => c.n === n - 1 && c.m === m)) visited.push(new Coordinate(n - 1, m, direction));
        else directionChanged = true;
        break;
      default: throw new Error('Direction error');
    }
  } while (visited.length < (N * M));
  return visited;
};
