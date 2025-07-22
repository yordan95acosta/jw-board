const announcements = [
  {
    title: "Reunión de Servicio",
    content: "El sábado a las 9am tendremos reunión especial para el servicio."
  },
  {
    title: "Limpieza del Salón",
    content: "Este domingo después de la reunión, todos los grupos están invitados a participar."
  },
  {
    title: "Escuela del Ministerio",
    content: "Los estudiantes nuevos pueden acercarse al coordinador para más información."
  }
];

const board = document.getElementById('board');

announcements.forEach(({ title, content }) => {
  const div = document.createElement('div');
  div.className = 'announcement';
  div.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
  board.appendChild(div);
});