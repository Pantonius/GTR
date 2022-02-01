class PointDialog {
    
    constructor() {
        this.div = document.createElement('div');
        this.div.classList.add('pointDialog');
        this.div.addEventListener('mousedown', (e) => e.stopPropagation()); // prevents propagation to the overlay and its subsequent closing

        // header
        let headbar = document.createElement('div');
        headbar.classList.add('headbar');

        let title = document.createElement('h2');
        title.innerText = 'Point';
        headbar.appendChild(title);
        
        let btnClose = document.createElement('button');
        btnClose.classList.add('indent');
        btnClose.addEventListener('click', () => this.close());

        let closeIMG = document.createElement('img');
        closeIMG.src = './img/outline_close_white_24dp.png';

        btnClose.appendChild(closeIMG);
        headbar.appendChild(btnClose);


        // Add headbar to div
        this.div.appendChild(headbar);


        // Inputs and their Labels
        let body = document.createElement('div');
        body.classList.add('body');

        let xlabel = document.createElement('label');
        xlabel.innerText = 'X: ';
        xlabel.setAttribute('for', 'inputX');
        body.appendChild(xlabel);

        this.inputX = document.createElement('input');
        this.inputX.type = 'text';
        this.inputX.id = 'inputX';
        body.appendChild(this.inputX);

        body.appendChild(document.createElement('br'));

        let ylabel = document.createElement('label');
        ylabel.innerText = 'Y: ';
        ylabel.setAttribute('for', 'inputY');
        body.appendChild(ylabel);

        this.inputY = document.createElement('input');
        this.inputY.type = 'text';
        this.inputY.id = 'inputY';
        body.appendChild(this.inputY);

        body.appendChild(document.createElement('br'));


        // Create Button
        let btnCreate = document.createElement('button');
        btnCreate.innerText = 'Create';

        this.onCreate = () => {};
        btnCreate.addEventListener('click', () => {
            // error detection for inputX
            let error = false;
            if(isNaN(this.inputX.value) || this.inputX.value.length == 0) {
                this.inputX.classList.toggle('error', true);
                error = true;
            } else {
                this.inputX.classList.toggle('error', false);
            }
            
            // error detection for inputY
            if(isNaN(this.inputY.value) || this.inputY.value.length == 0) {
                this.inputY.classList.toggle('error', true);
                error = true;
            } else {
                this.inputY.classList.toggle('error', false);
            }

            if(error) return;


            // Parsing numbers
            let x = Number.parseFloat(this.inputX.value);
            let y = Number.parseFloat(this.inputY.value);

            this.onCreate(x, y);


            // closing the overlay
            this.close();
        });
        body.appendChild(btnCreate);


        // Add body to div
        this.div.appendChild(body);


        // Add to Overlay
        overlay.appendChild(this.div);
        overlay.classList.toggle('visible', true);
    }

    close() {
        overlay.removeChild(this.div);
        overlay.classList.toggle('visible', false);
    }
}