var SequenciaDeInimigos = function(){

    this.sequencias = [
        [
            {
                tipo: 'Bonner',
                posicao: 100
            },
            {
                tipo: 'Fly',
                posicao: 100
            },
            {
                tipo: 'Fly',
                posicao: 200
            },
            {
                tipo: 'Fly',
                posicao: 300
            },
            {
                tipo: 'Fly',
                posicao: 400
            }
        ],
        [
            {
                tipo: 'Cocolito',
                posicao: 100
            },
            {
                tipo: 'Sewer',
                posicao: 130
            },
            {
                tipo: 'Fly',
                posicao: 200
            },
            {
                tipo: 'Cocolito',
                posicao: 300
            },
            {
                tipo: 'Cocolito',
                posicao: 330
            },
            {
                tipo: 'Dudu',
                posicao: 500
            }
        ]
    ];
}

SequenciaDeInimigos.prototype.getRandom = function(){
    return Math.floor(Math.random() * this.sequencias.length);
}
