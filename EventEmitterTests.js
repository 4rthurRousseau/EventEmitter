// Création d'un nouvel objet de type EventEmitter
var eventEmitter = new EventEmitter();

/**
L'instruction suivante effectuera successivement :
- Affichage (limité à une seule fois grâce à la méthode .once) --> "Haha, I'm A, and I'll be only printed once"
- Suppression des callbacks (grâce à la méthode .off) 
- Affichage (illimité, mais utilisé 5 fois) --> "We ran the '.off' func so A can be used multiple times, let's spam!"
- Affichage (limité à trois fois grâce à .times) --> "Stop it now! You'll be muted!"
- Affichage  (limité à une seule fois grâce à la méthode .once) --> "You have been muted!"
*/
eventEmitter.once("A", function a(){ console.log("Haha, I'm A, and I'll be only printed once");}).emit("A").emit("A").emit("A").emit("A").off().on("A", function a() { console.log("We ran the '.off' func so A can be used multiple times, let's spam!"); }).emit("A").emit("A").emit("A").emit("A").emit("A").times("B", 3,function b(){ console.log("Stop it now! You'll be muted!");}).emit("B").emit("B").emit("B").emit("B").emit("B").once("C", function C(){ console.log("You have been muted!");}).emit("C");