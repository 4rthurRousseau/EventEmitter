function EventEmitter() {
    // HashMap [ event -> [fn1, fn2, ...] ]
    this.callbacks = {};
}

EventEmitter.prototype = {
    // Fonction permettant d'ajouter un évènement et la fonction que ce dernier déclenche, à une HashMap d'évènements
    on: function(event, fn) {
		// On tente une regénération des données
        this.reload(event);
		
        // On ajoute la fonction à lancer à la HashMap
        this.callbacks[event].push(fn);

        // Et on retourne notre objet (Chaining Pattern)
        return this;
    },

    // Fonction permettant de remettre la HashMap d'évènements à zéro
    off: function(event) {
        // On supprime la HashMap
        delete this.callbacks

        // Et on retourne notre objet (Chaining Pattern)
        return this;
    },

    // Fonction permettant d'émettre un évènement
    emit: function(event /*, args */ ) {
		// On tente une regénération des données
        this.reload(event);
		
        var args = Array.prototype.slice.call(arguments);
        args.shift();

        // 
        if (this.callbacks.hasOwnProperty(event)) {
            this.callbacks[event].forEach(function(f) {
                f.apply(this, args);
            });
        }
		
		return this;
    },

    // Fonction permettant d'ajouter un évènement (ne pouvant être appelé qu'une seule fois) et la fonction que ce dernier déclenche, à notre HashMap d'évènements
    once: function(event, fn) {
        // On tente une regénération des données
        this.reload(event);
		
		// On remet à zéro notre tableau de fonctions
        this.callbacks[event] = [];

		// Récupération de l'objet actuel
        var currentObject = this;

        var deleteOther = function() {
            var index = currentObject.callbacks[event].indexOf(fn);
            // On  supprime les autres occurences
            currentObject.callbacks[event].splice(index, 2);
        };

        this.callbacks[event].push(fn);
        this.callbacks[event].push(deleteOther);
        return this;
    },

    // Fonction permettant d'ajouter un évènement (ne pouvant être appelé que n fois) et la fonction que ce dernier déclenche, à notre HashMap d'émetteurs
    times: function(event, n, fn) {
        var i = 0;

        // On tente une regénération des données
        this.reload(event);

		// Récupération de l'objet actuel
        var currentObject = this; 

        var deleteOther = function() {
            i++;
			
			// Si on a atteint le nombre d'occurences maximal
            if (i == n) {
                var index = currentObject.callbacks[event].indexOf(fn);
                // On  supprime les autres occurences
                currentObject.callbacks[event].splice(index, 2);
            }
        };
        this.callbacks[event].push(fn);
        this.callbacks[event].push(deleteOther);
        return this;
    },

	// Fonction permettant de regénérer notre HashMap d'évènements s'il n'existe pas
	// et de créer une case vide correspondante à la fonction à appeller lorsque
	// l'évènement est déclenché
    reload: function(event) {
        // Si la HashMap n'existe pas (dans le cas où nous aurions appelé la fonction .off)
        if (!this.hasOwnProperty('callbacks')) {
            // Alors on crée notre HashMap
            this.callbacks = {};
        }

        // Si l'évènement est défini, on peut l'ajouter à la liste
        if (event != undefined) {
            // Si callback n'a pas déjà d'élément qui correspond à l'évènement demandé
            if (!this.callbacks.hasOwnProperty(event)) {
				// Alors on crée notre case vide
                this.callbacks[event] = [];
            }
        }
    }
};
