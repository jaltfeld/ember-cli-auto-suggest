import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
	placeholder: 'try a search',
	identifier: 'addon-version',
	filterTypes: computed(()=>['name', 'alias', 'address']),
	payload: computed(function(){
    return [
      {id:1, name:'Mark Andrews', alias:'Ardvark', address:'12 North Bunny Road', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:2, name:'Margaret Parker', alias:'Scar-tissue', address:'136 Arthur Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:3, name:'Martin Perkins', alias:'Kinkle', address:'22 Parker Parkway', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:4, name:'Marvin Person', alias:'Margarin', address:'491 Indiana Avenue', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:5, name:'Jay Murphy', alias:'Lisp', address:' 820 Cocoa Puff Place', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:6, name:'Jayson Murdock', alias:'Lips', address:'1605 Ping Pong Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:7, name:'Andrew Murve', alias:'Pickle Juice', address:'749 Ding Dong Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:8, name:'Andrea Nelson', alias:'Spider', address:'18 King Kong Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:9, name:'Andrell Nellis', alias:'T-bone', address:'102 Hollywood Avenue', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:10, name:'Lisa Cole', alias:'Papa Smurf', address:'926 Sunset Place', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:11, name:'Lisette Coleson', alias:'Papa John', address:'224 Captain Crunch Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:12, name:'Liscious Collier', alias:'Pope', address:'9876 Munchkin Lane', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:13, name:'Listerine Coleman', alias:'Picker', address:'681 Apple Pie Lane', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:14, name:'Juliette Learner', alias:'Killer', address:'67 Cherry Tree Parkway', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
      {id:15, name:'Jules Burton', alias:'The Pip', address:'8874 Shiny Street', get:function(token){ return this[token];}, set:function(token, val){ this[token] = val;}},
    ];
  }),  
});