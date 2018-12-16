ember-cli-auto-suggest
==============================================================================

An ember addon which provides an input and an "auto suggest" listing underneath the input based on whats typed...

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-auto-suggest
```


Usage
------------------------------------------------------------------------------

This addon can be used wherever an auto-select input is needed and a pre-existing payload can be fed into it.  Just drop the `{{auto-select}}` component in place and define it's attributes...

- "findAllList"
- "filterProps"
- "placeholder"
- "inputId"
- "activeLength"
- "resultBodyComponent"

## Minimal Requirements

The only attributes which must be defined in order to use the addon are the `findAllList`, `filterProps` and `resultBodyComponent`.  The `findAllList` is the payload that you want the component to dig through and produce your "suggestions" from.  The `filterProps` must be an array of property keys corresponding to the model that makes up your payload. The component will use whatever property or properties you fill it with to compare the values against what's been typed into the input.

And finally the `resultBodyComponent` is a string value reresenting the name of a component that you generate yourself (instead of a partial) - it will be used by the component to display whatever results come from the comparisons of the input texts against the values of the model property(ies) defining the `filterProps`.

In use it will look something like this...

```
{{auto-suggest
  findAllList=payload 
  filterProps=filterTypes
  resultBodyComponent="suggest-results"
}}
```

## Optional Attributes

The `{{auto-suggest}}` component also allows you to include placeholder text, assign the input an id, and determine how many keystrokes must be entered before the component begins producing matches for your string.  In order to specify these details, just define the `placeholder` attribute with the value of your desired placeholder text, the `inputId` attribute with that of your desired id, and set the `activeLength` attribute with the number of keystrokes it should take before the compoent kicks off the processing.

With all attributes defined it will look something like this...

```
{{auto-suggest 
  findAllList=payload 
  filterProps=filterTypes
  resultBodyComponent="suggest-results"
  placeholder=placeholder
  inputId=identifier 
  activeLength=2
}}
```

## More on the "resultBodyComponent"...

When you produce the component you will use for your `resultBodyComponent`, it will need two specific properties...

- "suggestListSet"
- "suggestResults"

This will look like...

```
import Component from '@ember/component';

export default Component.extend({
  suggestListSet: null,
  suggestResults: null,
});
```

When you set your result body you can loop through the `suggestResults` to display these results in whatever fashion you like.  Here is an example of what is used in the dummy application included in the GitHub repository...

```
<ul class="test-result{{if suggestListSet ' active'}}">
  {{#each suggestResults as |result|}}
    <li><a href="some/loction/{{result.id}}">{{result.name}}, AKA: {{result.alias}}, AT: {{result.address}}</a></li>
  {{/each}}
</ul>
```

...as you can see the `suggestListSet` property is also available and can be used as an indicator that results will display.

The beauty of you being in control of the result display, is that you can write whatever markup & styling class hooks you like for whatever display you like and produce pretty much anything - that passes for an "auto suggest" dropdown.

If you need to re-arrange the location of your `resultBodyComponent` just over-write the `auto-suggest.hbs` template by making one in your application's `yourApp/app/templates/components/` folder and copy what's in your `yourApp/node_modules/ember-cli-auto-suggest/addon/templates/components/auto-suggest.hbs` to the new file - then just add whatever you like or re-arrange in whatever way you need.

## Example

So here is a complete example of how this addon will work when you use it - the same code is in the dummy app in the repo...

### controllers/application.js
```
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
```

### templates/application.hbs
```
{{auto-suggest 
  placeholder=placeholder
  inputId=identifier 
  filterProps=filterTypes 
  findAllList=payload 
  resultBodyComponent="suggest-results"
  activeLength=2
}}

{{outlet}}
```

### components/suggest-results.js (my generated component)
```
import Component from '@ember/component';

export default Component.extend({
  suggestListSet: null,
  suggestResults: null,
});
```

### templates/components/suggest-results.hbs (my generated component's template)
```
{{input type="text" id=inputId placeholder=placeholder value=inputVal}}
{{component resultBodyComponent suggestResults=resultList suggestListSet=resultListSet}}
{{yield}}
```

...That should be everything - enjoy!

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
