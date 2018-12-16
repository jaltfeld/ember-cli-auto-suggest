import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, typeIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | auto-suggest', function(hooks) {
  setupRenderingTest(hooks);

  this.placeHoldText = 'search by name, address, or alias';
  this.searchProps = ['name', 'address', 'alias'];
  this.elemId = "test-ident";
  this.component = "suggest-results";
  this.length = 2;
  this.payload = [
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

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{auto-suggest}}`);

    assert.equal(this.element.textContent.trim(), '');
    assert.equal( (this.element.querySelector('input') !== undefined || null), true, 'it rendered');
  });

  test('it handles placeholder attribute', async function(assert) {
    await render(hbs`{{auto-suggest placeholder=placeHoldText}}`);
    assert.dom('input').hasAttribute('placeholder', this.placeHoldText);
  });


  test('it handles inputId attribute', async function(assert) {
    await render(hbs`{{auto-suggest placeholder=placeHoldText inputId=elemId}}`);
    assert.dom('input').hasAttribute('placeholder', this.placeHoldText);
    assert.dom('input').hasAttribute('id', this.elemId);
  });


  test('it handles resultBodyPartial and result display', async function(assert) {
    await render(hbs`{{auto-suggest placeholder=placeHoldText inputId=elemId filterProps=searchProps findAllList=payload resultBodyComponent=component activeLength=length}}`);
    assert.dom('input').hasAttribute('placeholder', this.placeHoldText);
    assert.dom('input').hasAttribute('id', this.elemId);
    assert.dom('ul.test-result').exists();
    assert.equal( (this.element.querySelector('ul.test-result li') === null), true, 'results are not present');
  });


  test('it handles results are properly returning', async function(assert) {
    await render(hbs`{{auto-suggest placeholder=placeHoldText inputId=elemId filterProps=searchProps findAllList=payload resultBodyComponent=component activeLength=length}}`);
    assert.dom('input').hasAttribute('placeholder', this.placeHoldText);
    assert.dom('input').hasAttribute('id', this.elemId);
    assert.dom('ul.test-result').exists();
    
    await typeIn('input', 'and', { delay:50 });
    assert.dom('ul.test-result li').exists();

    // there should be 4 results in this set
    assert.equal( (this.element.querySelector('ul.test-result li:nth-child(1)') !== null), true, 'result 1 ('+this.element.querySelector('ul.test-result li:nth-child(1)').textContent+') is displaying');
    assert.equal( (this.element.querySelector('ul.test-result li:nth-child(2)') !== null), true, 'result 2 ('+this.element.querySelector('ul.test-result li:nth-child(2)').textContent+') is displaying');
    assert.equal( (this.element.querySelector('ul.test-result li:nth-child(3)') !== null), true, 'result 3 ('+this.element.querySelector('ul.test-result li:nth-child(3)').textContent+') is displaying');
    assert.equal( (this.element.querySelector('ul.test-result li:nth-child(4)') !== null), true, 'result 4 ('+this.element.querySelector('ul.test-result li:nth-child(4)').textContent+') is displaying');
    assert.equal( (this.element.querySelector('ul.test-result li:nth-child(5)') === null), true, 'this search only produces 4 results');
  });
});
