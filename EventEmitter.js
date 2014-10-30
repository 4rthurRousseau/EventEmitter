function EventEmitter() {
    // HashMap [ event -> [fn1, fn2, ...] ]
    this.callbacks = {};
}

EventEmitter.prototype = {
    // Fonction permettant d'ajouter un �v�nement et la fonction que ce dernier d�clenche, � une HashMap d'�v�nements
    on: function(event, fn) {
		// On tente une reg�n�ration des donn�es
        this.reload(event);
		
        // On ajoute la fonction � lancer � la HashMap
        this.callbacks[event].push(fn);

        // Et on retourne notre objet (Chaining Pattern)
        return this;
    },

    // Fonction permettant de remettre la HashMap d'�v�nements � z�ro
    off: function(event) {
        // On supprime la HashMap
        delete this.callbacks

        // Et on retourne notre objet (Chaining Pattern)
        return this;
    },

    // Fonction permettant d'�mettre un �v�nement
    emit: function(event /*, args */ ) {
		// On tente une reg�n�ration des donn�es
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

    // Fonction permettant d'ajouter un �v�nement (ne pouvant �tre appel� qu'une seule fois) et la fonction que ce dernier d�clenche, � notre HashMap d'�v�nements
    once: function(event, fn) {
        // On tente une reg�n�ration des donn�es
        this.reload(event);
		
		// On remet � z�ro notre tableau de fonctions
        this.callbacks[event] = [];

		// R�cup�ration de l'objet actuel
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

    // Fonction permettant d'ajouter un �v�nement (ne pouvant �tre appel� que n fois) et la fonction que ce dernier d�clenche, � notre HashMap d'�metteurs
    times: function(event, n, fn) {
        var i = 0;

        // On tente une reg�n�ration des donn�es
        this.reload(event);

		// R�cup�ration de l'objet actuel
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

	// Fonction permettant de reg�n�rer notre HashMap d'�v�nements s'il n'existe pas
	// et de cr�er une case vide correspondante � la fonction � appeller lorsque
	// l'�v�nement est d�clench�
    reload: function(event) {
        // Si la HashMap n'existe pas (dans le cas o� nous aurions appel� la fonction .off)
        if (!this.hasOwnProperty('callbacks')) {
            // Alors on cr�e notre HashMap
            this.callbacks = {};
        }

        // Si l'�v�nement est d�fini, on peut l'ajouter � la liste
        if (event != undefined) {
            // Si callback n'a pas d�j� d'�l�ment qui correspond � l'�v�nement demand�
            if (!this.callbacks.hasOwnProperty(event)) {
				// Alors on cr�e notre case vide
                this.callbacks[event] = [];
            }
        }
    }
};
