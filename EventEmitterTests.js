// Cr�ation d'un nouvel objet de type EventEmitter
var eventEmitter = new EventEmitter();

/**
L'instruction suivante effectuera successivement :
- Affichage (limit� � une seule fois gr�ce � la m�thode .once) --> "Haha, I'm A, and I'll be only printed once"
- Suppression des callbacks (gr�ce � la m�thode .off) 
- Affichage (illimit�, mais utilis� 5 fois) --> "We ran the '.off' func so A can be used multiple times, let's spam!"
- Affichage (limit� � trois fois gr�ce � .times) --> "Stop it now! You'll be muted!"
- Affichage  (limit� � une seule fois gr�ce � la m�thode .once) --> "You have been muted!"
*/
eventEmitter.once("A", function a(){ console.log("Haha, I'm A, and I'll be only printed once");}).emit("A").emit("A").emit("A").emit("A").off().on("A", function a() { console.log("We ran the '.off' func so A can be used multiple times, let's spam!"); }).emit("A").emit("A").emit("A").emit("A").emit("A").times("B", 3,function b(){ console.log("Stop it now! You'll be muted!");}).emit("B").emit("B").emit("B").emit("B").emit("B").once("C", function C(){ console.log("You have been muted!");}).emit("C");