const overlay = document.getElementById('overlay');
const toolbar = document.getElementById('toolbar');
const btnCreatePoint = document.getElementById('btnCreatePoint');

overlay.addEventListener('mousedown', () => overlay.classList.toggle('visible'));

btnCreatePoint.addEventListener('click', () => {
    let dialog = new PointDialog();
    dialog.onCreate = (x, y) => grid.points.push(new Point(x, y));
});

toolbar.addEventListener('mousedown', (e) => e.stopPropagation());