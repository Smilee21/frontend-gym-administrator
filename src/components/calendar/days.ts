const lunes = {
  dayHeader: 'LUNES',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 2,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 4,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 5,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 0,
    },
  ],
}

const martes = {
  dayHeader: 'MARTES',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 6,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 4,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 12,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 2,
    },
  ],
}

const miercoles = {
  dayHeader: 'Miercoles',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 5,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 6,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 7,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 7,
    },
  ],
}

const jueves = {
  dayHeader: 'jueves',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 5,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 4,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 3,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 5,
    },
  ],
}

const viernes = {
  dayHeader: 'viernes',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 6,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 5,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 13,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 23,
    },
  ],
}

const sabado = {
  dayHeader: 'sabado',
  cards: [
    {
      id: crypto.randomUUID(),
      trainer: 'Alberto',
      hour: '8:00',
      spaces: 2,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'antonio ',
      hour: '8:00',
      spaces: 2,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'maicol',
      hour: '8:00',
      spaces: 0,
    },
    {
      id: crypto.randomUUID(),
      trainer: 'pepe',
      hour: '8:00',
      spaces: 2,
    },
  ],
}

const dayColumn = [lunes, martes, miercoles, jueves, viernes, sabado]

export { dayColumn }
